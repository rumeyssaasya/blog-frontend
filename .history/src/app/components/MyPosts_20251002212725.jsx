'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "./PostCard"; 
import { BsThreeDotsVertical } from "react-icons/bs";

export default function MyPosts({ userId, token, theme }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {posts.map(post => (
          <motion.div
            key={post._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          ><div className="flex flex-col items-center justify-center gap-6" style={{margin: '5px'}}>
            <BsThreeDotsVertical 
              size={24} 
              style={{ alignSelf: 'flex-end', cursor: 'pointer', color: theme === 'dark' ? '#e0e7ff' : '#6b21a8' }} 
            />
            <PostCard 
              post={post} 
              theme={theme} 
            />
          </div>
            
            {/* Silme butonu */}
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#ff4d4f',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Sil
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
