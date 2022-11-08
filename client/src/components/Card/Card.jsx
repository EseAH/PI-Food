import React from 'react';
import styles from './Card.module.css';

export default function Card({ image, title, diets, id }) {
  return (
    <div className={styles.Card}>
      <div className={styles.Image}>
          <img src={image} alt="recipe" height="210vw" />
      </div>
      <div className={styles.Title}>
          <h2 style={{textDecoration: 'none'}}>{title}</h2>
      </div>
      <div className={styles.diets}>
          {diets?.map(e=> {
            return (
                <p style={{textDecoration: 'none'}}>✅ {e.toUpperCase()}</p>
            )
          }
          )
          }
      </div>
    </div>
  )
};