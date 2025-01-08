import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import arrow icons
import HomePage from './components/HomePage';
import MovieGrid from './components/MovieGrid';
import SortFilter from './components/SortFilter'; // Import SortFilter component

const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1); // Track the current page
  const [query, setQuery] = useState(''); // Store the current search query
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterDecade, setFilterDecade] = useState('');
  const [noResults, setNoResults] = useState(false); // Track if no results are found

  const popularQueries = ['action', 'comedy', 'drama', 'horror', 'romance', 'thriller', 'adventure', 'animation'];

  const fetchMovies = async (query, page = 1) => {
    setStatus('loading');
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=ab7585e4`);
      const data = response.data;

      if (data.Response === 'True') {
        setMovies((prevMovies) => (page === 1 ? data.Search : [...prevMovies, ...data.Search])); // Reset or append movies
        setNoResults(false); // Reset no results state
        setStatus('succeeded');
      } else {
        setMovies([]);
        setNoResults(true); // Set no results state to true
        setStatus('no-results');
      }
    } catch (error) {
      setMovies([]);
      setNoResults(true);
      setStatus('failed');
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    setMovies([]); // Reset movie list on new search
    setPage(1); // Reset page count
    setQuery(query); // Store the search query
    fetchMovies(query, 1);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleFilterChange = (decade) => {
    setFilterDecade(decade);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOrder === 'asc') {
      return parseInt(a.Year) - parseInt(b.Year);
    } else {
      return parseInt(b.Year) - parseInt(a.Year);
    }
  });

  const filteredMovies = sortedMovies.filter((movie) => {
    if (filterDecade === '') return true;
    const year = parseInt(movie.Year);
    const startYear = parseInt(filterDecade.split('s')[0]);
    const endYear = startYear + 9;
    return year >= startYear && year <= endYear;
  });

  const loadMoreMovies = useCallback(() => {
    if (status === 'loading') return; // Prevent duplicate requests during loading
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchMovies(query || popularQueries[Math.floor(Math.random() * popularQueries.length)], newPage);
      return newPage;
    });
  }, [query, status]);

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    if (bottom && !noResults) {
      loadMoreMovies();
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(query, nextPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchMovies(query, prevPage);
    }
  };

  useEffect(() => {
    if (movies.length === 0 && query === '') {
      const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
      fetchMovies(randomQuery, 1);
    }
  }, [movies, query]);

  return (
    <div className="min-h-screen bg-[#243642] text-[#D3F1DF]" onScroll={handleScroll}>
      <HomePage fetchMovies={handleSearch} />
      <SortFilter onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-6">
        {noResults ? (
          <p className="text-center text-red-500 text-lg">No results found. Please try another search.</p>
        ) : (
          <MovieGrid movies={filteredMovies} status={status} />
        )}
      </div>

      {/* Pagination Buttons with Icons */}
      {!noResults && (
        <div className="flex justify-center gap-4 py-4">
          <button
            onClick={handlePreviousPage}
            className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded disabled:opacity-50"
            disabled={page === 1}
          >
            <FaArrowLeft /> {/* Left Arrow Icon */}
          </button>
          <button
            onClick={handleNextPage}
            className="bg-[#D3F1DF] text-[#243642] px-4 py-2 rounded"
          >
            <FaArrowRight /> {/* Right Arrow Icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
