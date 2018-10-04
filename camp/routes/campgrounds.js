const express = require("express");
const router = express.Router();
const Campground = "./../models/campground";

// define middleware

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// index route

router.get("/campgrounds", (req, res) => {
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

// new campground route

router.get("/campgrounds/new", (req, res) => {
  res.render("./campgrounds/new", { pageTitle: "YelpCamp: Add a New Campground" });
});

// create campground route

router.post("/campgrounds", (req, res) => {
  // gets properties of new campground from request
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;

  // saves new campground to database
  Campground.create({
    name: name,
    image: image,
    description: description
  }, (err, newCampground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

// show campground route
router.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render("./campgrounds/show", { campground, pageTitle: "YelpCamp: " + campground.name })
    }
  })
})

// export

module.exports = router;
