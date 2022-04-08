const Review = require('../models/Review');
const User = require('../models/User');
const Stall = require('../models/Stall');
module.exports.new = async (req, res) => {
	const { username } = req.user;
	const user = await User.findOne({ username });
	const { stallID, price, waitTime, wouldEatAgain, wouldQueueAgain } = req.body;
	const stall = await Stall.findOne({ _id: stallID });
	console.log('FOUND STALL', stall);
	const newReview = new Review({ price, waitTime, wouldEatAgain, wouldQueueAgain, stall: stall, author: user });
	console.log(newReview);
	await newReview.save();
	await user.reviews.push(newReview);
	await stall.reviews.push(newReview);
	await stall.save();
	res.status(201).json({ status: 201, message: 'New review added.' });
};
module.exports.checkIfReviewed = async (req, res) => {
	const { username } = req.user;
	const user = await User.findOne({ username });
	const { id: stallID } = req.params;
	const stall = await Stall.findOne({ _id: stallID });
	console.log('FOUND STALL', stall);
	const newReview = new Review({ price, waitTime, wouldEatAgain, wouldQueueAgain, stall: stall, author: user });
	console.log(newReview);
	await newReview.save();

	await stall.reviews.push(newReview);
	await stall.save();
	res.status(201).json({ status: 201, message: 'New review added.' });
};
module.exports.delete = async (req, res) => {
	await Review.deleteOne({ _id: req.body.reviewID });
};

module.exports.edit = async (req, res) => {
	const { price, waitTime, wouldEatAgain, wouldQueueAgain, reviewID } = req.body;
	await Review.updateOne({ _id: reviewID }, { $set: { price, waitTime, wouldEatAgain, wouldQueueAgain } });
};
