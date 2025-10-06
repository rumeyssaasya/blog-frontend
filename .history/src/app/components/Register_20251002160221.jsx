'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../redux/slices/registerSlice';

export default function RegisterForm({ switchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={handleRegister}>Kayıt Ol</button>
        {authState.status === 'loading' && <p>Yükleniyor...</p>}
        {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
      </form>
      <button onClick={switchToLogin}>Giriş Yap</button>
    </div>
  );
}
