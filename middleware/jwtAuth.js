const jwt = require('jsonwebtoken');
const checkAuthorization = (req, res, next) => {
	const { token } = req.cookies;
	console.log('CHECKING TOKEN', token);
	if (token) {
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				return res.status(403);
			}
			req.user = user;
			console.log('FOUND USER', user);
			return next();
		});
	} else {
		console.log('NOT AUTHORIZED');
		res.status(401).json({ status: 401, message: 'Unauthorized, please log in.' });
	}
	return null;
};

module.exports = checkAuthorization;
