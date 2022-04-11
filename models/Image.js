const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	url: String,
	filename: String
});

module.exports = mongoose.model("Image", imageSchema);
