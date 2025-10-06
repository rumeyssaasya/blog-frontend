"use client"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import CreatePost from "./CreatePost"
import { motion } from "framer-motion"

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.08, rotate: 0 }}
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
            // Normal durumda hafif sağa yatık gölge
            boxShadow: "6px 6px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "8px 12px 18px rgba(0,0,0,0.5)" // hoverda koyu gölge
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "6px 6px 12px rgba(0,0,0,0.3)" // eski gölgeye dön
          }}
        >
          <FaPlus size={30} color="white" />
        </button>
      </motion.div>

      {/* Modal */}
      {open && <CreatePost onClose={() => setOpen(false)} />}
    </>
  )
}
