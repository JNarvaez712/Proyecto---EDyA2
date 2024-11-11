import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseconfig';

import styles from "./pages.module.css"

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
    <div className={styles['title-page']}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister} className={styles['page-form']}>
        <div className={styles['page-group']}>
          <label htmlFor="email">Correo electrónico:</label>
          <input type="email" className={styles['campo']} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          
          <label htmlFor="password">Contraseña:</label>
          <input type="password" className={styles['campo']} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
          
          <label htmlFor="password">Confirmar contraseña:</label>
          <input type="password" className={styles['campo']} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar Contraseña" required />
        
        </div>

        <button type="submit" className={styles['confirm-button']}>Registrarse</button>

      </form>
    </div>
  );
};

export default Register;