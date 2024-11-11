import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from '../componentes/header';
import MovieList from './Index/movielist';
import Footer from '../componentes/footer';
import FoodCombos from '../componentes/combos';
import Purchase from '../componentes/purchase';
import Reserve from '../componentes/Reservation/reserve';
import Checkout from '../componentes/checkout';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig'

import Login from "./login"
import Register from "./Register"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
      }
    });

    return () => unsbscribe();

  }, []);


  const [movies, setMovies] = useState([]);
  const [combos, setCombos] = useState([]);
  const [, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState(() => {

    const savedOccupiedSeats = localStorage.getItem('occupiedSeats');
    return (savedOccupiedSeats) ? JSON.parse(savedOccupiedSeats) : [];
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d6a0f3f234c9f4d0731869466402b08c&language=es-ES`);
        const data = await response.json();
        const fetchedMovies = data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`
        }));
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchCombos = () => {
      const manualCombos = [
        {
          id: 1,
          name: "Combo 1",
          description: "Palomitas grandes y refresco grande",
          price: 23900,
          image: "https://s3.amazonaws.com/puntospoint-media/events/images/000/016/037/original/combo1.jpg"
        },
        {
          id: 2,
          name: "Combo 2",
          description: "Palomitas medianas, 2 gaseosas medianas, 1 perro caliente y 1 mini sandwich",
          price: 28900,
          image: "https://archivos-cms.cinecolombia.com/images/6/6/4/7/7466-9-esl-CO/6ce5ad738478-2532cine-colombia.jpg"
        },
        {
          id: 3,
          name: "Combo 3",
          description: "2 Palomitas medianas, 4 gaseosas personales, 4 perros calientes, 2 chocolatinas y 2 bolsas nachos",
          price: 42900,
          image: "https://cdn.inoutdelivery.com/cinecolombia.inoutdelivery.com/sm/1709247865188-6.Mega-Combo.png"
        }
      ];
      setCombos(manualCombos);
    };

    fetchMovies();
    fetchCombos();
  }, []);

  useEffect(() => {
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeats));
  } , [occupiedSeats]);

  return (
    <Router basename='/'>
      <Header setIsLoggedIn = {setIsLoggedIn} isLoggedIn = {isLoggedIn} />
      <Routes>
        <Route exact path="/" element={<MovieList movies={movies} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/reserve/:id" element={isLoggedIn ? <Reserve movies={movies} setSelectedSeats={setSelectedSeats} setSelectedMovie={setSelectedMovie} occupiedSeats={occupiedSeats} setOccupiedSeats={setOccupiedSeats}/> : <Navigate to = "login" />} />
        <Route path="/combos" element={<FoodCombos combos={combos} />} />
        <Route path="/purchase" element={<Purchase selectedMovie={selectedMovie} occupiedSeats={occupiedSeats} setOccupiedSeats={setOccupiedSeats}/>} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;