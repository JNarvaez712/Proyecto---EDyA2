import { Routes, Route, Navigate } from "react-router-dom";

import MovieList from "../Pages/Index/movielist";
import Login from "../Pages/login";
import Register from "../Pages/Register";
import FoodCombos from "../componentes/combos";
import Purchase from "../componentes/purchase";
import Reserve from "../componentes/Reservation/reserve";
import Checkout from "../componentes/checkout";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn, movies, setSelectedSeats, setSelectedMovie, occupiedSeats, setOccupiedSeats, selectedMovie, combos }) => {
    return(
        <Routes>
            <Route exact path="/" element={<MovieList movies={movies} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/reserve/:id" element={isLoggedIn ? <Reserve movies={movies} setSelectedSeats={setSelectedSeats} setSelectedMovie={setSelectedMovie} occupiedSeats={occupiedSeats} setOccupiedSeats={setOccupiedSeats}/> : <Navigate to = "login" />} />
            <Route path="/combos" element={<FoodCombos combos={combos} />} />
            <Route path="/purchase" element={<Purchase selectedMovie={selectedMovie} occupiedSeats={occupiedSeats} setOccupiedSeats={setOccupiedSeats}/>} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
};

export default AppRoutes;