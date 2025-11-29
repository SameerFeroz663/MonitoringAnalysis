const jwt = require("jsonwebtoken");
const JWT_SECRET = "74ed83cf4fc2fa01d63ac96c536cc3b9";

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ success: false, msg: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, msg: "Invalid token" });

    req.userId = decoded.id;
    next();
  });
};
