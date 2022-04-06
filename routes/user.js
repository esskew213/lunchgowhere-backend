const bcrypt = require('bcrypt');
const router = require('./food');
const User = require('../models/User');
const userflow = require('../controllers/user');
// const auth = require('../middleware/auth');

router.get('/signup', userflow.signup);
router.get('/login', userflow.login);
router.get('/logout', userflow.logout);

//// SEEDING USERS
router.get('/seedAll', userflow.seedAll);

module.exports = router;
