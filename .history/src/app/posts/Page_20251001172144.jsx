'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'
import { MdOutlinePerson } from "react-icons/md";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import { motion } from "framer-motion";

export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)
  const theme= useTheme().theme;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container" style={{padding:'20px',margin:'0 auto'}}>
      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <div className=" flex flex-col items-center justify-center gap-6" style={{margin: '20px'}}>
          {posts.map((post) => (
            <div className='' key={post._id}>
              <div className='flex items-center gap-2 mb-2' style={{marginBottom:'5px',}}>
                <MdOutlinePerson size={30} style={{color: theme ==='dark' ? '#e0e7ff' : '#6b21a8',}}/>
                <p className="text-l mt-4">{post.author.username}</p>
              </div>
              
                {post?.image && (
                  <motion.div
                    key={post._id}
                    className="relative flex flex-row justify-between h-50 w-150 rounded-2xl shadow-md transition-shadow duration-300 gap-1"
                    style={{
                      backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff",
                      padding: "10px",
                    }}
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {/* Görsel */}
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

                    {/* İçerik */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <p
                        className="text-3xl font-bold text-center flex items-center"
                        style={{ margin: "10px" }}
                      >
                        {post.title}
                      </p>
                      <p
                        style={{
                          color: theme === "dark" ? "lightGray" : "#18191a",
                          marginRight: "40px",
                        }}
                      >
                        {post.content}
                      </p>
                    </motion.div>

                    {/* İkonlar - Sağ Alt */}
                    <div className="absolute bottom-3 right-3 flex flex-col justify-end items-center gap-2">
                      {/* Beğeni */}
                      <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1">
                        <TiHeart
                          size={28}
                          className="text-red-800 cursor-pointer hover:scale-110 transition-transform"
                        />
                        <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                          {post.likes?.length || 0}
                        </span>
                      </motion.div>

                      {/* Yorum */}
                      <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1">
                        <MdModeComment
                          size={24}
                          className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                        />
                        <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                          {post.comments?.length || 0}
                        </span>
                      </motion.div>
                    </div>

                  </motion.div>
                )}
                {!post?.image && (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex flex-col justify-center items-center h-50 w-150 rounded-2xl p-6 hover:shadow-xl shadow-md transition-shadow duration-300"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
                    style={{ backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff" }}
                  >
                    {/* İçerik */}
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-3xl font-bold mb-2">{post.title}</p>
                      <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>
                        {post.content}
                      </p>
                    </div>

                    {/* Sağ alt köşe butonları ve sayılar */}
                    <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
                      {/* Beğeni */}
                      <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
                        <TiHeart
                          size={28}
                          className="text-red-800 cursor-pointer hover:scale-110 transition-transform"
                        />
                        <div>
                          <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                          {post.likes?.length || 0}
                        </span>
                        </div>
                        
                      </motion.div>

                      {/* Yorum */}
                      <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
                        <MdModeComment
                          size={24}
                          className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform"
                        />
                        <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>
                          {post.comments?.length || 0}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}


              </div>
          ))}
        </div>
      )}

      {status === 'failed' && (
        <p className="text-center text-red-500">Yükleme hatası: {posts.error}</p>
      )}
    </div>

  )
}
