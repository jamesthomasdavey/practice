const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/associations-2", { useNewUrlParser: true });

// post schema

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post", postSchema);

// user schema

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
})

const User = mongoose.model("User", userSchema);

// make a new user

// User.create({
//   email: "larrysmith@optimalsolutions.io",
//   name: "Larry Smith"
// });

// add a new post for that user

// User.findOne({
//   email: "larrysmith@optimalsolutions.io"
// }, (err, user) => {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     user.posts.push({
//       title: "Predominate Prospective Schemas",
//       content: "Uniquely restore equity invested intellectual capital via backward-compatible services. Interactively e-enable resource maximizing models after resource sucking \"outside the box\" thinking. Quickly matrix proactive initiatives vis-a-vis market positioning mindshare. Energistically simplify collaborative collaboration."
//     });
//     user.save((err, user) => {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         console.log(user);
//       }
//     })
//   }
// })
