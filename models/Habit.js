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
  recurring: {
    type: String,
    default: "daily",
  },
  goalCompletion: {
    type: Number,
    default: 1,
  },
  currentCompletion: {
    type: Number,
    default: 0,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
