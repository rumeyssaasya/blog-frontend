'use client';
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }} />}
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => handleDelete(post._id)} style={{ marginRight: '10px', color: 'red' }}>Sil</button>
            {/* Update işlemi için modal veya başka bir component ekleyebilirsin */}
          </div>
        </div>
      ))}
    </div>
  );
}
