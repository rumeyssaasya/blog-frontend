"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard";
import { BsThreeDots } from "react-icons/bs";
import ProtectedPage from "./ProtectedPage";

export default function MyPosts({ userId, token, theme }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

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
      <div className="flex flex-wrap gap-6">
        <AnimatePresence>
          {posts.map(post => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-start"
            >
              <PostCard post={post} theme={theme} />

              <div className="relative mt-2 self-end">
                <BsThreeDots
                  size={22}
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-violet-600 transition"
                  onClick={() =>
                    setOpenMenu(openMenu === post._id ? null : post._id)
                  }
                />
                {openMenu === post._id && (
                  <div className="absolute right-0 w-28 rounded-md border border-gray-300 dark:border-gray-600 text-sm shadow-sm bg-white dark:bg-gray-800 z-10"
                  style={{marginTop:'2rem'}}>
                    <p className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-t-md"
                    style={{padding:'2rem 3rem'}}>
                      Güncelle
                    </p>
                    <p
                      onClick={() => handleDelete(post._id)}
                      className=" text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-b-md"
                      style={{padding:'2rem 3rem'}}
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
