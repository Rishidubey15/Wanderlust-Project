require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const url = process.env.ATLASDB_URL; // Use Atlas connection string

main()
  .then(() => {
    console.log("Data was submitted");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const ownerId = new mongoose.Types.ObjectId("67961a1e07797ead053fd58e");
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was saved successfully");
};

initDB();