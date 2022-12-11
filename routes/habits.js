const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();

// @route   GET api/habits
// @desc    Get all users habits
// @access  Private
router.get("/", (req, res) => {
  res.send("Get all users habits");
});

// @route   POST api/habits
// @desc    Create a new habit
// @access  Private
router.post("/", (req, res) => {
  res.send("Create habit");
});

// @route   PUT api/habits/:id
// @desc    Update a habit
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Update habit");
});

// @route   DELETE api/habits/:id
// @desc    Delete a habit
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete habit");
});

module.exports = router;
