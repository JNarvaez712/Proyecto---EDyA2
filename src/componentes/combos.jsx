import 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './combos.module.css';

const FoodCombos = ({ combos }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats } = location.state || {};

  const handleBackClick = () => {
    navigate('/reserve/:id', { state: { selectedSeats } });
  };

  const handleOrderClick = (combo) => {
    navigate('/purchase', { state: { selectedSeats, selectedCombo: combo } });
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className={styles["combo-list"]}>
      <div className={styles["back-button-container"]}>
        <button className={styles["back-button"]} onClick={handleBackClick}>Regresar</button>
      </div>
      {combos.map((combo) => (
        <div key={combo.id} className={styles["combo-item"]}>
          <img src={combo.image} alt={combo.name} className={styles["combo-image"]} />
          <div className={styles["combo-details"]}>
            <h3>{combo.name}</h3>
            <p>{combo.description}</p>
            <p className={styles["combo-price"]}>{formatPrice(combo.price)}</p>
            <button onClick={() => handleOrderClick(combo)} className={styles['order-button']}>Ordenar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCombos;