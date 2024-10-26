import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../seatReservation.css';

const SeatReservation = ({movie, setSelectedSeats, occupiedSeats, setOccupiedSeats}) => {
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
    <div className="seat-reservation">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackClick}>Regresar</button>
      </div>
      <h2>Reserva tus sillas</h2>
      <div className="screen">Pantalla</div>
      <div className="seats">
        {seatLetters.map((letter, rowIndex) => (
          <div key={letter} className="seat-row">
            <div className="seat-label">{letter}</div>
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
              const seatNumber = `${letter}${seatIndex + 1}`;
              const isOccupied = occupiedSeats.includes(seatNumber);
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <div
                  key={seatIndex}
                  className={`seat ${isOccupied ? 'occupied' : isSelected ? 'selected' : ''}`}
                  onClick={() => !isOccupied && toggleSeatSelection(seatNumber)}
                >
                  {seatIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="continue-button" onClick={handleContinueClick}>Continuar</button>
    </div>
  );
};

export default SeatReservation;
