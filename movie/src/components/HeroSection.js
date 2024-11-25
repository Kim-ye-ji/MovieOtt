import React, { useState, useEffect } from "react";

function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      const movieId = 402431; // 예시 영화 ID
      const apiKey = "3d4382dd61ea247199891426b2c7a4ba"; // API 키

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${`402431`}/images?api_key=${`3d4382dd61ea247199891426b2c7a4ba`}`
        );
        const data = await response.json();

        if (data && data.backdrops && data.backdrops.length > 0) {
          // 첫 번째 배경 이미지를 사용
          setHeroImage(`https://image.tmdb.org/t/p/original${data.backdrops[0].file_path}`);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage(); // 컴포넌트 마운트 시 이미지 가져오기
  }, []);

  return (
    <div
      className={`hero-section ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: heroImage ? `url(${heroImage})` : "none",
      }}
    >
      <div className="hero-content">
        <button className="hero-button">Watch Now</button>
        <button className="hero-button secondary">More Info</button>
      </div>
    </div>
  );
}

export default HeroSection;
