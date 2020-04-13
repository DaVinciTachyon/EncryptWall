const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	content: {
		type: String,
		required: true,
		min: 5
	},
	group: {
		type: String,
		required: true
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Post', postSchema);
