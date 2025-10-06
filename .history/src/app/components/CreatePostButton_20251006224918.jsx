"use client"

import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import CreatePost from "./CreatePost"
import { motion } from "framer-motion"

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    // Normal kullanıcı token'ı kontrolü
    const userToken = localStorage.getItem("userToken")
    setIsUserLoggedIn(!!userToken)
  }, [])

  // Kullanıcı login değilse buton gösterme
  if (!isUserLoggedIn) return null

  return (
    <>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "80px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "20px",
            backgroundColor: "#7008e7",
            border: "solid 2px white",
            cursor: "pointer",
            boxShadow: "6px 6px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "8px 12px 18px rgba(0,0,0,0.5)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow =
              "6px 6px 12px rgba(0,0,0,0.3)")
          }
        >
          <FaPlus size={30} color="white" />
        </button>
      </motion.div>

      {open && <CreatePost onClose={() => setOpen(false)} />}
    </>
  )
}
