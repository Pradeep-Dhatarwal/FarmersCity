const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
var topSellingSchema = new mongoose.Schema({
  name: String,
  image: String,
  price:String,
  link: String
});

topSellingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("TopSelling", topSellingSchema);