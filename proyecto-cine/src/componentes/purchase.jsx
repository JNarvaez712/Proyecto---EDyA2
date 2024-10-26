import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../purchase.css';

const Purchase = ({ selectedMovie }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, selectedCombo } = location.state || {};

    const handleBackClick = () => {
        navigate('/combos', {state: {selectedSeats}});
    }

    const handleConfirmClick = () => {
        navigate('/checkout', { state: { selectedSeats, selectedCombo, selectedMovie } });
    }

    return (
        <div className="purchase-page">
            <div className="back-button-container">
                <button className="back-button"  onClick={handleBackClick}>Regresar</button>
            </div>
            <h2>Confirmación de pago</h2>
            <div className="purchase-details">
                <h3>Asientos seleccionados</h3>
                <ul>
                    {selectedSeats && selectedSeats.map((seat, index) => (
                        <li key={index}>{seat}</li>
                    ))}
                </ul>
                <h3>Combo Seleccionado:</h3>
                {selectedCombo && (
                    <div className="combo-details">
                        <img src={selectedCombo.image} alt={selectedCombo.name} className="combo-image"/>
                        <div>
                            <h4>{selectedCombo.name}</h4>
                            <p>{selectedCombo.description}</p>
                            <p className="combo-price">{new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(selectedCombo.price)}</p>
                        </div>
                    </div>   
                )}
            </div>
            <button className="confirm-button" onClick={handleConfirmClick}>Comprar</button>
        </div>
    )
}

export default Purchase;