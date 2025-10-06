'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from '../redux/slices/authSlice';
import { motion } from "framer-motion";

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    if (localStorage.getItem("token")) {
      router.push("/posts"); // login başarılı ise yönlendir
    }
  };

  return (
    <motion.div key="login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>Giriş Yap</h2>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Giriş Yap</button>
        {authState.status === 'loading' && <p>Yükleniyor...</p>}
        {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
      </form>
      <button onClick={switchToRegister}>Kayıt Ol</button>
    </motion.div>
  );
}
