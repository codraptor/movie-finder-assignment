import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const Modal = ({ isOpen, onClose, movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=ab7585e4`);
      const data = response.data;
      return data.Response === 'True' ? data : null;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (isOpen && movie) {
        setLoading(true);
        const details = await fetchMovieDetails(movie.imdbID);
        setMovieDetails(details);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [isOpen, movie]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#151515]  flex justify-center items-center z-50">
      <div className="bg-[#243642]/80 text-[#D3F1DF] rounded-lg w-4/5 md:w-1/2 lg:w-1/3 p-6 relative">
        <button
          className="absolute top-4 right-4 text-[#D3F1DF] text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {loading ? (
          <p>Loading details...</p>
        ) : movieDetails ? (
          <div>
            <h2 className="text-2xl oldenburg-regular mb-4">{movieDetails.Title}</h2>
            <img
              src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/300'}
              alt={movieDetails.Title}
              className="h-64 justify-center align-middle items-center object-cover mb-4 rounded"
            />
            <p className='tinos-regular'><strong className=' tinos-bold'>Genre:</strong> {movieDetails.Genre || 'N/A'}</p>
            <p className='tinos-regular'><strong className=' tinos-bold'>Director:</strong> {movieDetails.Director || 'N/A'}</p>
            <p className='tinos-regular'><strong className=' tinos-bold'>Plot:</strong> {movieDetails.Plot || 'N/A'}</p>
          </div>
        ) : (
          <p>Unable to fetch movie details.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
