// https://www.npmjs.com/package//mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
