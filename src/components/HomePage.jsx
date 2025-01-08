import React from 'react';
import SearchBar from './SearchBar';
import './style.css'
const HomePage = ({ fetchMovies }) => {
  return (
    <div >
      <header className="text-center py-6">
        <h1 className="text-6xl font-bold yatra-one-regular">Movie Finder</h1>
      </header>
      <SearchBar fetchMovies={fetchMovies} />
    </div>
  );
};

export default HomePage;

