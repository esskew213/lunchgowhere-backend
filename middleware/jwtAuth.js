const jwt = require('jsonwebtoken');
const checkAuthorization = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
			const token = authorization.substring(7);

			jwt.verify(token, process.env.SECRET, (err, user) => {
				if (err) {
					return res.status(403);
				}
				req.user = user;
				next();
			});
		}
	} else {
		res.status(401).json({ status: 401, message: 'Please log in.' });
	}

	return null;
};

module.exports = checkAuthorization;
