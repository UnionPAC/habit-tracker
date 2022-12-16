const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

// is a function that has access to the req/res cycle
// we can fire of this middleware, when we hit and endpoint

// check to see if a token is passed in the header

module.exports = (req, res, next) => {
  // 1. get token from header
  const token = req.header("x-auth-token");

  // 2. check if there is no token
  if (!token) {
    return res.status(401).json({ message: "authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "token not valid" });
  }
};
