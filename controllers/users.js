const User = require("../models/user.js");
const { generateToken } = require("../utils/jwt.js");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUpUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    const token = generateToken(registeredUser);
    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.redirect("/listings");
  } catch (err) {
    res.status(400).render("users/signup.ejs", { error: err.message });
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("users/login.ejs", { error: "Invalid username or password" });
  }
  const isValid = await user.authenticate(password);
  if (!isValid.user) {
    return res.status(400).render("users/login.ejs", { error: "Invalid username or password" });
  }
  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  res.redirect("/listings");
};

module.exports.logoutUser = (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/listings");
};
