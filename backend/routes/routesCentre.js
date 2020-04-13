const router = require('express').Router();
const authRoute = require('./auth');
const Post = require('../models/Post');
const User = require('../models/User');
const Group = require('../models/Group');
const verify = require('./verifyToken');
const encrypter = require('./postEncryption');

router.use(function(req, res, next) {
	next();
});

router.use('/auth', authRoute);

router.post('/post', verify, async (req, res) => {
	try {
		const group = await Group.findOne({ _id: req.body.group });
		const ecrypted = {
			title: encrypter.encrypt(req.body.title, encrypter.decrypt(group.secret, process.env.POST_SECRET)),
			content: encrypter.encrypt(req.body.content, encrypter.decrypt(group.secret, process.env.POST_SECRET)),
			group: req.body.group
		};
		const post = new Post(ecrypted);
		await post.save();
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.get('/posts', verify, async (req, res) => {
	try {
		const encryptedPosts = await Post.find();
		const user = await User.findOne({ _id: req.user._id });
		let posts = [];
		for (let i = 0; i < encryptedPosts.length; i++) {
			if (user.groups.includes(encryptedPosts[i].group)) {
				const group = await Group.findOne({ _id: encryptedPosts[i].group });
				posts.push({
					_id: encryptedPosts[i]._id,
					title: encrypter.decrypt(
						encryptedPosts[i].title,
						encrypter.decrypt(group.secret, process.env.POST_SECRET)
					),
					content: encrypter.decrypt(
						encryptedPosts[i].content,
						encrypter.decrypt(group.secret, process.env.POST_SECRET)
					),
					group: encryptedPosts[i].group,
					date_added: encryptedPosts[i].date_added,
					__v: encryptedPosts[i].__v
				});
			} else posts.push(encryptedPosts[i]);
		}
		res.status(200).send({ posts: posts });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.get('/myGroups', verify, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id });
		let groups = [];
		for (let i = 0; i < user.groups.length; i++) {
			const id = user.groups[i];
			const group = await Group.findOne({ _id: id });
			groups.push({ _id: id, name: group.name });
		}
		res.status(200).send({ groups: groups });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/myGroups/add', verify, async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user.groups.includes(req.body.id))
			await User.findOneAndUpdate({ email: req.body.email }, { $push: { groups: req.body.id } });
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/myGroups/remove', verify, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user._id });
		const newGroups = user.groups.filter((val) => val != req.body.id);
		await User.findOneAndUpdate({ _id: req.user._id }, { groups: newGroups });
		res.sendStatus(200);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/group', verify, async (req, res) => {
	const group = new Group({
		name: req.body.name,
		secret: encrypter.encrypt(encrypter.randomString(32), process.env.POST_SECRET)
	});
	try {
		await group.save();
		await User.findOneAndUpdate({ _id: req.user._id }, { $push: { groups: group._id } });
		res.status(200).send({ group: group._id });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

module.exports = router;
