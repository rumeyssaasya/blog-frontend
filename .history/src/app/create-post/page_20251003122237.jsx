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

  return (
    <ProtectedPage>
      {/* Arka plan + blur overlay */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-violet-700 mb-6">
            Yeni Gönderi Oluştur
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Başlık */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-600">Başlık</label>
              <input
                type="text"
                placeholder="Gönderi başlığı"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            {/* İçerik */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-600">İçerik</label>
              <textarea
                placeholder="Gönderi içeriği"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            {/* Resim */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-600">Opsiyonel Resim</label>
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Gönder Butonu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="p-3 rounded-lg bg-violet-600 text-white font-semibold shadow-md hover:bg-violet-700 transition"
            >
              {status === "loading" ? "Paylaşılıyor..." : "Paylaş"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </ProtectedPage>
  )
}
