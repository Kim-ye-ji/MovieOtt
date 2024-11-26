// 3d4382dd61ea247199891426b2c7a4ba
import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3${fetchURL}?api_key=3d4382dd61ea247199891426b2c7a4ba&language=ko-KR`
      );
      const data = await response.json();

      const uniqueMovies = data.results.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );

      setMovies(uniqueMovies);
    };

    fetchMovies();
  }, [fetchURL]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__posters">
        {movies && movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default MovieRow;
