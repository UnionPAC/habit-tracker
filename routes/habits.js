const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();
const auth = require("../middleware/auth");

// @route   GET api/habits
// @desc    Get all users habits
// @access  Private
router.get("/", auth, (req, res) => {
  res.json({ message: "Get all habits for a single user" });
});

// @route   POST api/habits
// @desc    Create a new habit
// @access  Private
router.post("/", auth, (req, res) => {
  res.json({ message: "Create a single habit for a user" });
});

// @route   PUT api/habits/:id
// @desc    Update a habit
// @access  Private
router.put("/:id", auth, (req, res) => {
  res.json({ message: "Update a single habit for a user" });
});

// @route   DELETE api/habits/:id
// @desc    Delete a habit
// @access  Private
router.delete("/:id", auth, (req, res) => {
  res.json({ message: "Delete a single habit for a user" });
});

module.exports = router;
