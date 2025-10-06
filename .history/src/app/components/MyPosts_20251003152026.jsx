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
  const [openMenu, setOpenMenu] = useState(null); // hangi post menüsü açık?

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {posts.map(post => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <div className="flex flex-col gap-4 p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
                <PostCard post={post} theme={theme} />

                <div className="relative self-end">
                  <BsThreeDots
                    size={22}
                    className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-violet-600 transition"
                    onClick={() =>
                      setOpenMenu(openMenu === post._id ? null : post._id)
                    }
                  />
                  {openMenu === post._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                      <p className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-t-lg">
                        Güncelle
                      </p>
                      <p
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer rounded-b-lg"
                      >
                        Sil
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ProtectedPage>
  );
}
