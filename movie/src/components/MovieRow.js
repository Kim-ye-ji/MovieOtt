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

      // 중복을 없애기 위해 Set을 사용하여 영화 아이디를 기준으로 유일한 영화만 남김
      const uniqueMovies = data.results.filter((value, index, self) => 
        index === self.findIndex((t) => t.id === value.id)
      );

      setMovies(uniqueMovies); // 중복을 제거한 영화만 상태에 저장
    };

    fetchMovies();
  }, [fetchURL]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__posters">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default MovieRow;
