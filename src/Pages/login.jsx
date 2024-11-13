import { useState } from 'react';
import useAuth from '../Hooks/useAuth.js'
import styles from "./pages.module.css"

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, setIsLoggedIn);

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

        {error && <p className={styles['error-message']}>{error}</p>}

        <button type="submit" className={styles['confirm-button']}>Ingresar</button>

      </form>
    </div>
  );
};

export default Login;
