"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/slices/postsSlice"
import { motion } from "framer-motion"

export default function CreatePost({ onClose }) {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.posts)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags,setTags] =useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ title, content, tags ,image }))
    setTitle("")
    setContent("")
    setTags("")
    setImage(null)
    onClose() 
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(6px)",
          zIndex: 9
        }}
      />

      {/* Modal Card */}
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
            position: "fixed",  
            top: "10%",             
            left: "30%",            
            transform: "translate(-50%, -50%)",
            zIndex: 2000, 
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
        }}
        >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#6b7280",
            fontWeight: "bold"
          }}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", color:"black" }}
          />
          <textarea
            placeholder="İçerik"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", height: "140px", resize: "none", color:"black" }}
            required
          />

          <textarea
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", height: "60px", resize: "none", color:"black" }}
            required
          />
          <input
            type="file"
            placeholder="Dosya Seçiniz:"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db" , color:"black" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{ padding: "12px", borderRadius: "10px", border: "none", backgroundColor: "#7c3aed", color: "white", fontWeight: "600", fontSize: "16px", cursor: "pointer" }}
          >
            {status === "loading" ? "Paylaşılıyor..." : "Paylaş"}
          </motion.button>
        </form>
      </motion.div>
    </>
  )
}
