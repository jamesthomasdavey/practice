const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Bodega Dunes",
    image:
      "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Sierra City",
    image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Bodega Dunes",
    image:
      "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Sierra City",
    image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Bodega Dunes",
    image:
      "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Sierra City",
    image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Bodega Dunes",
    image:
      "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Sierra City",
    image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
  },
  {
    name: "Salmon Creek",
    image:
      "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Bodega Dunes",
    image:
      "https://pixabay.com/get/eb30b90e2af0033ed1584d05fb1d4e97e07ee3d21cac104496f7c279a1e9b3bd_340.jpg"
  },
  {
    name: "Sierra City",
    image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"
  }
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds });
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  campgrounds.push({
    name: name,
    image: image
  });
  res.redirect("campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("Your server is running, hue man.");
});
