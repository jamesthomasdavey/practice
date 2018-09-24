const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");

// SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });

// SEED
seedDB();

// ROOT ROUTE
app.get("/", (req, res) => {
  res.render("landing");
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
      res.render("index", { campgrounds });
    }
  })
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

// NEW
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

// SHOW
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render("show", { campground })
    }
  })
})

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Your server is running, hue man.");
});
