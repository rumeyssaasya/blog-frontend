'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'

export default function ProtectedAdmin({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  return children
}


