const movies = [
  {
    title: "In Bruges",
    rating: 5,
    hasWatched: true
  },
  {
    title: "Frozen",
    rating: 4.5,
    hasWatched: false
  },
  {
    title: "Max Max Fury Road",
    rating: 5,
    hasWatched: true
  },
  {
    title: "Les Miserables",
    rating: 3.5,
    hasWatched: false
  }
];

movies.forEach(movie => {
  let result = "You have ";
  result += movie.hasWatched ? "watched " : "not seen ";
  result += `"${movie.title}" - ${movie.rating} stars.`;
  console.log(result);
})