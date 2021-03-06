const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
var newsSchema = new mongoose.Schema({
  heading: String,
  image: String,
  pageDescription:String,
  description: String,
  slug: String,
  date: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  myslug: { type: String, slug: ["slug"], unique: true },
});

newsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("News", newsSchema);