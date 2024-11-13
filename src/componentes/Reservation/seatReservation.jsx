import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './seatReservation.module.css';

const SeatReservation = ({setSelectedSeats, occupiedSeats}) => {
  const [selectedSeats, setLocalSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const seatLetters = 'ABCDEFGHIJ'.split(''); // Letras de las filas
  const seatsPerRow = 10; // Número de asientos por fila

  const toggleSeatSelection = (seatNumber) => {
    setLocalSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleContinueClick = () => {
    setSelectedSeats(selectedSeats);
    navigate('/combos', { state: { selectedSeats } });
  };

  return (
    <div className={styles["seat-reservation"]}>
      <div className={styles["back-button-container"]}>
        <button className={styles["back-button"]} onClick={handleBackClick}>Regresar</button>
      </div>
      <h2 className={styles['reservation-title']}>Reserva tus sillas</h2>
      <div className={styles["screen"]}>Pantalla</div>
      <div className={styles["seat-container"]}>
        {seatLetters.map((letter) => (
          <div key={letter} className={styles["seat-row"]}>
            <div className={styles["seat-label"]}>{letter}</div>
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = `${letter}${seatIndex + 1}`;
              const isOccupied = occupiedSeats.includes(seatNumber);
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <div
                  key={seatIndex}
                  className={`${styles['seat']} ${isOccupied ? styles['occupied'] : isSelected ? styles['selected'] : ''}`}
                  onClick={() => !isOccupied && toggleSeatSelection(seatNumber)}
                >
                  {seatIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
        <button className={styles["continue-button"]} onClick={handleContinueClick}>Continuar</button>
      </div>
    </div>
  );
};

export default SeatReservation;
