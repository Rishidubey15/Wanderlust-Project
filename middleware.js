const ExpressError = require("./utils/ExpressError.js");
const Listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const { listingSchema, reviewSchema, bookingSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!res.locals.currUser) {
    req.flash(
      "error",
      "You are not logged in! Please log in to make any changes"
    );
    return res.redirect("/login");
  }
  req.user = res.locals.currUser; // Make user info available in req.user for consistency
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async(req, res, next) => {
  let { id } = req.params;    
  let listing = await Listing.findById(id);
  // Use id from JWT/currUser
  if(!listing.owner.equals(res.locals.currUser.id)){
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isAuthor = async(req, res, next) => {
  let {id, reviewId } = req.params;    
  let review = await Review.findById(reviewId)
  if(!review.author.equals(res.locals.currUser.id)){
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateBooking = (req, res, next) => {
  let { error } = bookingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
