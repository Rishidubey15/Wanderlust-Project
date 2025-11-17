const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "Thisisasecret";

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: "1d" });
}

function authenticateJWT(req, res, next) {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (token) {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).redirect("/login");
  }
}

module.exports = { generateToken, authenticateJWT };