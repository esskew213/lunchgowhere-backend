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
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Stall', stallSchema);
