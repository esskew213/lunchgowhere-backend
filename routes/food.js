const express = require('express');
const router = express.Router();
const food = require('../controllers/food');
const jwtAuth = require('../middleware/jwtAuth');

const catchAsync = require('../middleware/errorHandler');
router.get('/home', catchAsync(food.recommended));
router.post('/new', catchAsync(food.new));
router.get('/:id', jwtAuth, catchAsync(food.getOneStall));
module.exports = router;
