import React from "react";
import { useParams } from "react-router-dom";
import SeatReservation from "./seatReservation";

const Reserve = ({movies, setSelectedSeats, setSelectedMovie}) => {
    const { id } = useParams();
    const movie = movies.find(m => m.id === parseInt(id, 10));

    React.useEffect(()=>{
        setSelectedMovie(movie.title);
    }, [movie, setSelectedMovie]);

    return <SeatReservation movie={movie} setSelectedSeats={setSelectedSeats} />;
}

export default Reserve;