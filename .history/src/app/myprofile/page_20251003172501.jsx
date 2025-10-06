'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProtectedPage from "../components/ProtectedPage";
import MyPosts from "../components/MyPosts";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const [open,setOpen] =useState(false)

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
  }
  const user = useSelector(state =>
    state.users.items.find(u => u._id === userId)
  );

  if (!user) return <p>Kullanıcı bulunamadı</p>;

 
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <ProtectedPage>
      <div>
      <div style={{
        backgroundColor: theme === "dark" ? "#2e1065" : "#c4b5fd",
        maxWidth: '600px', margin: '40px auto', padding: '20px',
        borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div className="flex flex-row justify-between items-center"
        style={{margin:'5px'}}> 
          <p className="font-bold text-xl">Benim Profilim</p>
          <BsThreeDots size={25} className="text-violet-950 cursor-pointer" onClick={()=> setOpen(true)}/>
        </div>
        {open &&(
              <div
                className="absolute right-0 mt-2 w-28 rounded-md text-sm shadow-sm z-10"
                style={{
                  background: theme === "dark" ? "#1e293b" : "#c4b5fd",
                  border: `1px solid ${
                    theme === "dark" ? "#374151" : "#d1d5db"
                  }`,
                }}
              >
                <p
                  className="cursor-pointer rounded-t-md"
                  style={{
                    padding: "10px 15px",
                    color: theme === "dark" ? "#f3f4f6" : "#111827",
                  }}
                >
                  Güncelle
                </p>
                <p
                  onClick={() => handleDelete(post._id)}
                  className="cursor-pointer rounded-b-md"
                  style={{
                    padding: "10px 15px",
                    color: theme === "dark" ? "#f87171" : "#dc2626",
                  }}
                >
                  Sil
                </p>
              </div>
            )}
        

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
