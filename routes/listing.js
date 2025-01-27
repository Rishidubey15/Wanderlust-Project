const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
require("dotenv").config();


router
  .route("/")

  // Show all listings
  .get(wrapAsync(listingController.showAllListings))

  // Create Listing Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// New Route is kept above SHOW ROUTE bcoz database is considering new as id
router.get("/new", isLoggedIn, listingController.renderNewListingForm);

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the URL
    if (!query) {
      return res.redirect("/listings"); // Redirect if no search term is provided
    }

    // Perform a case-insensitive search using MongoDB regex
    const listings = await Listing.find({
      title: { $regex: query, $options: "i" }, // Search by title
    });

    // Render a search results page or return JSON
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
      // Fetch only listings matching the filter type
      listings = await Listing.find({ type: filterType });
    } else {
      // Fetch all listings if no filter is selected
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

  // Edit Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.editListing)
  )

  //Delete Route
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

// Edit Form render Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditListingForm)
);

module.exports = router;
