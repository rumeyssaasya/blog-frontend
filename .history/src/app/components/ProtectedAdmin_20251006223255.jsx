'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      router.push('/admin/login')
    }
  }, [router])

  if (!mounted) return null

  if (!isLogin) return null

  return <>{children}</>
}
