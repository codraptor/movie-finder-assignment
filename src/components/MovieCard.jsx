import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #222;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 10px;
`;

const Year = styled.p`
  font-size: 0.9rem;
  color: #b3b3b3;
`;

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Poster src={movie.Poster} alt={movie.Title} />
      <Details>
        <Title>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
      </Details>
    </Card>
  );
};

export default MovieCard;
