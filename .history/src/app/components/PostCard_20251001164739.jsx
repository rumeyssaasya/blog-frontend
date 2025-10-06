'use client'

import Image from "next/image";
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function PostCard({ post }) {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const containerStyle = {
    backgroundColor: isDark ? "#7008e7" : "#8e51ff",
  };

  const contentStyle = {
    color: isDark ? "lightGray" : "#18191a",
  };

  return (
    <div className="mb-6 w-full flex justify-center">
      {/* Resimli Post */}
      {post?.image ? (
        <motion.div
          className="relative flex flex-row w-full max-w-4xl rounded-2xl shadow-md transition-shadow duration-300 overflow-hidden"
          style={containerStyle}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Resim Bölümü */}
          <motion.div
            className="flex items-center justify-center p-4 flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
              alt={post.title}
              width={250}
              height={200}
              className="rounded-lg object-cover shadow-lg"
            />
          </motion.div>

          {/* İçerik Bölümü */}
          <motion.div
            className="flex flex-col justify-center flex-1 p-6 pr-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-lg leading-relaxed line-clamp-3" style={contentStyle}>
              {post.content}
            </p>
          </motion.div>

          {/* İkonlar */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-3">
            <motion.div 
              whileTap={{ scale: 1.3 }} 
              className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-2 backdrop-blur-sm"
            >
              <TiHeart size={24} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">
                {post.likes?.length || 0}
              </span>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 1.3 }} 
              className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-2 backdrop-blur-sm"
            >
              <MdModeComment size={20} className="text-white cursor-pointer hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Resimsiz Post
        <motion.div
          className="relative flex flex-col w-full max-w-2xl rounded-2xl p-8 hover:shadow-xl shadow-md transition-shadow duration-300 text-center"
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={containerStyle}
        >
          {/* İçerik */}
          <div className="flex flex-col justify-center items-center text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
            <p className="text-lg leading-relaxed max-w-2xl" style={contentStyle}>
              {post.content}
            </p>
          </div>

          {/* İkonlar */}
          <div className="flex justify-center gap-6 mt-4">
            <motion.div 
              whileTap={{ scale: 1.2 }} 
              className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <TiHeart size={24} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">
                {post.likes?.length || 0}
              </span>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 1.2 }} 
              className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <MdModeComment size={20} className="text-white cursor-pointer hover:scale-110 transition-transform" />
              <span className="text-white text-sm font-medium">
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}