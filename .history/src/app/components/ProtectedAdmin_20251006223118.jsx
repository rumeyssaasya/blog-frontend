'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('adminToken')
    if (token) {
      return ;
    } else {
      router.push('/login')
    }
  }, [router])

  if (!mounted) return null


  return <>{children}</>
}
