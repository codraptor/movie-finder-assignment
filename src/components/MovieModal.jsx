import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #141414;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 5px 0;
  }

  button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkred;
  }
`;

const Loading = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: center;
`;

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true); // Start loading
      try {
        const apiKey = process.env.REACT_APP_OMDB_API_KEY;
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <ModalOverlay>
        <Loading>Loading...</Loading>
      </ModalOverlay>
    );
  }

  if (!movieDetails) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{movieDetails.Title}</h2>
        <p><strong>Year:</strong> {movieDetails.Year}</p>
        <p><strong>Genre:</strong> {movieDetails.Genre}</p>
        <p><strong>Director:</strong> {movieDetails.Director}</p>
        <p><strong>Plot:</strong> {movieDetails.Plot}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal;
