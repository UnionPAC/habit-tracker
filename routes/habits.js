const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();
const auth = require("../middleware/auth");
const { validationResult, check } = require("express-validator");
const Habit = require("../models/Habit");

// @route   GET api/habits
// @desc    Get all users habits
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({
      dateCreated: -1,
    });
    res.json(habits);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route   POST api/habits
// @desc    Create a new habit
// @access  Private
router.post(
  "/",
  [auth, [check("name", "please provide the habit name").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
      const newHabit = new Habit({
        name,
        description,
        user: req.user.id,
      });

      const habit = await newHabit.save();
      res.json(habit);
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

// @route   PUT api/habits/:id
// @desc    Update a habit
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, description } = req.body;

  // Build habit object
  const habitFields = {};

  if (name) habitFields.name = name;
  if (description) habitFields.description = description;

  try {
    let habit = await Habit.findById(req.params.id);

    // see if habit exists
    if (!habit) {
      return res.status(404).json({ message: "habit not found" });
    }

    // make sure the habit belongs to the right user
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "not authorized" });
    }
    // the $set operator replaces the value of a field with the specified value.
    habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { $set: habitFields },
      { new: true }
    ); // true returns the modified document rather than the original

    res.json(habit);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route   DELETE api/habits/:id
// @desc    Delete a habit
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // see if habit exists
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: "habit not found" });
    }

    // make sure the habit belongs to the user
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "not authorized" });
    }

    await Habit.findByIdAndRemove(req.params.id);

    res.json({ message: "habit deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;
