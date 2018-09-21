const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/camp", { useNewUrlParser: true });

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

// Campground.create({
//   name: "Granite Hill",
//   image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=800&q=60",
//   description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
// });

// INDEX
app.get("/campgrounds", (req, res) => {
  // get campgrounds from db
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
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
    } else {
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
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    } else {
      res.render("show", { campground });
    }
  })
  // find campground with provided ID
})

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Your server is running, hue man.");
});
