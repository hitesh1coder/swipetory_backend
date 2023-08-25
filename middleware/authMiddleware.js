const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: "Auth Error: No token provided." });
  }
  try {
    const decoded = jwt.verify(token, "<YOUR_SECRET>");
    req.user = decoded.userId;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
