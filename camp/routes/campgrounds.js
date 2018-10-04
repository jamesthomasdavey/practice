const express = require("express");
const router = express.Router();
const Campground = require("./../models/campground");

// define middleware

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// index route

router.get("/", (req, res) => {
  // get campgrounds from db
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    }
    else {
      // render campgrounds retrieved from db
      res.render("./campgrounds/index", { campgrounds, pageTitle: "YelpCamp: All Campgrounds" });
    }
  })
});

// show campground route

router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render("./campgrounds/show", { campground, pageTitle: "YelpCamp: " + campground.name })
    }
  })
})

// new campground route

router.get("/new", isLoggedIn, (req, res) => {
  res.render("./campgrounds/new", { pageTitle: "YelpCamp: Add a New Campground" });
});

// create campground route

router.post("/", isLoggedIn, (req, res) => {
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
      console.log(err)
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

// edit campground route

router.get("/:id/edit", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("./campgrounds/edit", { campground, pageTitle: "YelpCamp: Edit " + campground.name });
    }
  })
})

// update campground route

router.put("/:id", isLoggedIn, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})

// export

module.exports = router;
