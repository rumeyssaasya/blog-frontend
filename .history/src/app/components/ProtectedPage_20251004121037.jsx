"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedPage({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp
      const now = Math.floor(Date.now() / 1000)

      if (exp < now) {
        // Token süresi dolmuş
        localStorage.removeItem("token")
        router.push("/login")
      } else {
        setAuthorized(true)
      }
    } catch (err) {
      // Token geçersizse
      localStorage.removeItem("token")
      router.push("/login")
    }
  }, [router])

  if (!authorized) return null
  return <>{children}</>
}
