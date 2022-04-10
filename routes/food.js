const express = require('express');
const router = express.Router();
const food = require('../controllers/food');
const jwtAuth = require('../middleware/jwtAuth');
const multer = require('multer');
const { storage } = require('../cloudinaryConfig');
const upload = multer({ storage });

const catchAsync = require('../middleware/errorHandler');
router.get('/home', catchAsync(food.recommended));
router.post('/new', [ jwtAuth, upload.single('file') ], catchAsync(food.new));
router.get('/seed/seedHawkers', catchAsync(food.seedHawkers));
router.get('/:id', jwtAuth, catchAsync(food.getOneStall));
module.exports = router;
