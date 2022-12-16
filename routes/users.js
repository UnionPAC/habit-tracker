const express = require("express");

// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/", // 1. checks w/ express-validator
  // name is required
  check("name", "please enter your name").notEmpty(),
  // email is required, and must be an email
  check("email", "please enter a valid email").isEmail(),
  // password is required & at least 6 characters long
  check("password", "password must be at least 6 characters").isLength({
    min: 6,
  }),
  // 2. req/res callback func
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // await user.save();
      const payload = {
        user: {
          id: user.id, // each user has a unique id in mongoDB
        },
      };

      // sign the jwt
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
