"use client"

import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import CreatePost from "./CreatePost"
import { motion } from "framer-motion"
import { useEffect } from "react"
import ProtectedPage from "../components/ProtectedPage"

export default function CreatePostButton() {
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
  }, []);

  return (
    <>
      {!isAdmin && ( 
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
              boxShadow: "6px 6px 12px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "8px 12px 18px rgba(0,0,0,0.5)" 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "6px 6px 12px rgba(0,0,0,0.3)" 
            }}
          >
            <FaPlus size={30} color="white" />
          </button>
        </motion.div>
      )}

      {open && <CreatePost onClose={() => setOpen(false)} />}
    </>
  )
}