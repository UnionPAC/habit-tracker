const express = require("express");
// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();
const { validationResult, check } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const auth = require("../middleware/auth");


// @route   GET api/auth
// @desc    Get the logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route   GET api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  "/",
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter your password").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "no user found with that email" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "invalid login & password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Sorry about that, we ran into a server error");
    }
  }
);

module.exports = router;
