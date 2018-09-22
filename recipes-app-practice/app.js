// import packages

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// use packages

mongoose.connect("mongodb://localhost:27017/recipes-app-practice", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// set up schema / model

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  ingredients: String,
  instructions: String,
  create: { type: Date, default: Date.now }
})

const Recipe = mongoose.model("Recipe", recipeSchema);

// set public folder

app.use(express.static("public"));

//// ROUTES ////

app.get("/", (req, res) => {
  res.redirect("/recipes");
})

// index route

app.get("/recipes", (req, res) => {
  const pageTitle = "Recipes";
  Recipe.find({}, (err, recipes) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("index", { pageTitle, recipes });
    }
  })
})

// new route

app.get("/recipes/new", (req, res) => {
  const pageTitle = "Create a New Recipe";
  res.render("new", { pageTitle });
})

app.post("/recipes", (req, res) => {
  Recipe.create(req.body.recipe, (err, addedRecipe) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/");
    }
  })
})

// run server

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Recipes app is running!");
})
