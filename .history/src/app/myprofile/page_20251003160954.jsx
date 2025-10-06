'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProtectedPage from "../components/ProtectedPage";
import MyPosts from "../components/MyPosts";
import { useTheme } from "next-themes";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setError("Token bulunamadı");

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch(err) {
      console.error("Token decode hatası:", err);
      setError("Token geçersiz");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch(err) {
        console.error(err);
        setError(err.response?.data?.message || "Kullanıcı alınamadı");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Kullanıcı bulunamadı</p>;

  return (
    <ProtectedPage>
      <div>
      <div style={{
        maxWidth: '600px', margin: '40px auto', padding: '20px',
        borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2>Benim Profilim</h2>
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
      <MyPosts userId={user._id} token={localStorage.getItem("token")} />
      </div>
    </ProtectedPage>
  );
}
