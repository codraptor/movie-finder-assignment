import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

const AppContainer = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 20px;
`;

const MovieGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (query) => {
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );
    const data = await response.json();
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <AppContainer>
      <Title>Movie Finder</Title>
      <SearchBar onSearch={fetchMovies} />
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => setSelectedMovie(movie.imdbID)}
          />
        ))}
      </MovieGrid>
      {selectedMovie && (
        <MovieModal movieId={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </AppContainer>
  );
};

export default App;
