'use client';
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "../components/PostCard";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { logout } from "../redux/slices/authSlice";
import { deleteUser, getUserProfile, updateUser } from "../redux/slices/usersSlices"; 
import UpdateProfileForm from "../components/UpdateProfileForm";
import { FaRegUser } from "react-icons/fa";

export default function MyProfile() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const authUser = useSelector(state => state.auth.user);
  const userProfile = useSelector(state => state.users.profile);
  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);
  const profileStatus = useSelector(state => state.users.status);
  const profileError = useSelector(state => state.users.error);

  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Token'ı hem Redux'tan hem localStorage'dan al
  const currentToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  // Component mount olduğunda profili çek
  useEffect(() => {
  const userId = authUser?._id || localUser?._id;
  const userToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  console.log("User ID:", userId);
  console.log("User Token:", userToken);

  if (userId && userToken) {
    console.log("Fetching profile and posts for user:", userId);
    
    // Profili çek - OBJE olarak gönder
    dispatch(getUserProfile({ userId, token: userToken }));
    
    // Postları çek - OBJE olarak gönder
    dispatch(fetchUserPosts({ userId, token: userToken }));
  }
}, [dispatch, authUser, localUser, token]);

  const handleDeleteProfile = async () => {
    if (!window.confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")) {
      return;
    }

    try {
      await dispatch(deleteUser({ id: userProfile._id, token: currentToken })).unwrap();
      dispatch(logout());
      // LocalStorage'ı temizle
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Hesabınız başarıyla silindi.");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Kullanıcı silinemedi: " + (err.message || "Bilinmeyen hata"));
    }
  };

  // Yüklenme durumu
  if (profileStatus === 'loading') {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen">
          <p>Profil yükleniyor...</p>
        </div>
      </ProtectedPage>
    );
  }

  // Hata durumu
  if (profileStatus === 'failed') {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen">
          <p>Profil yüklenirken hata: {profileError}</p>
        </div>
      </ProtectedPage>
    );
  }

  // userProfile yoksa veya authUser yoksa
  if (!userProfile || !authUser) {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen">
          <p>Profil bulunamadı.</p>
        </div>
      </ProtectedPage>
    );
  }

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
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
              style={{color:theme==="dark"? "#a78bfa":"#2e1065"}}
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
                style={{ padding: "10px 15px", color: theme === "dark" ? "#f3f4f6" : "#111827" }}
                onClick={() => setIsEditOpen(true)}
              >
                Güncelle
              </p>
              <p
                onClick={handleDeleteProfile}
                className="cursor-pointer rounded-b-md"
                style={{ padding: "10px 15px", color: theme === "dark" ? "#f87171" : "#dc2626" }}
              >
                Sil
              </p>
            </div>
          )}

          {isEditOpen && (
            <UpdateProfileForm
              user={userProfile}
              token={currentToken}
              onClose={() => setIsEditOpen(false)}
            />
          )}

          <div className="flex flex-col items-center mt-4">
            {userProfile?.profilePic ? (
              <img
                src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, '/')}`}
                alt={userProfile.username}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="rounded-full bg-gray-300 w-32 h-32 flex items-center justify-center">
                <FaRegUser size={60} className="text-gray-600" />
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold"><strong>Username:</strong> {userProfile.username}</p>
              <p className="text-gray-600"><strong>Email:</strong> {userProfile.email}</p>
              <p className="mt-2"><strong>Bio:</strong> {userProfile.bio || "Henüz bir bio eklenmemiş."}</p>
            </div>
          </div>
        </div>

        {/* Postlar */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">My Posts</h2>
          {postsStatus === 'loading' ? (
            <p className="text-center">Postlar yükleniyor...</p>
          ) : posts.length === 0 ? (
            <p className="text-center">Henüz postunuz bulunmuyor.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ margin: "2% 5%" }}>
              {posts.map(post => (
                <PostCard key={post._id} post={post} theme={theme} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}