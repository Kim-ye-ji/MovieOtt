import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // 선택된 영화
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부

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

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedMovie(null); // 선택 초기화
  };


  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__posters">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && selectedMovie && (
        <div className="movie-details__overlay" onClick={closeModal}>
          <div
            className="movie-details__content"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
          >
            <button className="movie-details__close" onClick={closeModal}>
              &times; {/* x 표시 */}
            </button>
            <img
              className="movie-details__image"
              src={`https://image.tmdb.org/t/p/w780${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <h3 className="movie-details__title">{selectedMovie.title}</h3>
            <p className="movie-details__description">
              {selectedMovie.overview || "정보 없음"}
            </p>
            <p><strong>개봉일:</strong> {selectedMovie.release_date || "N/A"}</p>
            <p><strong>평점:</strong> {selectedMovie.vote_average || "N/A"}</p>

            {/* Watch Now 버튼 추가 */}
            <a
              href={`https://www.themoviedb.org/movie/${selectedMovie.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-details__watch-btn"
            >
              Watch Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieRow;
