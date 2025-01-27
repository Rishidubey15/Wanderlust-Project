const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true, // Ensure price is mandatory
    min: 0, // Price cannot be negative
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true, // Ensures every listing has an owner
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // Enforces 'Point' type for geometry
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2; // Ensures exactly two coordinates [longitude, latitude]
        },
        message: "Coordinates must contain [longitude, latitude]",
      },
    },
  },
  type: {
    type: String,
    enum: [
      "trending", 
      "farms", 
      "beach", 
      "iconic city", 
      "castle", 
      "mountain", 
      "arctic", 
      "dome", 
      "camps", 
      "rooms", 
      "pools", 
      "igloo"
    ], // Restrict to predefined categories
    required: true, // Make it mandatory
    default: "rooms",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
