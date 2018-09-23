// import packages

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// use packages

mongoose.connect("mongodb://localhost:27017/recipes-app-practice", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// set public folder

app.use(express.static("public"));

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
  });
});

// new route

app.get("/recipes/new", (req, res) => {
  const pageTitle = "Create a New Recipe";
  res.render("new", { pageTitle });
});

app.post("/recipes", (req, res) => {
  Recipe.create(req.body.recipe, (err, addedRecipe) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/");
    }
  });
});

// show route

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) {
      console.log(err);
    }
    else {
      const pageTitle = recipe.title;
      res.render("show", { pageTitle, recipe });
    }
  })
})

// edit route

app.get("/recipes/:id/edit", (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) {
      console.log(err);
    }
    else {
      const pageTitle = "Edit " + recipe.title;
      res.render("edit", { pageTitle, recipe })
    }
  })
})

app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, recipe) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/recipes/" + req.params.id);
    }
  })
})

// delete route

app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/recipes");
    }
  })
})

// run server

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("Recipes app is running!");
})
