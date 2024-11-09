import { useNavigate } from 'react-router-dom';

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
    <header>
      <h1>Cine Producción</h1>
      {isLoggedIn ? (
        <>
          <button onClick = {handleLogout}>Cerrar Sesión</button>
          <button onClick = {handleHome}>Página principal</button>
        </>  
      ):(
        <>
          <button onClick={handleLogin}>Iniciar Sesión</button>
          <button onClick={handleRegister}>Registrarse</button>
          <button onClick = {handleHome}>Página principal</button>
        </>
      )}
    </header>
  );
};

export default Header;