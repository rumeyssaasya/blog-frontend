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
      <motion.div>
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
