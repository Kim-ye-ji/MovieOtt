import React from "react";

function MovieDetails({ movie, onClose }) {
  const imageBaseURL = "https://image.tmdb.org/t/p/w780";

  return (
    <div className="movie-details">
      <div className="movie-details__overlay" onClick={onClose} /> {/* 배경 클릭 시 닫기 */}
      <div className="movie-details__content">
        <button className="movie-details__close" onClick={onClose}>
          ✖
        </button>
        <img
          className="movie-details__image"
          src={`${imageBaseURL}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details__info">
          <h2>{movie.title}</h2>
          <p><strong>개요:</strong> {movie.overview || "정보 없음"}</p>
          <p><strong>개봉일:</strong> {movie.release_date || "미정"}</p>
          <p><strong>평점:</strong> {movie.vote_average || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
