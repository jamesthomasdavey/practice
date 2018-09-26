// import packages

const mongoose = require("mongoose");

// user schema

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [{
    // specifies that each item in the array will be an objectID
    type: mongoose.Schema.Types.ObjectId,
    // uses the Post model (not the schema), and is in quotes
    ref: "Post"
  }]
})

module.exports = mongoose.model("User", userSchema);
