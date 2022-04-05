const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stallSchema = new Schema(
	{
		stallName: {
			type: String,
			required: true
		},
		cuisine: {
			type: String,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Stall', stallSchema);
