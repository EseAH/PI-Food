import React from 'react';
import styles from './Card.module.css';

export default function Card({ image, title, diets, id }) {
  return (
    <div className={styles.Card}>
      <div>
          <img src={image} alt="recipe" width="200px" height="200px" />
      </div>
      <div className={styles.Title}>
          <h2>{title}</h2>
      </div>
      <div>
          <h4>{diets}</h4>
      </div>
      <div>
          <h4>{id}</h4>
      </div>
    </div>
  )
};