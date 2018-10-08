const Comment = require("./../models/comment");
const Campground = require("./../models/campground");

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};


middlewareObj.isCommentOwner = (req, res, next) => {
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

middlewareObj.isCampgroundOwner = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        console.log(err);
      }
      else {
        if (campground.creator.id.equals(req.user._id)) {
          next();
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


module.exports = middlewareObj;
