const mongoose = require("mongoose");

var topSellingSchema = new mongoose.Schema({
  name: String,
  image: String,
  price:String,
  link: String,
  cartLink:String
});


module.exports = mongoose.model("TopSelling", topSellingSchema);