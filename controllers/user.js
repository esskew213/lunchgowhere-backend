const User = require('../models/User');
const bcrypt = require('bcrypt');
const seedUsers = require('../seeds/seedUsers');

module.exports.seedUsers = async (req, res) => {
	User.deleteMany({});
	for (let user of seedUsers) {
		user.hashedPassword = await bcrypt.hash(user.password, 12);
		const newUser = new User({ name: user.name, username: user.username, hashedPassword: user.hashedPassword });
		await newUser.save();
	}
	console.log('SEEDED USERS');
};
