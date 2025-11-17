const Booking = require("../models/booking");
const Listing = require("../models/listings");
const wrapAsync = require("../utils/wrapAsync");

module.exports.createBooking = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;
    
    const listing = await Listing.findById(id);
    if (!listing) {
        // req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    const booking = new Booking({
        listing: id,
        user: req.user.id,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut)
    });

    await booking.save();
    res.redirect(`/listings/${id}`);
});