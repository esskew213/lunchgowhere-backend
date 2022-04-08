const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hawkerCenterSchema = new Schema({
  centerName: {
    type: String,
    required: [true, "Stall name is required."],
  },
  x: {
    type: Number,
  },
  y: { type: Number },
});

module.exports = mongoose.model("HawkerCenter", hawkerCenterSchema);
