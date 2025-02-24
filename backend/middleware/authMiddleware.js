const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Access Denied" });

  try {
    const decoded = jwt.verify(token, "yourSecretKey");
    req.user = decoded; // Add user data to request
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
