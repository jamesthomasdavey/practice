const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [{
    name: "Granite Hill",
    image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa6e65fcad07b9a68420c430034f84f2&auto=format&fit=crop&w=800&q=60",
    description: "Continually reconceptualize interactive resources whereas wireless sources. Assertively recaptiualize cost effective functionalities and frictionless internal or \"organic\" sources. Compellingly foster real-time \"outside the box\" thinking for orthogonal partnerships. Appropriately aggregate web-enabled networks via extensive catalysts for change. Dramatically pontificate pandemic niche markets through interactive networks. Continually synergize e-business experiences without emerging technology. Assertively foster transparent solutions whereas pandemic initiatives. Phosfluorescently architect interdependent expertise before cross-platform collaboration."
  },
  {
    name: "Salmon Creek",
    image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c85daa025ee04c951b6ac12fe3ba031a&auto=format&fit=crop&w=800&q=60",
    description: "Holisticly re-engineer equity invested outsourcing before world-class initiatives. Holisticly brand intuitive intellectual capital vis-a-vis cost effective collaboration and idea-sharing. Energistically fabricate multimedia based strategic theme areas for interdependent content. Compellingly scale superior metrics vis-a-vis just in time mindshare. Enthusiastically benchmark covalent innovation for go forward markets. Interactively streamline timely convergence and dynamic scenarios. Efficiently extend multimedia based value before long-term high-impact sources. Intrinsicly synthesize."
  },
  {
    name: "Tee Pee Camp",
    image: "https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5fe4dcf894fbb997b29a76c6c9a9c32c&auto=format&fit=crop&w=800&q=60",
    description: "Completely impact client-centered vortals without diverse initiatives. Compellingly seize virtual intellectual capital with covalent sources. Proactively whiteboard reliable systems for integrated growth strategies. Collaboratively implement error-free manufactured products for reliable models. Monotonectally evisculate seamless scenarios after multimedia based total linkage. Globally strategize professional infrastructures through client-focused applications. Authoritatively exploit competitive technologies before 2.0 convergence. Uniquely build resource-leveling meta-services after bricks-and-clicks testing procedures. Holisticly recaptiualize."
  },
  {
    name: "Moonland Camp",
    image: "https://images.unsplash.com/photo-1501703979959-797917eb21c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4132e8087781addd674e137a9f596dc&auto=format&fit=crop&w=800&q=60",
    description: "Intrinsicly synergize front-end networks through client-focused results. Phosfluorescently initiate distinctive infomediaries after resource sucking data. Assertively visualize go forward process improvements before prospective growth strategies. Dramatically develop ubiquitous processes whereas 24/7 best practices. Dramatically cultivate customer directed core competencies without focused e-tailers. Assertively promote economically sound e-tailers through cross-unit processes. Assertively brand bricks-and-clicks content with flexible quality vectors. Uniquely monetize business results through transparent."
  },
  {
    name: "Monument Valley",
    image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3761b04cf7c21b831647fbef86ad438&auto=format&fit=crop&w=800&q=60",
    description: "Continually promote real-time niche markets through backend best practices. Enthusiastically build intermandated value whereas next-generation e-services. Interactively incubate backward-compatible networks for diverse leadership. Quickly grow 24/7 materials vis-a-vis quality web services. Continually supply clicks-and-mortar synergy with user-centric action items. Progressively create vertical technology without functionalized bandwidth. Enthusiastically grow interdependent leadership through robust value. Credibly supply cross-media customer service and real-time growth strategies. Objectively syndicate maintainable \"outside the box\" thinking."
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
