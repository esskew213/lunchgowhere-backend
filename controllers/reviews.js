const Review = require('../models/Review');

module.exports.new = async (req, res) => {
	const { price, waitTime, wouldEatAgain, wouldQueueAgain } = req.body;
	const newReview = new Review({ price, waitTime, wouldEatAgain, wouldQueueAgain });
	await newReview.save();
};

module.exports.delete = async (req, res) => {
	await Review.deleteOne({ _id: req.body.reviewID });
};

module.exports.edit = async (req, res) => {
	const { price, waitTime, wouldEatAgain, wouldQueueAgain, reviewID } = req.body;
	await Review.updateOne({ _id: reviewID }, { $set: { price, waitTime, wouldEatAgain, wouldQueueAgain } });
};
