const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { authenticateJWT } = require("../utils/jwt.js");
require("dotenv").config();




router
  .route("/")
  // Show all listings
  .get(wrapAsync(listingController.showAllListings))
  // Create Listing Route (protected)
  .post(
    authenticateJWT,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// New Route is kept above SHOW ROUTE bcoz database is considering new as id
router.get("/new", authenticateJWT, listingController.renderNewListingForm);

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; 
    if (!query) {
      return res.redirect("/listings");
    }

    const listings = await Listing.find({
      title: { $regex: query, $options: "i" },
    });

    res.render("listings/searchResults", { listings, query });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/listings", async (req, res) => {
  try {
    const filterType = req.query.type || null;
    let listings;

    if (filterType) {
      listings = await Listing.find({ type: filterType });
    } else {

      listings = await Listing.find({});
    }
    res.render("listings/index", { allListings: listings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Internal Server Error");
  }
});


router
  .route("/:id")
  // Show specific Listing Route
  .get(wrapAsync(listingController.showSpecificListing))
  // Edit Route (protected)
  .put(
    authenticateJWT,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.editListing)
  )
  // Delete Route (protected)
  .delete(authenticateJWT, isOwner, wrapAsync(listingController.destroyListing));

// Edit Form render Route
router.get(
  "/:id/edit",
  authenticateJWT,
  isOwner,
  wrapAsync(listingController.renderEditListingForm)
);

module.exports = router;
