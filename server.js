const express = require('express');
const session = require('express-session');
const connectDB = require('./db/db');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const foodRoutes = require('./routes/food');
app.use('/', foodRoutes);
const userRoutes = require('./routes/user');
app.use('/', userRoutes);
const reviewRoutes = require('./routes/reviews');
app.use('/reviews', reviewRoutes);
////
const store = new MongoDBStore({
	uri: process.env.MONGODB_URI,
	collection: 'sessions'
});
////
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		// in milliseconds
		maxAge: 24 * 60 * 60 * 1000,
		store: store
	})
);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong' } = err;
});

connectDB(process.env.MONGODB_URI);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`LISTENING ON PORT ${PORT}`);
});
