const Stall = require('../models/Stall');
const AppError = require('../AppError');
const Joi = require('joi');
module.exports.recommended = async (req, res, next) => {
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
