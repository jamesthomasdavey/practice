const mongoose = require("mongoose");

// post schema/model

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model("Post", postSchema);
