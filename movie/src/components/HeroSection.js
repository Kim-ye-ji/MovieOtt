import React from "react";

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Movie of the Day</h1>
        <p className="hero-description">
          A thrilling adventure awaits. Watch now and experience the journey.
        </p>
        <button className="hero-button">Watch Now</button>
        <button className="hero-button secondary">More Info</button>
      </div>
    </div>
  );
}

export default HeroSection;
