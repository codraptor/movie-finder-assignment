import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const AppContainer = styled.div`
  position: relative;
  text-align: center;
  color: white;
  min-height: 100vh;
  font-family: "Netflix Sans", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("./path-to-your-background-image.jpg");
    background-size: cover;
    background-position: center;
    filter: brightness(0.4) blur(6px);
    z-index: -1;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;


const Header = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem;
  color: #ffffff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  select {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 2px solid #e50914;
    border-radius: 4px;
    background-color: #141414;
    color: white;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #f40612;
    }
  }

  button {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    border: 2px solid #e50914;
    background-color: transparent;
    color: #e50914;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #e50914;
      color: #ffffff;
    }
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 1rem;

  & > div {
    transition: transform 0.3s ease;
  }

  & > div:hover {
    transform: scale(1.05);
  }
`;

const ErrorText = styled.p`
  color: #ff4444;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const LoadMoreButton = styled.button`
  margin: 2rem 0;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e50914;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterDecade, setFilterDecade] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);  // State for selected movie
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        await fetchMovies(query, page, filterDecade);
      };
      fetchData();
    }
  }, [query, page, filterDecade]);

  const fetchMovies = async (query, page, decade) => {
    setLoading(true); // Start loading spinner
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        let newMovies = data.Search;

        // Fetch full movie details (including Plot, Genre, Director)
        newMovies = await Promise.all(
          newMovies.map(async (movie) => {
            const detailsResponse = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
            );
            const detailsData = await detailsResponse.json();
            return { ...movie, ...detailsData }; // Merging the details into the movie object
          })
        );

        // Apply decade filter if there's one selected
        if (decade) {
          newMovies = newMovies.filter((movie) => {
            const year = parseInt(movie.Year, 10);
            return year >= decade && year < decade + 10;
          });
        }

        // Apply sorting if there's a selected order
        if (sortOrder) {
          newMovies = newMovies.sort((a, b) => {
            const yearA = parseInt(a.Year, 10);
            const yearB = parseInt(b.Year, 10);
            return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
          });
        }

        setMovies((prevMovies) => [...prevMovies, ...newMovies.slice(0, 5)]); // Add new movies
      } else {
        setError(data.Error || "Unexpected error occurred");
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedMovies = [...movies].sort((a, b) => {
      const yearA = parseInt(a.Year, 10);
      const yearB = parseInt(b.Year, 10);
      return order === "asc" ? yearA - yearB : yearB - yearA;
    });
    setMovies(sortedMovies);
  };

  const handleFilter = (decade) => {
    setFilterDecade(decade);
    setMovies([]); // Clear current movies
    setPage(1); // Reset page to 1 for new filter
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch next batch of movies
  };

  const resetFilters = () => {
    setQuery("");
    setMovies([]);
    setSortOrder("");
    setFilterDecade("");
    setPage(1);
    setError("");
  };

  const openModal = (movie) => {
    setSelectedMovie(movie); // Set the selected movie to open the modal
  };

  const closeModal = () => {
    setSelectedMovie(null); // Close the modal by clearing the selected movie
  };

  return (
    <AppContainer>
      <Header>Unlimited movies,</Header>
      <Header> TV shows and more</Header>
      <SearchBar onSearch={setQuery} />
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Controls>
        <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Sort by Year</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          value={filterDecade}
          onChange={(e) => handleFilter(parseInt(e.target.value, 10))}
        >
          <option value="">Filter by Decade</option>
          <option value="1980">1980s</option>
          <option value="1990">1990s</option>
          <option value="2000">2000s</option>
          <option value="2010">2010s</option>
          <option value="2020">2020s</option>
        </select>
        <button onClick={resetFilters}>Reset Filters</button>
      </Controls>
      {error && <ErrorText>{error}</ErrorText>}
      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => openModal(movie)} // Open the modal on card click
          />
        ))}
      </MovieGrid>
      {loading ? (
        <Spinner /> // Show spinner when loading
      ) : (
        movies.length > 0 && (
          <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
        )
      )}
    
    </AppContainer>
  );
};

export default App;