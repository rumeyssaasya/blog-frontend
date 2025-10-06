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

  useEffect(() => {
    if (post?.image) {
      const tempImg = new window.Image();
      tempImg.src = `http://localhost:5000/${post.image.replace(/\\/g, "/")}`;
      tempImg.onload = () => {
        const ratioHeight = (100 / tempImg.width) * tempImg.height;
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
      key={post._id}
      className="relative flex rounded-2xl shadow-md gap-4 p-4 transition-shadow duration-300"
      style={{ backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff", width: "550px" }}
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
        {/* Yazar ve Menü */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MdOutlinePerson size={30} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
            <p className="text-l mt-2">{post.author.username}</p>
          </div>

          {token && (
            <ProtectedPage>
              <div className="relative">
                <BsThreeDots
                  size={25}
                  style={{ cursor: "pointer", color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }}
                  onClick={() => setOpenMenu(!openMenu)}
                />
                {openMenu && (
                  <div className="absolute right-0 mt-2 w-28 rounded-md text-sm shadow-sm z-10"
                    style={{
                      background: theme === "dark" ? "#1e293b" : "#c4b5fd",
                      border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`, marginTop:'2rem'
                    }}
                  >
                    <p className="cursor-pointer rounded-t-md" style={{padding:'2rem'}}>Güncelle</p>
                    <p 
                    style={{padding:'2rem'}}
                    className="cursor-pointer rounded-b-md text-red-600" onClick={() => handleDelete(post._id)}>Sil</p>
                  </div>
                )}
              </div>
            </ProtectedPage>
          )}
        </div>

        {/* Başlık ve İçerik */}
        <div>
          <p className="text-xl font-bold mb-1" style={{marginBottom:'1rem'}}>{post.title}</p>
          <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.content}</p>
        </div>

        {/* Beğeni & Yorum */}
        <div className="absolute bottom-3 right-3 flex flex-col justify-center items-center gap-2">
          <div className="flex items-center gap-1 cursor-pointer">
            <TiHeart size={28} className="text-red-800 hover:scale-110 transition-transform" />
            <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.likes?.length || 0}</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <MdModeComment size={24} className="text-black dark:text-white hover:scale-110 transition-transform" />
            <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PostCard;
