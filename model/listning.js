const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   type: String,
  //   default:
  //     "https://images.unsplash.com/photo-1747901718105-bf9beb57ba3a?q=80&w=1974&auto=format&fit=crop",
  //   set: (v) =>
  //     v === ""
  //       ? "https://images.unsplash.com/photo-1747901718105-bf9beb57ba3a?q=80&w=1974&auto=format&fit=crop"
  //       : v,
  // },

  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1747901718105-bf9beb57ba3a?q=80&w=1974&auto=format&fit=crop",
    },
  },
  price: Number,
  location: String, 
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
