'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Giriş Yap</button>
      </form>
      {authState.status === 'loading' && <p>Yükleniyor...</p>}
      {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
      <button onClick={switchToRegister}>Kayıt Ol</button>
    </div>
  );
}
