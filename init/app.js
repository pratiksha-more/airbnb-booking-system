const mongoose = require("mongoose");
const intData = require("./data");
const Listing = require("../model/listning.js");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/wonderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(intData.data);
  console.log("Database initialized with sample data");
};

initDB();
