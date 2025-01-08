import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5"; // Search icon
import { IoMdClose } from "react-icons/io"; // Close icon
import { BiCameraMovie } from "react-icons/bi"; 

const SearchBar = ({ fetchMovies }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies(query); // Perform search when query is valid
    }
  };

  const handleClear = () => {
    setQuery(''); // Clear the input when the close icon is clicked
  };

  // Debounce logic to avoid multiple API calls on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 500); // Debounce delay (adjust as needed)

    return () => clearTimeout(timer); // Clean up the timer when the component re-renders
  }, [query]);

  // Handle search on pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-[#243642] p-4">
      <div className="container mx-auto flex justify-center items-center">
        <div className="relative w-[700px]">
          <BiCameraMovie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
          
          <input
            type="text"
            placeholder="Search for more movies"
            className="p-2 pl-10 pr-12 w-full rounded-3xl text-black outline-none focus:ring-2 focus:ring-[#D3F1DF]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown} // Trigger search on "Enter" key
          />

          {/* Icons Container */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Clear Icon (only shown when there is input) */}
            {query && (
              <IoMdClose
                className="text-gray-400 text-2xl cursor-pointer"
                onClick={handleClear}
              />
            )}
            {/* Search Icon (always shown) */}
            <div
              onClick={handleSearch}
              className="w-14 text-[#243642] bg-[#D3F1DF] p-1 rounded-full cursor-pointer hover:bg-[#243642] hover:text-[#D3F1DF] transition-all duration-300 flex items-center justify-center">
              <IoSearch className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchBar;
