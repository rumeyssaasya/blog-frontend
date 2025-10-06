'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from '../redux/slices/authSlice';

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // loginUser async thunk dispatch
    const result = await dispatch(loginUser({ email, password }));

    // Başarılı ise token localStorage'da var mı kontrol et
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/posts"); // login başarılı ise yönlendir
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Giriş Yap</button>
        {authState.status === 'loading' && <p>Yükleniyor...</p>}
        {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
      </form>
      <button onClick={switchToRegister}>Kayıt Ol</button>
    </div>
  );
}
