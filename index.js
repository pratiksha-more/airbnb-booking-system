const express = require("express");
const path = require("path");
const app = express();
const { data } = require("./init/data");
const mongoose = require("mongoose");
const Listing = require("./model/listning");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
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

async function seedDB() {
  await Listing.deleteMany({}); // Clears the database
  await Listing.insertMany(data);
  console.log("Sample Listings Added to DB");
}

seedDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  //console.log("Fetching all listings from the database...", Listing);
  // console.log("Listings from DB:", allListings);
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testlistings", async (req, res) => {
//   let sampleListings = new Listing({
//     title: "Test Listing",
//     decription: "This is a test listing",
//     image: "",
//     price: 100,
//     location: "Test Location",
//     country: "Test Country",
//   });

//   await sampleListings.save();
//   console.log("Sample listing saved to database");
//   res.send("Sample listing saved to database");
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
