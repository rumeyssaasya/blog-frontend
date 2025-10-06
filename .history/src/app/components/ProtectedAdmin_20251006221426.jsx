'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // client yüklendi
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      router.push('/login')
    }
  }, [router])

  // SSR sırasında render engellenir
  if (!mounted) return null

  if (!isLogin) return null

  return <>{children}</>
}
