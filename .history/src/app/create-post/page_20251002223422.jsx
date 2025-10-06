"use client"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../redux/slices/postsSlice"
import { motion } from "framer-motion"
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"

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
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">Yeni Gönderi Oluştur</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-700"
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-48 mb-4"
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />
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
