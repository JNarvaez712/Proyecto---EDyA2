import { useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Header from '../componentes/header';
import Footer from '../componentes/footer';
import AppRoutes from '../Routes/AppRoutes';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [combos, setCombos] = useState([]);
  const [, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState(() => {
    const savedOccupiedSeats = localStorage.getItem('occupiedSeats');
    return savedOccupiedSeats ? JSON.parse(savedOccupiedSeats) : [];
  });



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (!user) localStorage.removeItem('isLoggedIn');
    });
    return () => unsubscribe();
  }, []);


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
      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        movies={movies}
        setSelectedSeats={setSelectedSeats}
        setSelectedMovie={setSelectedMovie}
        occupiedSeats={occupiedSeats}
        setOccupiedSeats={setOccupiedSeats}
        selectedMovie={selectedMovie}
        combos={combos}
      />
      <Footer />
    </Router>
  );
};

export default App;