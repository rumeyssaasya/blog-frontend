'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

    if (!token) {
      router.replace('/admin/login')
    } else {
      setIsChecking(false)
    }
  }, [router])

  // Kontrol bitmeden hiçbir şey render etme
  if (isChecking) return null

  return <>{children}</>
}
