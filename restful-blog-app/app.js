const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost:27017/restful-blog-app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// mongoose model config

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// routes

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// index route
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {blogs});
    }
  })
});

// new route
app.get("/blogs/new", (req, res) => {
  res.render("new");
})

// create route
app.post("/blogs", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog, (err, postDb) => {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  })
})

// show route
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blogPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {blogPost});
    }
  })
})

// edit route

app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, blogPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", {blogPost})
    }
  })
})

// update route

app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blogPost) => {
    res.redirect("/blogs/" + req.params.id);
  })
})

// delete route

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  })
})

// server

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Your server is running, hue man.");
});
