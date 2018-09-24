const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/associations-2", { useNewUrlParser: true });
const Post = require("./models/post");
const User = require("./models/user")

// create a new user

// User.create({
//   email: "andygutenberg@schwab.com",
//   name: "Andy Gutenberg"
// }, (err, user) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// })

// create a new post, add post to db, add reference of post to a user

// Post.create({
//   title: "Professionally Formulate Front-End",
//   content: "Credibly extend functionalized processes for bricks-and-clicks results. Objectively engage error-free opportunities for cost effective imperatives. Synergistically leverage other's resource-leveling schemas for multifunctional intellectual capital. Uniquely procrastinate exceptional testing procedures without robust solutions. Quickly negotiate bleeding-edge communities for low-risk high-yield opportunities. Quickly customize top-line deliverables through granular."
// }, (err, post) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     User.findOne({ email: "andygutenberg@schwab.com" }, (err, user) => {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         user.posts.push(post);
//         user.save((err, data) => {
//           if (err) {
//             console.log(err);
//           }
//           else {
//             console.log(data);
//           }
//         })
//       }
//     })
//   }
// })

// view posts of user

// User.findOne({ email: "andygutenberg@schwab.com" }).populate("posts").exec((err, user) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     user.posts.forEach(post => {
//       console.log(post.title);
//       console.log(post.content);
//     })
//   }
// })
