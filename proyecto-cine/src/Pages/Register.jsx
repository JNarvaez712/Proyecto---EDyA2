import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Lógica de registro con Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado con éxito')
    } catch (error) {
      //Para personalizar los errores de firebase sin lo del auth en alert
      let errorMessage;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Correo electrónico en uso'
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico no es correcto'
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres'
          break;
        default:
          errorMessage = 'Error al registrarse. Intente de nuevo'
      }

      alert(errorMessage)
      console.error(error);
    }

  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;