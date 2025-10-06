'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/app/redux/slices/adminSlice'
import { useTheme } from 'next-themes'

export default function AdminLoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { token, status, error } = useSelector(state => state.admin)
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Eğer localStorage'da token varsa admin paneline yönlendir
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) {
      router.replace('/admin')
    }
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(adminLogin({ email, password })).unwrap()
      
      // LocalStorage kaydı
      localStorage.setItem('adminToken', result.token)
      localStorage.setItem('adminEmail', email)

      router.replace('/admin')
    } catch (e) {
      console.error('Admin login failed', e)
    }
  }

  const wrapStyle = { maxWidth: 480, margin: '80px auto', padding: '24px' }
  const cardClass = theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
  const inputClass = 'border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500'
  const buttonClass = 'rounded px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white transition-colors'

  return (
    <div style={wrapStyle} className={`shadow-md rounded ${cardClass}`}>
      <h1 className="text-2xl font-bold mb-4">Admin Giriş</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin Email" className={inputClass} />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Şifre" className={inputClass} />
        <button type="submit" className={buttonClass}>Giriş</button>
        {status==='loading' && <p>Giriş yapılıyor...</p>}
        {error && <p className="text-red-600">{typeof error==='string'? error : (error?.message||'Hata')}</p>}
      </form>
    </div>
  )
}
