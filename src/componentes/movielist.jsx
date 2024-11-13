import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-item">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <Link to={`/reserve/${movie.id}`} className="reserve-button">Reserva tus boletas</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;