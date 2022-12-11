const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();

// @route   GET api/auth
// @desc    Get the logged in user
// @access  Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// @route   GET api/auth
// @desc    Auth user & get token
// @access  Public
router.post("/", (req, res) => {
  res.send("Login user");
});

module.exports = router;
