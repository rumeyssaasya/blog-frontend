'use client';
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "../components/PostCard";
import { useTheme } from "next-themes";
import { BsThreeDots } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { logout } from "../redux/slices/authSlice";
import { deleteUser, getUserProfile } from "../redux/slices/usersSlices";
import UpdateProfileForm from "../components/UpdateProfileForm";

export default function MyProfile() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const authUser = useSelector(state => state.auth.user);
  const userProfile = useSelector(state => state.users.profile);
  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);

  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?._id) return;

    const savedToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (!savedToken) return;

    dispatch(getUserProfile(authUser._id));
    dispatch(fetchUserPosts({ userId: authUser._id, token: savedToken }))
      .finally(() => setLoading(false));
  }, [authUser, dispatch, token]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Yükleniyor...</p>;
  if (!userProfile) return <p style={{ textAlign: "center", marginTop: "50px" }}>Profil bulunamadı.</p>;

  const handleDeleteProfile = async () => {
    try {
      await dispatch(deleteUser({ id: userProfile._id, token }));
      dispatch(logout());
    } catch (err) {
      console.error(err);
      alert("Kullanıcı silinemedi");
    }
  };

  return (
    <ProtectedPage>
      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <div style={{
          backgroundColor: theme === "dark" ? "#2e1065" : "#c4b5fd",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative"
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: "10px" }}>
            <p className="font-bold text-xl">Benim Profilim</p>
            <BsThreeDots
              size={25}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
              style={{ color: theme === "dark" ? "#a78bfa" : "#2e1065" }}
            />
          </div>

          {open && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "40px",
              width: "120px",
              backgroundColor: theme === "dark" ? "#1e293b" : "#c4b5fd",
              border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
              borderRadius: "8px",
              zIndex: 20
            }}>
              <p
                onClick={() => setIsEditOpen(true)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`
                }}
              >
                Güncelle
              </p>
              <p
                onClick={handleDeleteProfile}
                style={{ padding: "10px", cursor: "pointer", color: "red" }}
              >
                Sil
              </p>
            </div>
          )}

          {isEditOpen && (
            <UpdateProfileForm
              user={userProfile}
              token={token}
              onClose={() => setIsEditOpen(false)}
            />
          )}

          {userProfile.profilePic ? (
            <img
              src={`http://localhost:5000/${userProfile.profilePic.replace(/\\/g, "/")}`}
              alt={userProfile.username}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <FaRegUser size={120} className="text-gray-300" />
          )}

          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Bio:</strong> {userProfile.bio || "Henüz bio eklenmemiş."}</p>
        </div>

        {/* Kullanıcının postları */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px" }}>Gönderiler</h3>
          {postsStatus === "loading" ? (
            <p>Gönderiler yükleniyor...</p>
          ) : posts.length === 0 ? (
            <p>Henüz gönderi yok.</p>
          ) : (
            <div className="flex flex-wrap gap-5">
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
