// REQUIRE PACKAGES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
// const passportLocalMongoose = require("passport-local-mongoose");

// REQUIRE MODELS/JS
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

// SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });

// SEED
seedDB();

// ROOT ROUTE
app.get("/", (req, res) => {
  res.render("./landing", { pageTitle: "Welcome to YelpCamp" });
});

// INDEX
app.get("/campgrounds", (req, res) => {
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

// NEW
app.get("/campgrounds/new", (req, res) => {
  res.render("./campgrounds/new", { pageTitle: "YelpCamp: Add a New Campground" });
});

// CREATE
app.post("/campgrounds", (req, res) => {
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

// SHOW
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render("./campgrounds/show", { campground, pageTitle: "YelpCamp: " + campground.name })
    }
  })
})

//=====================
//==== COMMENTS ROUTES
//=====================

// NEW
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("./comments/new", { campground, pageTitle: "YelpCamp: Write a Review for " + campground.title })
    }
  })
})

// CREATE
app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
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
          })
        }
      })
    }
  })
})


app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Your server is running, hue man.");
});
