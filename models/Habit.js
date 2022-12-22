const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  // default 1 = daily
  frequency: {
    type: Number,
    default: 1
  },
  // default 1 = 1x per day
  numPerFrequency: {
    type: Number,
    default: 1
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
