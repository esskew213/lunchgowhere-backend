const Stall = require('../models/Stall');
const User = require('../models/User');
const Image = require('../models/Image');
const HawkerCenter = require('../models/HawkerCenter');
const seedHawkerCenters = require('../seeds/seedHawkerCenters');
const ObjectID = require('mongoose').Types.ObjectId;
const UserError = require('../UserError');
const Joi = require('joi');
module.exports.getOneStall = async (req, res) => {
	const { username } = req.user;
	const user = await User.findOne({ username });
	const { id } = req.params;
	if (ObjectID.isValid(id)) {
		console.log('LOOKING FOR STALL ID', id);
		const stall = await Stall.findOne({ _id: id }).populate('location', { centerName: 1 }).populate('reviews');
		if (!stall) {
			throw new UserError('Stall not found', 404);
		} else {
			res.status(200).json(stall);
		}
	} else {
		console.log('INVALID STALL ID', id);
		throw new UserError('Stall not found', 404);
	}
};
module.exports.recommended = async (req, res) => {
	const topThreeStalls = await Stall.find({}).limit(3).populate('author', { name: 1 });
	if (!topThreeStalls) {
		throw new UserError('Stalls not found', 404);
	}
	console.log(topThreeStalls);
	res.status(200).json(topThreeStalls);
};

module.exports.new = async (req, res) => {
	// const stallJoiSchema = Joi.object({
	// 	stallName: Joi.string().required(),
	// 	cuisine: Joi.string().required(),
	// 	location: Joi.string().required()
	// });
	// const { error } = stallJoiSchema.validate(req.body);
	// if (error) {
	// 	const errorMsg = error.details.map((msg) => msg.message).join(', ');
	// 	throw new UserError(errorMsg, 400);
	// }
	const { username } = req.user;
	const user = await User.findOne({ username });
	const resFromCloudinary = req.file;
	const { location, stallName, cuisine } = req.body;
	console.log(location, stallName, cuisine);
	const hawkerCenter = await HawkerCenter.findOne({ centerName: location });
	console.log(hawkerCenter);
	const newImage = new Image({ url: resFromCloudinary.path, filename: resFromCloudinary.filename });
	await newImage.save();
	const newStall = new Stall({
		stallName: stallName,
		cuisine: cuisine,
		location: hawkerCenter,
		author: user,
		img: newImage
	});
	console.log(newStall);
	await newStall.save();
	res.status(201).json({ status: 201, message: 'ok' });
	console.log('NEW STALL SAVED');
};

module.exports.seedHawkers = async (req, res) => {
	await HawkerCenter.deleteMany({});

	for (let hc of seedHawkerCenters) {
		const newHC = new HawkerCenter({
			centerName: hc.name_of_centre,
			x: hc.X,
			y: hc.Y
		});
		await newHC.save();
		console.log('seeded HC');
	}
};
