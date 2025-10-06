'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      router.push('/admin/login')
    }
  }, [router])

  if (!isLogin) {
    return null 
  }

  return <>{children}</>
}
