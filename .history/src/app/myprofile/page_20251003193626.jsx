'use client';
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "../components/PostCard";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { logout } from "../redux/slices/authSlice";
import { deleteUser } from "../redux/slices/usersSlices"; // kullanıcı silme thunk

export default function MyProfile() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);

  const [open, setOpen] = useState(false);


  const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // Kullanıcının postlarını fetch et
  useEffect(() => {
    if (user?._id && savedToken) {
      dispatch(fetchUserPosts({ userId: user._id, token: savedToken }));
    }
  }, [dispatch, user?._id, savedToken]);

  if (!user) return;

  const handleDeleteProfile = async (userId) => {
    try {
      await dispatch(deleteUser({ id: userId, token })); // Redux üzerinden delete
      dispatch(logout()); // silince çıkış yap
    } catch (err) {
      console.error(err);
      alert("Kullanıcı silinemedi");
    }
  };

  const handleUpdateProfile = async (userId, data) => {
    try {
      // data: { username, email, bio, vs. }
      await dispatch(updateUser({ id: userId, data, token })).unwrap();
      alert("Kullanıcı bilgileri başarıyla güncellendi");
    } catch (err) {
      console.error(err);
      alert("Kullanıcı bilgileri güncellenirken bir hata oluştu");
    }
  };

  return (
    <ProtectedPage>
      <div>
        <div
          style={{
            backgroundColor: theme === "dark" ? "#2e1065" : "#c4b5fd",
            maxWidth: '600px',
            margin: '40px auto',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            position: 'relative'
          }}
        >
          <div className="flex justify-between items-center" style={{ margin: '5px' }}>
            <p className="font-bold text-xl">Benim Profilim</p>
            <BsThreeDots
              size={25}
              className="text-violet-950 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>

          {open && (
            <div
              className="absolute right-0 mt-2 w-28 rounded-md text-sm shadow-sm z-10"
              style={{
                background: theme === "dark" ? "#1e293b" : "#c4b5fd",
                border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
              }}
            >
              <p
                className="cursor-pointer rounded-t-md"
                style={{
                  padding: "10px 15px",
                  color: theme === "dark" ? "#f3f4f6" : "#111827"
                }}
                onClick={()=>{
                  {isEditOpen && (
                    <UpdateProfileForm
                      user={user}
                      token={token}
                      onClose={() => setIsEditOpen(false)}
                    />
                  )}

                  <p onClick={() => setIsEditOpen(true)}>Güncelle</p>
                }}
                
              >
                Güncelle
              </p>
              <p
                onClick={() => handleDeleteProfile(user._id)}
                className="cursor-pointer rounded-b-md"
                style={{
                  padding: "10px 15px",
                  color: theme === "dark" ? "#f87171" : "#dc2626"
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
              style={{
                width: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '20px'
              }}
            />
          )}

          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || "Henüz bir bio eklenmemiş."}</p>
        </div>

        {/* Kullanıcının postları */}
        {postsStatus === 'loading' ? (
          <p>Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <p>Henüz gönderi yok.</p>
        ) : (
          <div className="flex flex-wrap gap-6" style={{ margin: "2% 10%" }}>
            {posts.map(post => (
              <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
