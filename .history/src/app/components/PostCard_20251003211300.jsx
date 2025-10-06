'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import { MdOutlinePerson } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { motion } from 'framer-motion';
import ProtectedPage from "./ProtectedPage";
import axios from "axios";

function PostCard({ post, theme, token, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [imgHeight, setImgHeight] = useState(100);

  // Dinamik resim yüksekliği
  useEffect(() => {
    if(post?.image){
      const img = new Image();
      img.src = `http://localhost:5000/${post.image.replace(/\\/g, "/")}`;
      img.onload = () => {
        const ratioHeight = (100 / img.width) * img.height;
        setImgHeight(ratioHeight);
      };
    }
  }, [post?.image]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(postId);
    } catch (err) {
      console.error(err);
      alert("Post silinemedi");
    }
  };

  return (
    <motion.div
      className="flex gap-4 rounded-2xl shadow-md p-4 transition-shadow duration-300"
      style={{ backgroundColor: theme === "dark" ? "#1e293b" : "#f3f4f6" }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
    >
      {/* Resim */}
      {post?.image && (
        <div className="flex-shrink-0">
          <Image
            src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
            alt={post.title}
            width={100}
            height={imgHeight}
            className="rounded object-cover"
          />
        </div>
      )}

      {/* İçerik */}
      <div className="flex flex-col justify-between flex-1 relative">
        {/* Başlık ve içerik */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MdOutlinePerson size={24} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
            <p className="font-semibold">{post.author.username}</p>
            
            {token && (
              <div className="ml-auto relative">
                <BsThreeDots
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setOpenMenu(!openMenu)}
                  style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }}
                />
                {openMenu && (
                  <div className="absolute right-0 mt-2 w-28 rounded-md shadow-md z-10"
                    style={{ background: theme === "dark" ? "#1e293b" : "#fff" }}
                  >
                    <p className="p-2 cursor-pointer">Güncelle</p>
                    <p className="p-2 cursor-pointer text-red-600" onClick={() => handleDelete(post._id)}>Sil</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-lg font-bold">{post.title}</p>
          <p style={{ color: theme === "dark" ? "#e0e0e0" : "#111827" }}>{post.content}</p>
        </div>

        {/* Yorum ve Beğeni */}
        <div className="absolute bottom-2 right-2 flex gap-3 items-center">
          <div className="flex items-center gap-1 cursor-pointer">
            <TiHeart size={24} className="text-red-600" />
            <span>{post.likes?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <MdModeComment size={20} />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PostCard;
