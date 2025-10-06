'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { adminLogin } from '../redux/slices/adminSlice'

export default function ProtectedAdmin({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const token = useSelector(state => state.admin.token)

  useEffect(() => {
    if (!token) {
      if (pathname !== '/admin/login') router.replace('/admin/login')
    }
  }, [token, pathname, router])

  if (!token) return null

  return children
}


