const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/", (req, res) => {
  res.send("Register a user");
});

module.exports = router;
