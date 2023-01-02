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
  // 1 = daily, 7 = weekly
  frequency: {
    type: Number,
    default: 1,
    require: true
  },
  numPerFrequency: {
    type: Number,
    default: 1,
    require: true
  },
  currentCompletion: {
    type: Number,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
