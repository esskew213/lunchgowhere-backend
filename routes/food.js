const express = require('express');
const router = express.Router();
const food = require('../controllers/food');
router.get('/home', food.recommended);

router.post('/new', food.new);

module.exports = router;
