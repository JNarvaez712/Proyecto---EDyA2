import { useNavigate } from 'react-router-dom';
import styles from "./header.module.css"

const Header = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
    alert('Sesión cerrada');
  };

  const handleLogin = () => {
    navigate("/login")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  const handleHome = () => {
    navigate("/")
  }

  return (
    <header className={styles['header']}>
      <h1 className={styles['h1']}>Cine Producción</h1>
      {isLoggedIn ? (
        <>
          <button className={styles.button} onClick = {handleHome}>Página principal</button>
          <button className={styles.button} onClick = {handleLogout}>Cerrar Sesión</button>
        </>  
      ):(
        <>
          <button className={styles.button} onClick={handleLogin}>Iniciar Sesión</button>
          <button className={styles.button} onClick={handleRegister}>Registrarse</button>
          <button className={styles.button} onClick = {handleHome}>Página principal</button>
        </>
      )}
    </header>
  );
};

export default Header;