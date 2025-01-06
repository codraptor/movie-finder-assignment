import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  color: black;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 10000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;

const MovieInfo = styled.div`
  margin-top: 20px;
`;

const MovieInfoItem = styled.p`
  font-size: 1rem;
  margin: 5px 0;

  strong {
    font-weight: bold;
  }
`;

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{movie.Title}</h2>
        <MovieInfo>
          <MovieInfoItem>
            <strong>Genre:</strong> {movie.Genre}
          </MovieInfoItem>
          <MovieInfoItem>
            <strong>Director:</strong> {movie.Director}
          </MovieInfoItem>
          <MovieInfoItem>
            <strong>Plot:</strong> {movie.Plot}
          </MovieInfoItem>
          <MovieInfoItem>
            <strong>Year:</strong> {movie.Year}
          </MovieInfoItem>
        </MovieInfo>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal;
