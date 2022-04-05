const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	res.send('FOOD');
});

const seedStalls = require('../seeds/seedStalls');
const Stall = require('../models/Stall');
router.get('/seedStalls', async (req, res) => {
	Stall.deleteMany({});
	for (let stall of seedStalls) {
		const newStall = new Stall(stall);
		await newStall.save();
	}
	console.log('SEEDED STALLS');
	res.end();
});

module.exports = router;
