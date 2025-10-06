'use client';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slices/usersSlices'; // usersSlices içindeki fetchUsers

export default function MyProfile({ authUserProp }) {
  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const users = useSelector((state) => state.users.items);
  const status = useSelector((state) => state.users.status);
  const dispatch = useDispatch();

  useEffect(() => {
    // Token varsa set et
    const localToken = localStorage.getItem("token");
    setToken(localToken);

    // Eğer authUser prop gelmişse onu kullan
    if (authUserProp) {
      setAuthUser(authUserProp);
    } else if (localToken && status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status, authUserProp]);

  // Eğer users listesi varsa ve authUser yoksa localStorage id ile eşleştir
  useEffect(() => {
    if (!authUser && token && users.length > 0) {
      const storedUserId = localStorage.getItem("userId"); // userId localStorage'da varsa
      const currentUser = users.find(u => u._id === storedUserId);
      setAuthUser(currentUser || null);
    }
  }, [users, authUser, token]);

  if (!token || !authUser) {
    return null; // Token yoksa veya user yoksa component render etme
  }

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
