import React from "react";

function MovieCard({ movie }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w780";

  return (
    <div className="movie-card">
      <img
        className="movie-card__image"
        src={`${imageBaseURL}${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-card__overlay">
        <h3 className="movie-card__title">{movie.title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
