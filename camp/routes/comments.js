const express = require("express");
const router = express.Router();
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

router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
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

router.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        }
        else {
          campground.comments.push(comment);
          campground.save(err => {
            if (err) {
              console.log(err);
            }
            else {
              res.redirect("/campgrounds/" + campground._id);
            }
          });
        }
      });
    }
  });
});

// export

module.exports = router;
