const jwt = require('jsonwebtoken');
const checkAuthorization = (req, res, next) => {
	const { token } = req.cookies;
	console.log(token);
	if (token) {
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				return res.status(403);
			}
			req.user = user;
			return next();
		});
	} else {
		res.status(401).json({ status: 401, message: 'Unauthorized, please log in.' });
	}
	return res.status(401);
};

module.exports = checkAuthorization;
