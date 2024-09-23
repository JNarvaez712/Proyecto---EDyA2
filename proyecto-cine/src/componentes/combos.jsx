import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../combos.css';

const FoodCombos = ({ combos }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/reserve/:id');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className="combo-list">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackClick}>Regresar</button>
      </div>
      {combos.map((combo) => (
        <div key={combo.id} className="combo-item">
          <img src={combo.image} alt={combo.name} className="combo-image" />
          <div className="combo-details">
            <h3>{combo.name}</h3>
            <p>{combo.description}</p>
            <p className="combo-price">{formatPrice(combo.price)}</p>
            <Link to={`/order/${combo.id}`} className="order-button">Ordenar</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCombos;