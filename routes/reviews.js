const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews");
const jwtAuth = require("../middleware/jwtAuth");
// use this middleware to catch async errors
const catchAsync = require("../middleware/errorHandler");

router
	.route("/")
	.post(jwtAuth, catchAsync(reviews.new))
	.patch(jwtAuth, catchAsync(reviews.update))
	.put(jwtAuth, catchAsync(reviews.edit));
router.route("/:id").get(jwtAuth, catchAsync(reviews.checkForPrevReview)).delete(jwtAuth, catchAsync(reviews.delete));
module.exports = router;
