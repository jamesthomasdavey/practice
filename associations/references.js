const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog_demo_2", { useNewUrlParser: true });

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
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
})
const User = mongoose.model("User", userSchema);

User.findOne({ email: "bob@gmail.com" }).populate("posts").exec((err, user) => {
  if (err) {
    console.log(err);
  }
  else {
    user.posts.forEach(post => {
      console.log(post.title);
      console.log(post.content);
    })
    // console.log(user.posts);
  }
})

// Post.create({
//   title: "How to cook the best burger, Part 3",
//   content: "Quickly develop enabled innovation and client-centered sources. Compellingly redefine equity invested information before frictionless partnerships. Phosfluorescently synthesize interdependent infrastructures with."
// }, (err, post) => {
//   User.findOne({ email: "bob@gmail.com" }, (err, user) => {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       user.posts.push(post);
//       user.save((err, data) => {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log(data);
//         }
//       })
//     }
//   })
// })
