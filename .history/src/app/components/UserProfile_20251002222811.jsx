'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const userId = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Kullanıcı bulunamadı</p>;

  return (
    <div style={{
      maxWidth: '600px', margin: '40px auto', padding: '20px',
      borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <h2>{user.username} Profil</h2>
      {user.profilePic && (
        <img
          src={`http://localhost:5000/${user.profilePic}`}
          alt="Profil Fotoğrafı"
          style={{ width: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }}
        />
      )}
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || "Henüz bir bio eklenmemiş."}</p>
    </div>
  );
}
