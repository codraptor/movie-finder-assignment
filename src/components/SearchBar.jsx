import React, { useState } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: #e50914;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #b81d24;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
