'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.items);
  const status = useSelector(state => state.users.status);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch(err) {
        console.error("User JSON parse hatası:", err);
      }
    }

    if (status === 'idle') dispatch(fetchUsers());
  }, [dispatch, status]);

  if (!user) return <p>Yükleniyor...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2>Benim Profilim</h2>
      {user.profilePic && <img src={`http://localhost:5000/${user.profilePic}`} alt="Profil Fotoğrafı" style={{ width: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />}
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || "Henüz bir bio eklenmemiş."}</p>
    </div>
  );
}
