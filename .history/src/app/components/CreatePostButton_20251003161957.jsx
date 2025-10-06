"use client"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import CreatePost from "./CreatePost"
import {motion} from 'framer-motion'

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <motion.div 
        whileHover={{
            scale: 1.02,
            boxShadow: "0 8px 20px rgba(0,0,0,0.8)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "60px",
          right: "80px",
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          backgroundColor: "#7008e7",
          border: "solid 2px white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000, // modalın üstünde kalması için
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
