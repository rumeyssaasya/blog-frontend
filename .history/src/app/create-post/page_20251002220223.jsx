import React from 'react'

const page = () => {
  return (
    <div>
        "use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { FaTimes } from "react-icons/fa"

export default function CreatePostModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    if (image) formData.append("image", image)

    await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })

    setTitle("")
    setContent("")
    setImage(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-violet-700 mb-4">Yeni Gönderi Oluştur</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Başlık */}
              <input
                type="text"
                placeholder="Başlık"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-700"
              />

              {/* Quill Editor */}
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="h-40 mb-10"
              />

              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">Opsiyonel Resim</label>
                <input type="file" onChange={handleImageChange} />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-violet-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-violet-800 transition-colors"
              >
                Paylaş
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

    </div>
  )
}

export default page