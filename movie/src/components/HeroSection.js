import React, { useState, useEffect } from "react";

function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const fetchHeroMovies = async () => {
      const apiKey = "3d4382dd61ea247199891426b2c7a4ba";

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
        );
        const data = await response.json();

        if (data && data.results) {
          setHeroMovies(data.results);
        }
      } catch (error) {
        console.error("Error fetching hero movies:", error);
      }
    };

    fetchHeroMovies();
  }, []);

  useEffect(() => {
    if (!showInfo) {
      const interval = setInterval(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % heroMovies.length);
      }, 5000); // 5초마다 슬라이드 전환

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
    }
  }, [heroMovies, showInfo]);

  const currentMovie =
    heroMovies.length > 0 ? heroMovies[currentMovieIndex] : null;

  const handleToggleClick = (index) => {
    setCurrentMovieIndex(index);
    setShowInfo(false); // 슬라이드 전환 시 정보 닫기
  };

  return (
    <div
      className={`hero-section ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: currentMovie
          ? `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`
          : "none",
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{currentMovie?.title || "Loading..."}</h1>
        <button
          className="hero-button"
          onClick={() =>
            window.open(
              `https://www.themoviedb.org/movie/${currentMovie?.id}`,
              "_blank"
            )
          }
        >
          Watch Now
        </button>
        <button
          className="hero-button secondary"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          More Info
        </button>

        {/* 영화 상세 정보 표시 */}
        {showInfo && currentMovie && (
          <div className="hero-info">
            <p><strong>개요:</strong> {currentMovie.overview || "정보 없음"}</p>
            <p><strong>개봉일:</strong> {currentMovie.release_date || "미정"}</p>
            <p><strong>평점:</strong> {currentMovie.vote_average || "N/A"}</p>
          </div>
        )}
      </div>

      {/* 슬라이드 토글 버튼 */}
      <div className="hero-toggle">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            className={`hero-toggle-button ${
              currentMovieIndex === index ? "active" : ""
            }`}
            onClick={() => handleToggleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
