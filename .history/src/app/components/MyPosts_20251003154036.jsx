"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import { BsThreeDots } from "react-icons/bs";
import ProtectedPage from "./ProtectedPage";
import { useTheme } from "next-themes";

export default function MyPosts({ userId, token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const { theme } = useTheme(); // dark / light

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Postlar alınamadı");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      console.error(err);
      alert("Post silinemedi");
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchPosts();
  }, [userId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (posts.length === 0) return <p>Henüz gönderi yok.</p>;

  return (
    <ProtectedPage>
      <div className="flex flex-wrap gap-6" style={{ margin: "2% 10%" }}>
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-start"
              style={{ width: "300px" }} // PostCard sabit genişlik
            >
              <PostCard post={post} theme={theme} style={{ width: "300px" }} />

              <div className="relative self-end" style={{ marginTop: "2px" }}>
                <BsThreeDots
                  size={22}
                  style={{
                    cursor: "pointer",
                    color: theme === "dark" ? "#e0e7ff" : "#4b5563",
                  }}
                  onClick={() =>
                    setOpenMenu(openMenu === post._id ? null : post._id)
                  }
                />
                {openMenu === post._id && (
                  <div
                    className="absolute right-0 w-28 rounded-md text-sm shadow-sm z-10"
                    style={{
                      marginTop: "5px",
                      background: theme === "dark" ? "#1f2937" : "#fff",
                      border: `1px solid ${
                        theme === "dark" ? "#374151" : "#d1d5db"
                      }`,
                    }}
                  >
                    <p
                      className="cursor-pointer rounded-t-md"
                      style={{
                        padding: "10px 15px",
                        color: theme === "dark" ? "#f3f4f6" : "#111827",
                      }}
                    >
                      Güncelle
                    </p>
                    <p
                      onClick={() => handleDelete(post._id)}
                      className="cursor-pointer rounded-b-md"
                      style={{
                        padding: "10px 15px",
                        color: theme === "dark" ? "#f87171" : "#dc2626",
                      }}
                    >
                      Sil
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ProtectedPage>
  );
}
