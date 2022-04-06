const express = require('express');
const router = express.Router();
const food = require('../controllers/food');
const catchAsync = require('../middleware/errorHandler');
router.get('/home', catchAsync(food.recommended));

router.post('/new', catchAsync(food.new));

module.exports = router;
