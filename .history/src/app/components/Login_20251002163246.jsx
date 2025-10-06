'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    router.push('/posts');
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
      key="login" 
      initial={{ opacity: 0, x: 40 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -40 }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>Giriş Yap</h2>
      <form>
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={inputStyle} 
            autoComplete="username" 
        />
        <input 
            type="password" 
            placeholder="Şifre" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={inputStyle} 
            autoComplete="current-password" 
        />
        <button 
        type="button" 
        style={buttonStyle} 
        onClick={handleLogin}>Giriş Yap</button>

        {authState.status === 'loading' && <p>Yükleniyor...</p>}

        {authState.error && 
            <p style={{color:'red'}}>{authState.error}</p>}

        <button 
        type="button" 
        style={{ ...buttonStyle, backgroundColor: "#8e51ff" }} onClick={switchToRegister}>Kayıt Ol</button>
      </form>
    </motion.div>
  )
}
