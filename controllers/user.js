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

module.exports.signup = async (req, res) => {
	const { name, username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	const newUser = new User({ name, username, hashedPassword });
	await newUser.save();
	req.session.user_id = newUser._id;
	res.redirect('/');
};

module.exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	const validPassword = await bcrypt.compare(password, user.hashedPassword);
	if (validPassword) {
		req.session.user_id = user._id;
		res.redirect('/');
	} else {
		res.status(401).json({ status: 'error', message: 'please login' });
	}
};

module.exports.logout = (req, res) => {
	req.session.destroy(() => {
		res.json({ status: 'ok', message: 'logged out' });
	});
};
