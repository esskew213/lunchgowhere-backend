const Review = require('../models/Review');
const jwt = require('jsonwebtoken');

module.exports.new = async (req, res) => {
	const { price, waitTime, wouldEatAgain, wouldQueueAgain } = req.body;
	const newReview = new Review({ price, waitTime, wouldEatAgain, wouldQueueAgain });
	await newReview.save();
	res.status(201).json({ status: 201, message: 'New review added.' });
};

module.exports.delete = async (req, res) => {
	await Review.deleteOne({ _id: req.body.reviewID });
};

module.exports.edit = async (req, res) => {
	const { price, waitTime, wouldEatAgain, wouldQueueAgain, reviewID } = req.body;
	await Review.updateOne({ _id: reviewID }, { $set: { price, waitTime, wouldEatAgain, wouldQueueAgain } });
};
