"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedPage({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/profile")
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!authorized) 
    return null
  return <>{children}</>
}
