'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import { MdOutlinePerson } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { motion } from 'framer-motion';
import ProtectedPage from "./ProtectedPage";
import { useDispatch } from "react-redux";
import { fetchPosts, updatePost, deletePost } from "../redux/slices/postsSlice";

function PostCard({ post, theme }) {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const hasImage = !!post?.image;
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);

  useEffect(() => {
    if (hasImage) {
      const tempImg = new window.Image();
      tempImg.src = `http://localhost:5000/${post.image.replace(/\\/g, "/")}`;
    }
  }, [post?.image]);

  const handleDelete = (postId) => {
    if (confirm("Postu silmek istediğinizden emin misiniz?")) {
      dispatch(deletePost(postId))
        .unwrap()
        .catch(err => alert(err.message || "Post silinirken hata oluştu"));
    }
  };

  const handleUpdate = async () => {
    if (!newTitle || !newContent) return alert("Başlık ve içerik boş olamaz");
    try {
      await dispatch(updatePost({ postId: post._id, title: newTitle, content: newContent })).unwrap();
      setIsUpdating(false);
      setOpenMenu(false);
    } catch (err) {
      alert(err.message || "Güncelleme başarısız");
    }
  };

  return (
    <div style={{ marginBottom: "16px", width: "500px" }}>
      {/* Üst Bilgi */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MdOutlinePerson size={30} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{post.author.username}</p>
        </div>

        <ProtectedPage>
          <div style={{ position: "relative" }}>
            <BsThreeDots
              size={25}
              style={{ cursor: "pointer", color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }}
              onClick={() => setOpenMenu(true)}
            />
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
          height: "300px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: hasImage ? "flex-start" : "center",
          position: "relative",
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
      >
        {/* Görsel */}
        {hasImage && (
          <div style={{ flexShrink: 0 }}>
            <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
              alt={post.title}
              width={200}
              height={250}
              style={{ borderRadius: "8px" }}
              className="rounded object-cover max-h-[250px] w-auto"
            />
          </div>
        )}

        {/* İçerik */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          marginLeft: hasImage ? "16px" : "0",
          textAlign: hasImage ? "left" : "center",
        }}>
          <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</p>
          <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.content}</p>
        </div>

        {/* Beğeni & Yorum */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1 cursor-pointer">
            <TiHeart size={28} style={{ color: "red" }} />
            <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.likes?.length || 0}</span>
          </motion.div>

          <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1 cursor-pointer">
            <MdModeComment size={24} style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a" }} />
            <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.comments?.length || 0}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Güncelleme Modal */}
      {openMenu && isUpdating && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
            padding: "24px",
            borderRadius: "12px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Başlık"
              style={{ padding: "8px", borderRadius: "6px" }}
            />
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="İçerik"
              style={{ padding: "8px", borderRadius: "6px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdate}
                style={{ padding: "8px 12px", background: "#4f46e5", color: "#fff", borderRadius: "6px" }}
              >
                Kaydet
              </button>
              <button
                onClick={() => setIsUpdating(false)}
                style={{ padding: "8px 12px", background: "#ef4444", color: "#fff", borderRadius: "6px" }}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard;
