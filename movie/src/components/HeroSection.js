import React, { useState, useEffect } from "react";

function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const movieIds = [402431, 603692, 640146, 550]; // 여러 영화 ID
  const apiKey = "3d4382dd61ea247199891426b2c7a4ba";

  useEffect(() => {
    const fetchHeroImages = async () => {
      const allImages = [];

      for (const movieId of movieIds) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`
          );
          const data = await response.json();
          if (data && data.backdrops) {
            allImages.push({
              movieId,
              backdrops: data.backdrops,
            });
          }
        } catch (error) {
          console.error(`Error fetching images for movie ${movieId}:`, error);
        }
      }

      // 각 영화의 첫 번째 이미지를 heroImages로 설정
      const firstImages = allImages
        .map((movie) => ({
          movieId: movie.movieId,
          file_path: movie.backdrops[0]?.file_path,
        }))
        .filter((img) => img.file_path);

      setHeroImages(firstImages);
    };

    fetchHeroImages();
  }, []);

  // 자동 슬라이드 설정
  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 5000); // 5초마다 슬라이드

      return () => clearInterval(interval);
    }
  }, [heroImages]);

  // 토글 버튼 클릭 시 동작
  const handleToggleClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={`hero-section ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: heroImages.length
          ? `url(https://image.tmdb.org/t/p/original${heroImages[currentImageIndex]?.file_path})`
          : "none",
      }}
    >
      <div className="hero-content">
        <button className="hero-button">Watch Now</button>
        <button className="hero-button secondary">More Info</button>
      </div>

      {/* 슬라이드 컨트롤 (하단 토글 버튼) */}
      <div className="hero-toggle">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`hero-toggle-button ${
              index === currentImageIndex ? "active" : ""
            }`}
            onClick={() => handleToggleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
