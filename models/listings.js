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
    required: true, 
    min: 0,
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
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2; 
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
    ],
    required: true, 
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
