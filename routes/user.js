const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const { generateToken } = require("../utils/jwt.js");

// Signup Route
router
.route("/signup")
.get(userController.renderSignUpForm)
.post(
  wrapAsync(userController.signUpUser)
);

// Login Route
router
.route("/login")
.get(userController.renderLoginForm)
.post(wrapAsync(userController.loginUser)); 

router.get("/logout", userController.logoutUser);

module.exports = router;
