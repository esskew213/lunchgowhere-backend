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

stallSchema.methods.calcWouldEat = function calcWouldEat() {
	const wouldEatArr = this.reviews.map((r) => r.wouldEatAgain);
	const wouldEat = wouldEatArr.filter((we) => we === true);
	return wouldEat.length / wouldEatArr.length;
};

stallSchema.methods.calcWouldQueue = function calcWouldEat() {
	const wouldQueueArr = this.reviews.map((r) => r.wouldQueueAgain);
	const wouldQueue = wouldQueueArr.filter((wq) => wq === true);
	return wouldQueue.length / wouldQueueArr.length;
};

module.exports = mongoose.model('Stall', stallSchema);
