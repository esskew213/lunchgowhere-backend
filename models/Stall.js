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
			enum: [ 'Chinese', 'Western', 'Korean', 'Japanese', 'Malay', 'Indian', 'Others' ],
			required: true
		},
		location: {
			type: String,
			enum: [
				'Tanjong Pagar Plaza Market & Food Centre',
				'Maxwell Food Centre',
				'Hong Lim Market & Food Centre',
				'Amoy Street Food Centre'
			],
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
