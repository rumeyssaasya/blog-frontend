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
    padding: "10px",
    margin: "5px",
  };

  const contentStyle = {
    color: isDark ? "lightGray" : "#18191a",
  };

  return (
    <div className=" flex justify-center items-center" style={{margin: '20px'}}>
      {/* Resimli Post */}
      
      {post?.image ? (
        <motion.div
          className="relative flex flex-row justify-between rounded-2xl shadow-md transition-shadow duration-300 gap-1 w-150 h-60"
          style={containerStyle}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="flex items-center justify-center"
            style={{ marginLeft: "20px" }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
              alt={post.title}
              width={250}
              height={200}
              className="rounded object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-3xl font-bold text-center flex items-center m-2">
              {post.title}
            </p>
            <p className="mr-10" style={contentStyle}>
              {post.content}
            </p>
          </motion.div>

          <div className="absolute bottom-3 right-3 flex flex-col justify-end items-center gap-2">
            <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1">
              <TiHeart size={28} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: isDark ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                {post.likes?.length || 0}
              </span>
            </motion.div>

            <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1">
              <MdModeComment size={24} className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: isDark ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Resimsiz Post
        <motion.div
          className="relative flex flex-col justify-center items-center rounded-2xl hover:shadow-xl shadow-md transition-shadow duration-300 w-150 h-60"
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={containerStyle}
        >
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-3xl font-bold mb-2">{post.title}</p>
            <p style={contentStyle}>{post.content}</p>
          </div>

          <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <TiHeart size={28} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: isDark ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                {post.likes?.length || 0}
              </span>
            </motion.div>

            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <MdModeComment size={24} className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: isDark ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
