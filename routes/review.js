const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isAuthor} = require("../middleware.js")
const { authenticateJWT } = require("../utils/jwt.js");
const reviewController = require("../controllers/reviews.js")


// Create Route
router.post(
  "/",
  authenticateJWT,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Route
router.delete(
  "/:reviewId",
  authenticateJWT,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;