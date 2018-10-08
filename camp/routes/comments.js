const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("./../models/campground");
const Comment = require("./../models/comment");
const middleware = require("./../middleware")

// new comment route

router.get("/new", middleware.isLoggedIn, (req, res) => {
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

router.post("/", middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash("error", "Campground not found!");
      res.redirect("/campgrounds");
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
          req.flash("error", "Could not create comment!");
          res.redirect("/campgrounds/" + campground._id)
        }
        else {
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Comment added!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// edit comment route

router.get("/:commentId/edit", middleware.isCommentOwner, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      req.flash("error", "Campground not found!");
      res.redirect("/campgrounds");
    }
    else {
      Comment.findById(req.params.commentId, (err, foundComment) => {
        if (err) {
          req.flash("error", "Comment not found!");
          res.redirect("/campgrounds/" + req.params.id);
        }
        else {
          res.render("./comments/edit", { comment: foundComment, campground: foundCampground, pageTitle: "YelpCamp: Edit comment for " + foundCampground.name });
        }
      })
    }
  })
})

// update comment route

router.put("/:commentId", middleware.isCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
    if (err) {
      req.flash("error", "Could not update comment!");
      res.redirect("/campgrounds/" + req.params.id)
    }
    else {
      req.flash("success", "Changes saved!")
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// delete comment route

router.delete("/:commentId", middleware.isCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    if (err) {
      req.flash("error", "Could not remove comment!");
      res.redirect("/campgrounds/" + req.params.id);
    }
    else {
      req.flash("success", "Comment removed!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// export

module.exports = router;
