const User = require('../models/User');
const Stall = require('../models/Stall');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const seedUsers = require('../seeds/seedUsers');
const seedStalls = require('../seeds/seedStalls');
const seedReviews = require('../seeds/seedReviews');
const AppError = require('../AppError');

module.exports.getuser = async (req, res) => {
	console.log('GETTING USER...');
	const { username } = req.user;
	const user = await User.find({ username });
	res.json({ name: user.name, status: 200, message: 'OK' });
};

module.exports.signup = async (req, res) => {
	const { name, username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	const newUser = new User({ name, username, hashedPassword });
	await newUser.save();

	const userForToken = {
		username: newUser.username,
		id: newUser._id
	};

	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

	res.status(200).send({ token, username: user.username, name: user.name });
	res.redirect('/');
};

module.exports.login = async (req, res) => {
	console.log(req.body);
	const { username, password } = req.body;

	// Checking for existing user
	const user = await User.findOne({ username });
	if (!user) {
		console.log('Invalid username or password.');
		throw new AppError('Invalid username or password.', 401);
	}

	// If user exists, check their password.
	const validPassword = await bcrypt.compare(password, user.hashedPassword);
	if (!validPassword) {
		console.log('Invalid username or password.');
		throw new AppError('Invalid username or password.', 401);
	}

	// If the password is correct, a token is created and digitally signed with SECRET
	// Only parties that know SECRET can generate a valid token; this prevents third parties from generating tokens)
	const userForToken = {
		username: user.username,
		id: user._id
	};
	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

	// set cookie with the token. httpOnly: true means cookie can't be read with JS but can be sent back to the server in HTTP requests
	// this prevents XSS attacks from using document.cookie ot get a list of stored cookies
	res.cookie('token', token, {
		httpOnly: true,
		maxAge: 60 * 60 * 1000
	});
	res.header('Access-Control-Allow-Credentials', true);
	res.status(200).send({ token, username: user.username, name: user.name });
};

module.exports.logout = (req, res) => {
	res.clearCookie('token');
	req.session.destroy(() => {
		res.json({ status: 'ok', message: 'logged out' });
	});
};

//*************************************
// CALL THIS ROUTE TO SEED INFO IN DB
//*************************************
module.exports.seedAll = async (req, res) => {
	User.deleteMany({});
	Stall.deleteMany({});
	Review.deleteMany({});
	for (let user of seedUsers) {
		user.hashedPassword = await bcrypt.hash(user.password, 12);
		const newUser = new User({
			name: user.name,
			username: user.username,
			hashedPassword: user.hashedPassword
		});
		await newUser.save();
		console.log('seeded user');
	}
	const users = await User.find({});

	for (let i = 0; i < 3; i++) {
		const user = users[i];
		const stall = seedStalls[i];

		const newStall = new Stall({
			stallName: stall.stallName,
			cuisine: stall.cuisine,
			location: stall.location,
			author: user
		});
		await newStall.save();
		console.log('seeded stall');
	}

	const stalls = await Stall.find({});
	for (let i = 0; i < 3; i++) {
		const user = users[i];
		const stall = stalls[i];
		const review = seedReviews[i];
		const newReview = new Review({
			price: review.price,
			waitTime: review.waitTime,
			wouldEatAgain: review.wouldEatAgain,
			wouldQueueAgain: review.wouldQueueAgain,
			author: user,
			stall: stall
		});
		await newReview.save();
		console.log('seeded review');
	}
	console.log('SEEDED DB');
	res.end();
};
