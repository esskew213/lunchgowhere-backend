const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');

// use this middleware to catch async errors
const catchAsync = require('../middleware/errorHandler');

router.route('/').post(catchAsync(reviews.new)).delete(catchAsync(reviews.delete)).put(catchAsync(reviews.edit));

module.exports = router;
