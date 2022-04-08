const bcrypt = require('bcrypt');
const router = require('./food');
const User = require('../models/User');
const userflow = require('../controllers/user');
const catchAsync = require('../middleware/errorHandler');
const jwtAuth = require('../middleware/jwtAuth');

router.get('/', jwtAuth, catchAsync(userflow.getuser));
router.post('/signup', catchAsync(userflow.signup));
router.post('/login', catchAsync(userflow.login));
router.get('/logout', catchAsync(userflow.logout));

//// SEEDING USERS
router.get('/seedAll', userflow.seedAll);

module.exports = router;
