import "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './purchase.module.css';

const Purchase = ({ selectedMovie, occupiedSeats, setOccupiedSeats }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, selectedCombo} = location.state || {};

    const handleBackClick = () => {
        navigate('/combos', { state: { selectedSeats } });
    };

    const handleConfirmClick = () => {
        const updatedOccupiedSeats = [...occupiedSeats, ...selectedSeats];
        setOccupiedSeats(updatedOccupiedSeats);
        navigate('/checkout', { state: { selectedSeats, selectedCombo, selectedMovie, occupiedSeats: updatedOccupiedSeats } });
    };

    return (
        <div className={styles["purchase-page-container"]}>
            <div className={styles["back-button-container"]}>
                <button className={styles["back-button"]} onClick={handleBackClick}>Regresar</button>
            </div>
            <div className={styles["purchase-page"]}>
                <h2>Confirmación de pago</h2>
                <div className={styles["purchase-details"]}>
                    <h3>Asientos seleccionados</h3>
                    <ul>
                        {selectedSeats && selectedSeats.map((seat, index) => (
                            <li key={index}>{seat}</li>
                        ))}
                    </ul>
                    <h3>Combo Seleccionado:</h3>
                    {selectedCombo && (
                        <div className={styles["combo-details"]}>
                            <img src={selectedCombo.image} alt={selectedCombo.name} className={styles["combo-image"]}/>
                            <div>
                                <h4>{selectedCombo.name}</h4>
                                <p>{selectedCombo.description}</p>
                                <p className={styles["combo-price"]}>{new Intl.NumberFormat('es-CO', {style: 'currency', currency:'COP'}).format(selectedCombo.price)}</p>
                            </div>
                        </div>   
                    )}
                </div>
                <button className={styles["confirm-button"]} onClick={handleConfirmClick}>Confirmar Compra</button>
            </div>
        </div>
    )
}

export default Purchase;