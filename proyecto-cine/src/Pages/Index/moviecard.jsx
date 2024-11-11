import React from 'react';
import styles from '../Index/index.module.css'

const MovieCard = ({ movie }) => {
  return (
    <div className={styles["movie-card"]}>
      <img src={movie.poster} alt={movie.title} className={styles['movie-card img']} />
      <h2 className={styles['movie-card h2']}>{movie.title}</h2>
      <p className={styles['movie-card p']}>{movie.description}</p>
    </div>
  );
};

export default MovieCard;