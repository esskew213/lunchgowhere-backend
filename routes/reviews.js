const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const reviews = require('../controllers/reviews');
router.route('/').post(reviews.new).delete(reviews.delete).put(reviews.edit);

module.exports = router;
