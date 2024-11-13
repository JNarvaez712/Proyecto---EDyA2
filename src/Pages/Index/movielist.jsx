import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Index/index.module.css'

const MovieList = ({ movies }) => {
  return (
    <div className={styles["movie-list"]}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles["movie-item"]}>
          <img src={movie.poster} alt={movie.title} className={styles["movie-poster"]} />
          <div className={styles["movie-details"]}>
          <h3 className={styles["movie-title"]}>{movie.title}</h3>
          <p className={styles["movie-description"]}>{movie.description}</p>
            <Link to={`/reserve/${movie.id}`} className={styles["reserve-button"]}>Reserva tus boletas</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;