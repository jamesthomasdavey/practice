const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// post model & schema

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

// user model & schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [postSchema]
})

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//   name: "Hugh Michaelson",
//   email: "hughmichaelson@gmail.com"
// })

// newUser.posts.push({
//   title: "Hello, my name is... ",
//   content: "Hughy McMichaelson"
// });

// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// })

User.findOne({ name: "Charlie Brown" }, (err, user) => {
  if (err) {
    console.log(err);
  }
  else {
    user.posts.push({
      title: "Look at me, my name is... ",
      content: "Charles McBrownerson!"
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(user);
      }
    })
  }
})
