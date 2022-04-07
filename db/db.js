const mongoose = require('mongoose');

const connectDB = async (uri) => {
	try {
		console.log('connecting...');
		await mongoose.connect(uri);
		console.log('CONNECTED');
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
};
module.exports = connectDB;
