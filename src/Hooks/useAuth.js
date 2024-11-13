import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig';

const useAuth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password, setIsLoggedIn) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setError("Error en las credenciales");
      console.error("Error de autenticación:", error);
    }
  };

  return { login, error };
};

export default useAuth;