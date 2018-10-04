const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("./../models/campground");
const Comment = require("./../models/comment");

// define middleware

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// new comment route

router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("./comments/new", { campground, pageTitle: "YelpCamp: Write a Review for " + campground.title });
    }
  });
});

// create comment route

router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      const newComment = {
        text: req.body.comment.text,
        author: {
          id: req.user._id,
          username: req.user.username
        }
      }
      Comment.create(newComment, (err, comment) => {
        if (err) {
          console.log(err);
        }
        else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// export

module.exports = router;
