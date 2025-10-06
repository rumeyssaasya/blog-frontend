"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../redux/slices/authSlice';
import { registerUser } from '../redux/slices/registerSlice';


export default function AuthPage() {
  const { theme } = useTheme();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const users = useSelector((state) => state.users.items)
  const status = useSelector((state) => state.users.status)

  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  useEffect(() => {
      if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ username, email, password }));
  };


  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 0.3s ease",
    padding: "20px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "400px",
    backgroundColor: theme === "dark" ? "#18191a" : "#fff",
    color: theme === "dark" ? "#e0e0e0" : "#18191a",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: "10px",
    backgroundColor: "#7008e7",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  };

  return (
    <div>
      {localStorage.getItem("token") && users.map((user) => (
        <div key={user._id}>
          <p>{user.image}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.bio}</p>
        </div>
      ))}
      <div style={containerStyle}>
        <motion.div style={cardStyle}>
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="login" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>Giriş Yap</h2>
                <form>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    style={inputStyle}
                    autoComplete="username" />

                  <input 
                    type="password" 
                    placeholder="Şifre" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    style={inputStyle}
                    autoComplete="current-password" />

                  <button style={buttonStyle} onClick={handleLogin}>Giriş Yap</button>

                  {authState.status === 'loading' && <p>Yükleniyor...</p>}

                  {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
                  
                  <button style={{ ...buttonStyle, backgroundColor: "#8e51ff" }} onClick={() => setIsLogin(false)}>Kayıt Ol</button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="register" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}>
                <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#8e51ff" }}>Kayıt Ol</h2>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  style={inputStyle} />

                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  style={inputStyle} />

                <input 
                  type="password" 
                  placeholder="Şifre" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  style={inputStyle} />

                <button style={buttonStyle} onClick={handleRegister}>Kayıt Ol</button>

                {authState.status === 'loading' && <p>Yükleniyor...</p>}

                {authState.error && <p style={{color:'red'}}>{authState.error}</p>}

                <button style={{ ...buttonStyle, backgroundColor: "#5d0ec0" }} onClick={() => setIsLogin(true)}>Giriş Yap</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div> 
    </div>      
  );
}
