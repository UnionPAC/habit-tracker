// https://www.npmjs.com/package//mongoose
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const jwtSecret = config.get("jwtSecret");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected successfully!");
    console.log(db);
    console.log(jwtSecret);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
