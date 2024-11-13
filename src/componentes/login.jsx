import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig'

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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
