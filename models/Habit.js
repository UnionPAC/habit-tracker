const mongoose = require("mongoose");
const { Schema } = mongoose;

// name
// description
// current streak
// longest streak

const habitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
