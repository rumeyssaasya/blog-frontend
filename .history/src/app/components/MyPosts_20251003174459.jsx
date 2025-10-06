'use client';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import ProtectedPage from "../components/ProtectedPage";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Redux store'dan user bilgisi
  const user = useSelector(state => state.auth.user);

  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserPosts(user._id));
    }
  }, [dispatch, user?._id]);

  if (!user) return <p>Kullanıcı bulunamadı</p>;

  return (
    <ProtectedPage>
      <div>
        <div style={{
          backgroundColor: theme === "dark" ? "#2e1065" : "#c4b5fd",
          maxWidth: '600px', margin: '40px auto', padding: '20px',
          borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div className="flex flex-row justify-between items-center" style={{ margin:'5px' }}> 
            <p className="font-bold text-xl">Benim Profilim</p>
            <BsThreeDots size={25} className="text-violet-950 cursor-pointer" onClick={() => setOpen(!open)}/>
          </div>
          {open && (
            <div
              className="absolute right-0 mt-2 w-28 rounded-md text-sm shadow-sm z-10"
              style={{
                background: theme === "dark" ? "#1e293b" : "#c4b5fd",
                border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`
              }}
            >
              <p className="cursor-pointer rounded-t-md" style={{ padding: "10px 15px", color: theme === "dark" ? "#f3f4f6" : "#111827" }}>
                Güncelle
              </p>
              <p className="cursor-pointer rounded-b-md" style={{ padding: "10px 15px", color: theme === "dark" ? "#f87171" : "#dc2626" }}>
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

        {/* MyPosts Redux üzerinden */}
        {postsStatus === 'loading' ? (
          <p>Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <p>Henüz gönderi yok.</p>
        ) : (
          <div className="flex flex-wrap gap-6" style={{ margin: "2% 10%" }}>
            {posts.map(post => (
              <PostCard key={post._id} post={post} theme={theme} style={{ width: "300px" }} />
            ))}
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
