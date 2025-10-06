'use client';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Redux store’dan login olan user bilgisi
  const authUser = useSelector(state => state.auth.user);

  if (!token || !authUser) {
    return <p>Lütfen giriş yapın</p>; // Login component zaten ayrı sayfada
  }

  return (
    <div>
      <h2>Profilim</h2>
      <p>Username: {authUser.username}</p>
      <p>Email: {authUser.email}</p>
      <p>Bio: {authUser.bio}</p>
      {authUser.profilePic && <img src={`http://localhost:5000/${authUser.profilePic}`} alt="Profil" width={120} />}
    </div>
  );
}
