import React from "react";
import HeroSection from "./components/HeroSection";
import MovieRow from "./components/MovieRow";
import "./styles.css";

function App() {
  const categories = [
    { id: 1, title: "Trending Now" },
    { id: 2, title: "Top Rated" },
    { id: 3, title: "Action Movies" },
    { id: 4, title: "Comedy Movies" },
  ];

  return (
    <div className="app">
      <HeroSection />
      {categories.map((category) => (
        <MovieRow key={category.id} title={category.title} />
      ))}
    </div>
  );
}

export default App;
