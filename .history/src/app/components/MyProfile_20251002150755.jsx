'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

export default function MyProfile() {
  const [token, setToken] = useState(null);
  const users = useSelector((state) => state.users.items)
  const status = useSelector((state) => state.users.status)
  const dispatch = useDispatch()

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])


  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Benim Profilim</h2>

      {authUser.profilePic && (
        <img 
          src={`http://localhost:5000/${authUser.profilePic}`} 
          alt="Profil Fotoğrafı" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} 
        />
      )}

      <p><strong>Username:</strong> {authUser.username}</p>
      <p><strong>Email:</strong> {authUser.email}</p>
      <p><strong>Bio:</strong> {authUser.bio || "Henüz bir bio eklenmemiş."}</p>
    </div>
  );
}
