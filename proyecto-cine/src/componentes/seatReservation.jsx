import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../seatReservation.css';

const SeatReservation = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const seatLetters = 'ABCDEFGHIJ'.split(''); // Letras de las filas
  const seatsPerRow = 10; // Número de asientos por fila

  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleContinueClick = () => {
    navigate('/combos');
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
            {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${selectedSeats.includes(`${letter}${seatIndex + 1}`) ? 'selected' : ''}`}
                onClick={() => toggleSeatSelection(`${letter}${seatIndex + 1}`)}
              >
                {seatIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="continue-button" onClick={handleContinueClick}>Continuar</button>
    </div>
  );
};

export default SeatReservation;
