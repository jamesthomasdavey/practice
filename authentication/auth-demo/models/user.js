// import packages

const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

// create user schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// add passport-local-mongoose methods to userSchema, that we'll need for user authentication

userSchema.plugin(passportLocalMongoose);

// create/export User model, using userSchema

module.exports = mongoose.model("User", userSchema);
