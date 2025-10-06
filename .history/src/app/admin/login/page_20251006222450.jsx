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

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken')
    if (storedToken) router.replace('/admin')
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(adminLogin({ email, password })).unwrap()
      localStorage.setItem('adminToken', result)
      console.log(result)
      localStorage.setItem('adminEmail', email)
      router.replace('/admin')
    } catch (e) {
      console.error('Admin login failed', e)
    }
  }

  return (
    <div 
      style={{ maxWidth: 480, margin: '80px auto', padding: '24px' }}
      className={`shadow-md rounded ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Giriş</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Şifre"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 w-full"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors"
        >
          Giriş
        </button>
        {status === 'loading' && <p className="text-center mt-2 text-gray-500">Giriş yapılıyor...</p>}
        {error && <p className="text-center mt-2 text-red-600">{typeof error === 'string' ? error : (error?.message || 'Hata')}</p>}
      </form>
    </div>
  )
}
