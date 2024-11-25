import React from "react";
import HeroSection from "./components/HeroSection";
import MovieRow from "./components/MovieRow";
import "./App.css";

function App() {
  const categories = [
    { id: 1, title: "Trending Now", fetchURL: "/trending/all/week" },
    { id: 2, title: "Top Rated", fetchURL: "/movie/top_rated" },
    { id: 3, title: "Upcoming Movies", fetchURL: "/movie/upcoming" },
    { id: 4, title: "Popular Movies", fetchURL: "/movie/now_playing" },
  ];

  return (
    <div className="app">
      <HeroSection />
      {categories.map((category) => (
        <MovieRow key={category.id} title={category.title} fetchURL={category.fetchURL} />
      ))}
    </div>
  );
}

export default App;
