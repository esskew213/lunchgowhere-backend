const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		price: {
			type: Number,
			required: true
		},
		waitTime: {
			type: Number,
			required: true
		},
		wouldEatAgain: {
			type: Boolean
		},
		wouldQueueAgain: {
			type: Boolean
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		stall: {
			type: Schema.Types.ObjectId,
			ref: 'Stall'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
