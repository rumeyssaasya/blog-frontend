'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/registerSlice";

export default function RegisterForm({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const registerState = useSelector(state => state.register);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Şifre" 
        />
        <button type="submit">Kayıt Ol</button>
      </form>
      {registerState.status === 'loading' && <p>Yükleniyor...</p>}
      {registerState.error && <p style={{color:'red'}}>{registerState.error}</p>}
      <button onClick={switchToLogin}>Giriş Yap</button>
    </div>
  );
}
