const Stall = require('../models/Stall');

module.exports.recommended = async (req, res) => {
	const topThreeStalls = await Stall.find({}).limit(3).populate('author');
	console.log(topThreeStalls);
	res.json(topThreeStalls);
};

module.exports.new = async (req, res) => {
	const newStall = new Stall(req.body);
	await newStall.save();
	console.log('NEW STALL SAVED');
};
