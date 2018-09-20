const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", { useNewUrlParser: true });

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// let edgar = new Cat({
//     name: "Mrs Norris",
//     age: 7,
//     temperament: "Evil"
// })

// edgar.save((err, cat) => {
//     if (err) {
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DATABASE:");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Fuzzles",
//     age: 12,
//     temperament: "Funny"
// }, (err, cat) => {
//     err ? console.log(err) : console.log(cat);
// })

Cat.find({}, (err, cats) => {
    if (err) {
        console.log("oh no, error");
        console.log(err);
    } else {
        console.log("all the cats");
        console.log(cats);
    }
})