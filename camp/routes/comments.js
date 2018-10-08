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

const isCommentOwner = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.commentId, (err, foundComment) => {
      if (err) {
        console.log(err);
      }
      else {
        if (foundComment.author.id.equals(req.user._id)) {
          return next();
        }
        else {
          res.redirect("back");
        }
      }
    })
  }
  else {
    res.redirect("/login");
  }
}

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

// edit comment route

router.get("/:commentId/edit", isCommentOwner, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    }
    else {
      Comment.findById(req.params.commentId, (err, foundComment) => {
        if (err) {
          console.log(err);
        }
        else {
          res.render("./comments/edit", { comment: foundComment, campground: foundCampground, pageTitle: "YelpCamp: Edit comment for " + foundCampground.name });
        }
      })
    }
  })
})

// update comment route

router.put("/:commentId", isCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// delete comment route

router.delete("/:commentId", isCommentOwner, (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// export

module.exports = router;
