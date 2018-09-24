const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [{
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=800&q=60",
    description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
  },
  {
    name: "Salmon Creek",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=800&q=60",
    description: "A beautiful creek with copious salmons. A shirtless hippie perpetually wonders around playing \"wonderwall\" on his acoustic yamaha guitar."
  },
  {
    name: "Tee Pee Camp",
    image: "https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5fe4dcf894fbb997b29a76c6c9a9c32c&auto=format&fit=crop&w=800&q=60",
    description: "Native Americans are everywhere at this campground. They are friendly and will grant you the fulfillment of getting to think that you are cultured and never conquered their land nor do you fetishize cultures ever."
  },
  {
    name: "Woodland Camp",
    image: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4132e8087781addd674e137a9f596dc&auto=format&fit=crop&w=800&q=60",
    description: "Beautiful nature with tall evergreens and even taller grizzly bears."
  }
]

const seedDB = () => {
  // remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Removed all campgrounds!");
      data.forEach(campground => {
        Campground.create(campground, (err, currentCampground) => {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Added a campground!");
            Comment.create({
              text: "This place is great, but I wish there were internet!",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              }
              else {
                currentCampground.comments.push(comment);
                currentCampground.save();
                console.log("Created new comment!")
              }
            })
          }
        });
      })
    }
  })
}

module.exports = seedDB;
