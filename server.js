const express = require("express");
const session = require("express-session");
const connectDB = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/cloudinary", require("./routes/cloudinary"));

////
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

////
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    // in milliseconds
    maxAge: 24 * 60 * 60 * 1000,
    store: store,
  })
);
const userRoutes = require("./routes/user");
app.use("/", userRoutes);
const foodRoutes = require("./routes/food");
app.use("/food", foodRoutes);
const reviewRoutes = require("./routes/reviews");
const AppError = require("./AppError");
app.use("/reviews", reviewRoutes);

//// THROW ERROR IF USER TRIES TO ACCESS UNDEFINED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError("Unknown endpoint", 404));
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

connectDB(process.env.MONGODB_URI);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
