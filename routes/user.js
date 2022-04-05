const bcrypt = require('bcrypt');
const router = require('./food');
const User = require('../models/User');
const userflow = require('../controllers/user');
// const auth = require('../middleware/auth');

router.get('/signup', async (req, res) => {
	const { name, username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	const newUser = new User({ name, username, hashedPassword });
	await newUser.save();
	req.session.user_id = user._id;
	res.redirect('/');
});
router.get('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	const validPassword = await bcrypt.compare(password, user.hashedPassword);
	if (validPassword) {
		req.session.user_id = user._id;
		res.redirect('/');
	} else {
		res.status(401).json({ status: 'error', message: 'please login' });
	}
});
router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.json({ status: 'ok', message: 'logged out' });
	});
});

//// SEEDING USERS

router.get('/seedUsers', userflow.seedUsers);

module.exports = router;
