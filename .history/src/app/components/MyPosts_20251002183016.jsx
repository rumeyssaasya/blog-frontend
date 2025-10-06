'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPosts({ userId, token }) {
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      <AnimatePresence>
        {posts.map(post => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layout
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4 style={{ marginBottom: '10px' }}>{post.title}</h4>
            <p style={{ flexGrow: 1 }}>{post.content}</p>
            {post.image && (
              <img
                src={`http://localhost:5000/${post.image}`}
                alt="Post"
                style={{ width: '100%', borderRadius: '10px', marginTop: '10px', objectFit: 'cover' }}
              />
            )}
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
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
