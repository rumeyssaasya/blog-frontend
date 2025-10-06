'use client'

import { MdOutlinePerson } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import Image from 'next/image';
import { motion } from 'framer-motion';


// Component: Tek bir Post Card
function PostCard({ post, theme }) {
  return (
    <div className="h-[100vh]">
      {/* Author */}
      <div className="flex items-center gap-2 " style={{ marginBottom: '5px' }}>
        <MdOutlinePerson size={30} style={{ color: theme === 'dark' ? '#e0e7ff' : '#6b21a8' }} />
        <p className="text-l" style={{marginTop:'10px'}}>{post.author.username}</p>
      </div>

      {/* Post Card */}
      {post?.image ? (
        <motion.div
          key={post._id}
          className="relative flex flex-col justify-between rounded-2xl shadow-md transition-shadow duration-300 gap-1"
          style={{
            backgroundColor: theme === 'dark' ? '#7008e7' : '#8e51ff',
            padding: '10px',
            height: '270px',
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.8)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {/* Image */}
          <motion.div
            className="flex items-center justify-center "
            style={{ marginLeft: '5px' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
              alt={post.title}
              width={250}
              height={150}
              className="rounded object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl font-bold ">{post.title}</p>
            <p style={{ color: theme === 'dark' ? 'lightGray' : '#18191a',marginBottom:'5px' }}>{post.content}</p>
          </motion.div>

          {/* Likes & Comments */}
          <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <TiHeart size={28} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: theme === 'dark' ? '#e0e0e0' : '#18191a', fontSize: '14px' }}>
                {post.likes?.length || 0}
              </span>
            </motion.div>
            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <MdModeComment size={24} className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: theme === 'dark' ? '#e0e0e0' : '#18191a', fontSize: '14px' }}>
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        // Resimsiz Post
        <motion.div
          key={post._id}
          className="relative flex flex-col justify-center items-center rounded-2xl  shadow-md transition-shadow duration-300"
          style={{
            backgroundColor: theme === 'dark' ? '#7008e7' : '#8e51ff',
            height: '270px',
            padding: '20px',
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-xl font-bold mb-2">{post.title}</p>
            <p style={{ color: theme === 'dark' ? 'lightGray' : '#18191a' }}>{post.content}</p>
          </div>

          <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <TiHeart size={28} className="text-red-800 cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: theme === 'dark' ? '#e0e0e0' : '#18191a', fontSize: '14px' }}>
                {post.likes?.length || 0}
              </span>
            </motion.div>
            <motion.div whileTap={{ scale: 1.2 }} className="flex items-center gap-1">
              <MdModeComment size={24} className="text-black dark:text-white cursor-pointer hover:scale-110 transition-transform" />
              <span style={{ color: theme === 'dark' ? '#e0e0e0' : '#18191a', fontSize: '14px' }}>
                {post.comments?.length || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default PostCard;