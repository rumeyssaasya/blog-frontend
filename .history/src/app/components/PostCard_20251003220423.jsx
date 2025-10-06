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

  const hasImage = !!post?.image;

  useEffect(() => {
    if (hasImage) {
      const tempImg = new window.Image();
      tempImg.src = `http://localhost:5000/${post.image.replace(/\\/g, "/")}`;
      tempImg.onload = () => {
        const ratioHeight = (150 / tempImg.width) * tempImg.height; // width = 150
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
    <div className="flex flex-col" style={{ marginBottom: "16px" , width:"500px"}}>
      {/* Yazar ve Menü Kartın Dışında */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "4px",
        paddingLeft: "16px",
        paddingRight: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MdOutlinePerson size={30} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{post.author.username}</p>
        </div>
        
          <ProtectedPage>
            <div style={{ position: "relative" }}>
              <BsThreeDots
                size={25}
                style={{ cursor: "pointer", color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }}
                onClick={() => setOpenMenu(!openMenu)}
              />
              {openMenu && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  marginTop: "8px",
                  width: "112px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  zIndex: 10,
                  background: theme === "dark" ? "#1e293b" : "#c4b5fd",
                  border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`
                }}>
                  <p style={{ cursor: "pointer", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", padding: "8px 12px" }}>Güncelle</p>
                  <p style={{ cursor: "pointer", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", padding: "8px 12px", color: theme === "dark" ? "#f87171" : "#dc2626" }} onClick={() => handleDelete(post._id)}>Sil</p>
                </div>
              )}
            </div>
          </ProtectedPage>
      </div>

      {/* Post Kart */}
      <motion.div
        key={post._id}
        className="relative flex rounded-2xl shadow-md gap-4 transition-shadow duration-300"
        style={{
          backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff",
          width: "500px",
          minHeight: "300px",
          padding: "16px",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: hasImage ? "flex-start" : "center",
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
      >
        {/* Resim */}
        {hasImage && (
          <div style={{ flexShrink: 0 }}>
            <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
              alt={post.title}
              width={150}
              height={Math.max(imgHeight, 300)}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
        )}

        {/* İçerik */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          position: "relative",
          marginLeft: hasImage ? "16px" : "0",
          textAlign: hasImage ? "left" : "center"
        }}>
          <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</p>
          <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.content}</p>

          {/* Beğeni & Yorum */}
          <div style={{ position: "absolute", bottom: "12px", right: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <TiHeart size={28} style={{ color: "red" }} />
              <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.likes?.length || 0}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
              <MdModeComment size={24} style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a" }} />
              <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PostCard;
