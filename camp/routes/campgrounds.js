const express = require("express");
const router = express.Router();
const Campground = require("./../models/campground");
const middleware = require("./../middleware")

// index route

router.get("/", (req, res) => {
  // get campgrounds from db
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      req.flash("error", "Campground not found!");
      res.redirect("/campgrounds");
    }
    else {
      // render campgrounds retrieved from db
      res.render("./campgrounds/index", { campgrounds, pageTitle: "YelpCamp: All Campgrounds" });
    }
  })
});

// new campground route

router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("./campgrounds/new", { pageTitle: "YelpCamp: Add a New Campground" });
});

// create campground route

router.post("/", middleware.isLoggedIn, (req, res) => {
  // gets properties of new campground from request
  // saves new campground to database
  Campground.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    creator: {
      id: req.user._id,
      username: req.user.username
    }
  }, (err, newCampground) => {
    if (err) {
      req.flash("error", "Unable to create a new campground.")
      res.redirect("/campgrounds");
    }
    else {
      req.flash("success", "Successfully added a new campground!");
      res.redirect("/campgrounds");
    }
  });
});

// show campground route

router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      req.flash("error", "Campground not found!");
      res.redirect("/campgrounds");
    }
    else {
      res.render("./campgrounds/show", { campground, pageTitle: "YelpCamp: " + campground.name })
    }
  })
})

// edit campground route

router.get("/:id/edit", middleware.isCampgroundOwner, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash("error", "Campground not found!");
      res.redirect("back");
    }
    else {
      res.render("./campgrounds/edit", { campground, pageTitle: "YelpCamp: Edit " + campground.name })
    }
  })
})

// update campground route

router.put("/:id", middleware.isCampgroundOwner, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
    if (err) {
      req.flash("error", "Unable to update campground!");
      res.redirect("/campgrounds/" + req.params.id);
    }
    else {
      req.flash("success", "Changes saved!")
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// destroy campground route

router.delete("/:id", middleware.isCampgroundOwner, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, err => {
    if (err) {
      req.flash("Unable to remove campground!")
      res.redirect("/campgrounds");
    }
    else {
      req.flash("success", "Campground removed!");
      res.redirect("/campgrounds");
    }
  })
})

// export

module.exports = router;
