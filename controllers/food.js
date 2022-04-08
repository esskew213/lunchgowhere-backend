const Stall = require('../models/Stall');
const User = require('../models/User');
const AppError = require('../AppError');
const Joi = require('joi');

module.exports.getOneStall = async (req, res) => {
	const { username } = req.user;
	const user = await User.findOne({ username });
	const { id } = req.params;
	console.log('LOOKING FOR STALL ID', id);
	const stall = await Stall.findOne({ _id: id }).populate('location', { centerName: 1 }).populate('reviews');
	if (!stall) {
		throw new AppError('Stall not found', 404);
	}
	res.status(200).json(stall);
};
module.exports.recommended = async (req, res) => {
	const topThreeStalls = await Stall.find({}).limit(3).populate('author', { name: 1 });
	if (!topThreeStalls) {
		throw new AppError('Stalls not found', 404);
	}
	console.log(topThreeStalls);
	res.status(200).json(topThreeStalls);
};

module.exports.new = async (req, res) => {
	// this validates that the
	const stallJoiSchema = Joi.object({
		stallName: Joi.string().required(),
		cuisine: Joi.string().required(),
		location: Joi.string().required()
	});
	const { error } = stallJoiSchema.validate(req.body);
	if (error) {
		const errorMsg = error.details.map((msg) => msg.message).join(', ');
		throw new AppError(errorMsg, 400);
	}
	const newStall = new Stall(req.body);
	await newStall.save();
	res.status(201).json({ status: 201, message: 'ok' });
	console.log('NEW STALL SAVED');
};
