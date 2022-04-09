const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews');
const jwtAuth = require('../middleware/jwtAuth');
// use this middleware to catch async errors
const catchAsync = require('../middleware/errorHandler');

router
	.route('/')
	.post(jwtAuth, catchAsync(reviews.new))
	.delete(jwtAuth, catchAsync(reviews.delete))
	.put(jwtAuth, catchAsync(reviews.edit));
router.get('/:id', jwtAuth, catchAsync(reviews.checkForPrevReview));
module.exports = router;
