const Listing = require("../models/listings.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Show all Listings Callbacks
module.exports.showAllListings = async (req, res) => {
  const { type } = req.query;
  let query = {};
  
  if (type) {
    query.type = type;
  }
  
  let allListings = await Listing.find(query);
  res.render("listings/index.ejs", { allListings, type });
};

//Create Route Callbacks
module.exports.renderNewListingForm = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.createNewListing = async (req, res, next) => {
  let response =  await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send()
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing); 
  newListing.owner = req.user.id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  res.redirect("/listings");
};

// Edit Lsting Route
module.exports.renderEditListingForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id).populate('owner');
  if (!listing) {
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  res.redirect(`/listings/${id}`);
};

// Delete route
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect(`/listings`);
};

// Show specific Listing route
module.exports.showSpecificListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};
