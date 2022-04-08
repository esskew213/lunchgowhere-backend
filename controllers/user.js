const User = require("../models/User");
const Stall = require("../models/Stall");
const Review = require("../models/Review");
const HawkerCenter = require("../models/HawkerCenter");
const bcrypt = require("bcrypt");
const seedUsers = require("../seeds/seedUsers");
const seedStalls = require("../seeds/seedStalls");
const seedReviews = require("../seeds/seedReviews");
const seedHawkerCenters = require("../seeds/seedHawkerCenters");
const AppError = require("../AppError");

module.exports.seedAll = async (req, res) => {
  User.deleteMany({});
  Stall.deleteMany({});
  Review.deleteMany({});
  HawkerCenter.deleteMany({});

  for (let hc of seedHawkerCenters) {
    const newHC = new HawkerCenter({
      centerName: hc.name_of_centre,
      x: hc.X,
      y: hc.Y,
    });
    await newHC.save();
    console.log("seeded HC");
  }

  for (let user of seedUsers) {
    user.hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({
      name: user.name,
      username: user.username,
      hashedPassword: user.hashedPassword,
    });
    await newUser.save();
    console.log("seeded user");
  }
  const users = await User.find({});

  for (let i = 0; i < 3; i++) {
    const user = users[i];
    const stall = seedStalls[i];
    const location = await HawkerCenter.findOne({});

    const newStall = new Stall({
      stallName: stall.stallName,
      cuisine: stall.cuisine,
      location: location,
      author: user,
    });
    await newStall.save();
    console.log("seeded stall");
  }

  const stalls = await Stall.find({});
  for (let i = 0; i < 3; i++) {
    const user = users[i];
    const stall = stalls[i];
    const review = seedReviews[i];
    const newReview = new Review({
      price: review.price,
      waitTime: review.waitTime,
      wouldEatAgain: review.wouldEatAgain,
      wouldQueueAgain: review.wouldQueueAgain,
      author: user,
      stall: stall,
    });
    await newReview.save();
    console.log("seeded review");
  }

  console.log("SEEDED DB");
  res.end();
};

module.exports.signup = async (req, res) => {
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ name, username, hashedPassword });
  await newUser.save();
  req.session.user_id = newUser._id;
  res.redirect("/");
};

module.exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    console.log("Invalid username.");
    throw new AppError("Invalid username.", 400);
  }
  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (validPassword) {
    req.session.user_id = user._id;
    res.json({ status: 200, message: "ok" });
  } else {
    console.log("Invalid password.");
    throw new AppError("Invalid password.", 400);
  }
};

module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ status: "ok", message: "logged out" });
  });
};
