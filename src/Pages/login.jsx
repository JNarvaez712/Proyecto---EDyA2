import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig'

import styles from "./pages.module.css"

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Lógica de autenticación (Cuando vayamos a poner Firebase)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/');
    } catch (error){
      alert("Error en las credenciales");
      console.error(error);
    }

  };

  return (
    <div className={styles['title-page']}>
      <h2>Inicio de Sesión</h2>
      
      <form onSubmit={handleLogin} className={styles['page-form']}>

        <div className={styles["page-group"]}>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" className={styles["campo"]} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    
          <label htmlFor="password">Contraseña:</label>
          <input type="password" className={styles["campo"]} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        </div>

        <button type="submit" className={styles['confirm-button']}>Ingresar</button>

      </form>
    </div>
  );
};

export default Login;
