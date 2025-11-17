const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateBooking } = require("../middleware");
const bookingController = require("../controllers/bookings");

router.post("/listings/:id/bookings", isLoggedIn, validateBooking, bookingController.createBooking);

module.exports = router;