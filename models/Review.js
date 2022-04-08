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
	const reviewedStall = await this.findOne({ author: author, stall: stall });
	if (reviewedStall) {
		return reviewedStall;
	}
	return null;
};
reviewSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Review', reviewSchema);
