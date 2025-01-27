const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const url = "mongodb://127.0.0.1:27017/wanderlust";

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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "670103be6c22a1d06de24c17",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was saved successfully");
};

initDB();
