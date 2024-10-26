import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatReservation from "./seatReservation";

const Reserve = ({ movies, setSelectedSeats, setSelectedMovie, occupiedSeats, setOccupiedSeats }) => {
    const { id } = useParams();
    const movie = movies.find(m => m.id === parseInt(id, 10));

    useEffect(() => {
        if (movie) {
            setSelectedMovie(movie.title);
        }
    }, [movie, setSelectedMovie]);

    if (!movie) {
        return <div>Película no encontrada</div>;
    }

    return (
        <SeatReservation
            movie={movie}
            setSelectedSeats={setSelectedSeats}
            occupiedSeats={occupiedSeats}
            setOccupiedSeats={setOccupiedSeats}
        />
    );
};

export default Reserve;