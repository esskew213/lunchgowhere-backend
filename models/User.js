const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [ true, 'Name is required.' ]
		},
		username: {
			type: String,
			required: true,
			unique: [ true, 'That username is already taken.' ]
		},
		hashedPassword: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
