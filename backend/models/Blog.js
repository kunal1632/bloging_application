const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogText: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
