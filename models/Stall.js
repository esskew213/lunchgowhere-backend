const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stallSchema = new Schema(
	{
		stallName: {
			type: String,
			required: [ true, 'Stall name is required.' ]
		},
		cuisine: {
			type: String,
			enum: [ 'Chinese', 'Western', 'Korean', 'Japanese', 'Malay', 'Indian', 'Others' ],
			required: [ true, 'Cuisine is required.' ]
		},
		location: {
			type: Schema.Types.ObjectId,
			ref: 'HawkerCenter',
			required: [ true, 'Valid location is required.' ]
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		reviews: {
			type: [ Schema.Types.ObjectId ],
			ref: 'Review'
		}
	},
	{ timestamps: true }
);
stallSchema.set('toJSON', { virtuals: true });

stallSchema.virtual('calcWait').get(function calcWait() {
	if (this.reviews.length > 0) {
		const waitTimeArr = this.reviews.map((r) => r.waitTime);
		const sumWaitTime = waitTimeArr.reduce((prev, curr) => prev + curr);
		return (sumWaitTime / waitTimeArr.length).toFixed(0);
	}
	return null;
});

stallSchema.virtual('calcWouldEat').get(function calcWouldEat() {
	if (this.reviews.length > 0) {
		const wouldEatArr = this.reviews.map((r) => r.wouldEatAgain);
		const wouldEat = wouldEatArr.filter((we) => we === true);
		return (wouldEat.length / wouldEatArr.length).toFixed(2) * 100;
	}
	return null;
});

stallSchema.virtual('calcWouldQueue').get(function calcWouldEat() {
	if (this.reviews.length > 0) {
		const wouldQueueArr = this.reviews.map((r) => r.wouldQueueAgain);
		const wouldQueue = wouldQueueArr.filter((wq) => wq === true);
		return (wouldQueue.length / wouldQueueArr.length).toFixed(2) * 100;
	}
	return null;
});

module.exports = mongoose.model('Stall', stallSchema);
