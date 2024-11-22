import React from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title }) {
  const movies = Array(7).fill({
    id: 1,
    title: "Movie",
    image: "https://via.placeholder.com/300x150",
  });

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="movie-cards">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
