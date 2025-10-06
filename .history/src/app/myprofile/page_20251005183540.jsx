'use client';
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "../components/PostCard";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserPosts } from "../redux/slices/postsSlice";
/* import { logout, setCredentials } from "../redux/slices/authSlice"; */
import { deleteUser, getUserProfile } from "../redux/slices/usersSlices"; 
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
  const [loading, setLoading] = useState(true);

  // Component mount olduğunda localStorage'dan kullanıcıyı kontrol et ve Redux'a yükle
  useEffect(() => {
    const initializeAuth = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        console.log("🔍 localStorage check:");
        console.log("Stored User:", storedUser);
        console.log("Stored Token:", storedToken ? "exists" : "null");
        
        if (storedUser && storedToken && !authUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log("🔄 Setting credentials from localStorage:", parsedUser);
            dispatch(setCredentials({ user: parsedUser, token: storedToken }));
          } catch (error) {
            console.error("❌ Error parsing stored user:", error);
          }
        }
      }
    };

    initializeAuth();
  }, [dispatch, authUser]);

  // Kullanıcı profili ve postları çek
  useEffect(() => {
    const fetchData = async () => {
      // Önce mevcut kullanıcıyı belirle
      const currentUser = authUser;
      const currentToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      
      console.log("📋 Current state:");
      console.log("Auth User:", currentUser);
      console.log("Token:", currentToken ? "exists" : "null");

      if (currentUser?._id && currentToken) {
        console.log("🚀 Fetching data for user:", currentUser._id);
        
        try {
          // Profili çek
          await dispatch(getUserProfile({ userId: currentUser._id, token: currentToken })).unwrap();
          // Postları çek
          await dispatch(fetchUserPosts({ userId: currentUser._id, token: currentToken })).unwrap();
        } catch (error) {
          console.error("❌ Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("⏳ Waiting for user data...");
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, authUser, token]);

  // Debug için
  useEffect(() => {
    console.log("=== 🔍 DEBUG INFO ===");
    console.log("Auth User:", authUser);
    console.log("User Profile:", userProfile);
    console.log("Token:", token ? "exists" : "null");
    console.log("Profile Status:", profileStatus);
    console.log("Posts:", posts);
    console.log("Loading:", loading);
    console.log("===================");
  }, [authUser, userProfile, token, profileStatus, posts, loading]);

  const handleDeleteProfile = async () => {
    if (!window.confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!")) {
      return;
    }

    try {
      const userId = authUser?._id;
      const userToken = token || localStorage.getItem("token");
      
      if (!userId || !userToken) {
        alert("Kullanıcı bilgisi bulunamadı.");
        return;
      }
      
      await dispatch(deleteUser({ id: userId, token: userToken })).unwrap();
      dispatch(logout());
      alert("Hesabınız başarıyla silindi.");
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("Kullanıcı silinemedi: " + (err.message || "Bilinmeyen hata"));
    }
  };

  // Yüklenme durumu
  if (loading) {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen">
          <p>Profil yükleniyor...</p>
        </div>
      </ProtectedPage>
    );
  }

  // Kullanıcı yoksa
  if (!authUser && !userProfile) {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen flex-col">
          <p className="text-red-500 mb-4">Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.</p>
          <button 
            onClick={() => {
              dispatch(logout());
              window.location.href = '/login';
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Giriş Sayfasına Git
          </button>
        </div>
      </ProtectedPage>
    );
  }

  // Mevcut kullanıcıyı belirle (öncelik sırası: userProfile -> authUser)
  const currentUser = userProfile || authUser;
  const currentToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  if (!currentUser) {
    return (
      <ProtectedPage>
        <div className="flex justify-center items-center min-h-screen">
          <p>Kullanıcı bilgisi yükleniyor...</p>
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
              user={currentUser}
              token={currentToken}
              onClose={() => setIsEditOpen(false)}
            />
          )}

          <div className="flex flex-col items-center mt-4">
            {currentUser?.profilePic ? (
              <img
                src={`http://localhost:5000/${currentUser.profilePic.replace(/\\/g, '/')}`}
                alt={currentUser.username}
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
              <p className="text-lg font-semibold"><strong>Username:</strong> {currentUser.username}</p>
              <p className="text-gray-600"><strong>Email:</strong> {currentUser.email}</p>
              <p className="mt-2"><strong>Bio:</strong> {currentUser.bio || "Henüz bir bio eklenmemiş."}</p>
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