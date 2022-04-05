const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
router
	.route('/')
	.post(async (req, res) => {
		const { price, waitTime, wouldEatAgain, wouldQueueAgain } = req.body;
		const newReview = new Review({ price, waitTime, wouldEatAgain, wouldQueueAgain });
		await newReview.save();
	})
	.delete(async (req, res) => {
		await Review.deleteOne({ _id: req.body.reviewID });
	})
	.patch(async (req, res) => {
		const { price, waitTime, wouldEatAgain, wouldQueueAgain, reviewID } = req.body;
		await Review.updateOne({ _id: reviewID }, { $set: { price, waitTime, wouldEatAgain, wouldQueueAgain } });
	});

module.exports = router;
