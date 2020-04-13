const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		min: 3,
		max: 255
	},
	secret: {
		type: String,
		required: true,
		unique: true,
		min: 3
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Group', groupSchema);
