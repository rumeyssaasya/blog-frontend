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
            >
              <PostCard post={post} theme={theme} style={{ width: "300px" }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ProtectedPage>
  );
}
