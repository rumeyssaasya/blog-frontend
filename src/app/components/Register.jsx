'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/registerSlice'
import { motion } from 'framer-motion'

export default function RegisterForm({ switchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(registerUser({ username, email, password }))
  }

  const inputStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  }

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
  }

  return (
    <motion.div 
      key="register" 
      initial={{ opacity: 0, x: -40 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 40 }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#8e51ff" }}>Kayıt Ol</h2>
      <form>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Şifre" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        <button type="button" style={buttonStyle} onClick={handleRegister}>Kayıt Ol</button>
        {authState.status === 'loading' && <p>Yükleniyor...</p>}
        {authState.error && <p style={{color:'red'}}>{authState.error}</p>}
        <button type="button" style={{ ...buttonStyle, backgroundColor: "#5d0ec0" }} onClick={switchToLogin}>Giriş Yap</button>
      </form>
    </motion.div>
  )
}
