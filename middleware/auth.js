const auth = (req, res, next) => {
	if (req.session.currentUser) {
		return next();
	}
	res.status(403).json({ status: 'error', message: 'please login' });
};
