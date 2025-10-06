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
  const [isOpen, setIsOpen] = useState(true) // Modal açık/kapalı kontrol

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost({ title, content, image }))
    setTitle("")
    setContent("")
    setImage(null)
    setIsOpen(false) // Gönderildikten sonra da kapatabilirsin
  }
  

  return (
    <ProtectedPage>
      {/* Arka plan + blur overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        ></div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          {/* Çarpı butonu */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#6b7280",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Başlık */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: 600, color: "#4b5563" }}>
                Başlık
              </label>
              <input
                type="text"
                placeholder="Gönderi başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                }}
                required
              />
            </div>

            {/* İçerik */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: 600, color: "#4b5563" }}>
                İçerik
              </label>
              <textarea
                placeholder="Gönderi içeriği"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "16px",
                  height: "140px",
                  resize: "none",
                }}
                required
              />
            </div>

            {/* Resim */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", fontWeight: 600, color: "#4b5563" }}>
                Opsiyonel Resim
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                }}
              />
            </div>

            {/* Gönder Butonu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#7c3aed",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {status === "loading" ? "Paylaşılıyor..." : "Paylaş"}
            </motion.button>
          </form>
        </motion.div>
    </ProtectedPage>
  )
}
