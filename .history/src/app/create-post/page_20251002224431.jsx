"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/slices/postsSlice"
import { motion } from "framer-motion"

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-violet-700 mb-8">Yeni Gönderi Oluştur</h1>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Başlık */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Başlık</label>
          <input
            type="text"
            placeholder="Gönderi başlığı"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-700 transition"
            required
          />
        </div>

        {/* İçerik */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">İçerik</label>
          <textarea
            placeholder="Gönderi içeriği"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-violet-700 transition resize-none"
            required
          />
        </div>

        {/* Resim */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Opsiyonel Resim</label>
          <input 
            type="file" 
            onChange={e => setImage(e.target.files[0])} 
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Gönder Butonu */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-violet-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-violet-800 transition-colors"
        >
          {status === "loading" ? "Paylaşılıyor..." : "Paylaş"}
        </motion.button>
      </form>
    </div>
  )
}
