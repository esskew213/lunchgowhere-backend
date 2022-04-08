const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		price: {
			type: Number,
			required: [ true, 'Price is required.' ]
		},
		waitTime: {
			type: Number,
			required: [ true, 'Wait time is required.' ]
		},
		wouldEatAgain: {
			type: Boolean,
			required: [ true, 'A response is required.' ]
		},
		wouldQueueAgain: {
			type: Boolean,
			required: [ true, 'A response is required.' ]
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
reviewSchema.statics.getReviewedStall = async function getReviewedStall(stall, author) {
	const reviewedStall = await this.findOne(
		{ author: author, stall: stall },
		{ price: 1, waitTime: 1, wouldEatAgain: 1, wouldQueueAgain: 1 }
	);
	if (reviewedStall) {
		return reviewedStall;
	}
	return null;
};

module.exports = mongoose.model('Review', reviewSchema);
