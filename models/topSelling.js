const mongoose = require("mongoose");

var topSellingSchema = new mongoose.Schema({
  name: {type: String , unique: true},
  price:String,
  link: String,
  cartLink:String,
  productImg:String
});


module.exports = mongoose.model("TopSelling", topSellingSchema);