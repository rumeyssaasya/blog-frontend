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
    className="relative flex flex-row h-auto min-h-[220px] w-full max-w-4xl rounded-2xl overflow-hidden group"
    style={{
      backgroundColor: theme === 'dark' ? '#7008e7' : '#8e51ff',
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    transition={{ duration: 0.5 }}
  >
    {/* Resim Bölümü */}
    <motion.div 
      className="flex-shrink-0 relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-64 h-full relative">
        <Image
          src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
          alt={post.title}
          fill
          className="object-cover rounded-l-2xl"
          sizes="(max-width: 256px) 100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
    </motion.div>

    {/* İçerik Bölümü */}
    <div className="flex flex-col flex-1 p-6 pr-20">
      <motion.h3 
        className="text-2xl font-bold mb-3 text-white line-clamp-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {post.title}
      </motion.h3>
      
      <motion.p 
        className="text-lg leading-relaxed line-clamp-3 flex-1"
        style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(248,250,252,0.95)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {post.content}
      </motion.p>

      {/* Etiketler */}
      <motion.div 
        className="flex items-center gap-2 mt-4 pt-4 border-t border-white border-opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="text-sm px-3 py-1 rounded-full bg-white bg-opacity-20 text-white backdrop-blur-sm">
          #{post.category || "Genel"}
        </span>
        <span className="text-sm text-white text-opacity-80">
          {new Date(post.createdAt).toLocaleDateString('tr-TR')}
        </span>
      </motion.div>
    </div>

    {/* İkonlar Bölümü */}
    <motion.div 
      className="absolute bottom-6 right-6 flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Beğeni Butonu */}
      <motion.div 
        className="flex flex-col items-center group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200">
          <TiHeart 
            size={26} 
            className="text-white group-hover:text-red-400 transition-colors duration-200" 
          />
        </div>
        <motion.span 
          className="text-white text-sm mt-1 font-medium"
          whileHover={{ scale: 1.05 }}
        >
          {post.likes || 0}
        </motion.span>
      </motion.div>

      {/* Yorum Butonu */}
      <motion.div 
        className="flex flex-col items-center group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200">
          <MdModeComment 
            size={24} 
            className="text-white group-hover:text-blue-400 transition-colors duration-200" 
          />
        </div>
        <motion.span 
          className="text-white text-sm mt-1 font-medium"
          whileHover={{ scale: 1.05 }}
        >
          {post.comments || 0}
        </motion.span>
      </motion.div>

      {/* Paylaşım Butonu */}
      <motion.div 
        className="flex flex-col items-center group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200">
          <FiShare2 
            size={20} 
            className="text-white group-hover:text-green-400 transition-colors duration-200" 
          />
        </div>
      </motion.div>
    </motion.div>

    {/* Hover Efekti */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
  </motion.div>
)}
                {!post?.image && (
                  <div
                    key={post._id}
                    className="relative flex flex-col justify-center items-center h-50 w-150 rounded-lg p-6 hover:shadow-xl shadow-md transition-shadow duration-300"
                    style={{ backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff" }}
                  >
                    {/* İçerik */}
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-3xl font-bold mb-2">{post.title}</p>
                      <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>
                        {post.content}
                      </p>
                    </div>

                    {/* Sağ alt köşe butonları */}
                    <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
                      <TiHeart size={35} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
                      <MdModeComment size={28} className="text-black cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                  </div>
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
