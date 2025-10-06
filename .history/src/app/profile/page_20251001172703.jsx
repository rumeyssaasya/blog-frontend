"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from '../redux/slices/authSlice';

export default function AuthPage() {
  const { theme } = useTheme();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

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
    <div style={containerStyle}>
      <motion.div
        style={cardStyle}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>
                Giriş Yap
              </h2>
              <input type="email" placeholder="Email" style={inputStyle} />
              <input type="password" placeholder="Şifre" style={inputStyle} />
              <button style={buttonStyle}>Giriş Yap</button>
              <button
                style={{ ...buttonStyle, backgroundColor: "#8e51ff" }}
                onClick={() => setIsLogin(false)}
              >
                Kayıt Ol
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#8e51ff" }}>
                Kayıt Ol
              </h2>
              <input type="text" placeholder="Ad Soyad" style={inputStyle} />
              <input type="email" placeholder="Email" style={inputStyle} />
              <input type="password" placeholder="Şifre" style={inputStyle} />
              <button style={buttonStyle}>Kayıt Ol</button>
              <button
                style={{ ...buttonStyle, backgroundColor: "#5d0ec0" }}
                onClick={() => setIsLogin(true)}
              >
                Giriş Yap
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
