"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/slices/postsSlice"
import { motion } from "framer-motion"
import ProtectedPage from "../components/ProtectedPage"

export default function CreatePostPage() {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.posts)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ title, content, image }))
    setTitle("")
    setContent("")
    setImage(null)
  }

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "24px",
    backgroundColor: "#f9fafb"
  }

  const formStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  }

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "16px"
  }

  const textareaStyle = {
    ...inputStyle,
    height: "160px",
    resize: "none"
  }

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#4b5563"
  }

  const buttonStyle = {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  }

  return (
    <ProtectedPage>
        <div style={containerStyle}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#7c3aed", marginBottom: "32px" }}>
            Yeni Gönderi Oluştur
        </h1>

        <form onSubmit={handleSubmit} style={formStyle}>
            {/* Başlık */}
            <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Başlık</label>
            <input
                type="text"
                placeholder="Gönderi başlığı"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={inputStyle}
                required
            />
            </div>

            {/* İçerik */}
            <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>İçerik</label>
            <textarea
                placeholder="Gönderi içeriği"
                value={content}
                onChange={e => setContent(e.target.value)}
                style={textareaStyle}
                required
            />
            </div>

            {/* Resim */}
            <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Opsiyonel Resim</label>
            <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
                style={inputStyle}
            />
            </div>

            {/* Gönder Butonu */}
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={buttonStyle}
            >
            {status === "loading" ? "Paylaşılıyor..." : "Paylaş"}
            </motion.button>
        </form>
        </div>
    </ProtectedPage>
  )
}
