'use client';
import ProtectedPage from "../components/ProtectedPage";
import PostCard from "../components/PostCard";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUserPosts } from "../redux/slices/postsSlice";
import { getUserProfile } from "../redux/slices/usersSlices";

export default function MyProfile() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.user);
  const userProfile = useSelector(state => state.users.profile);
  const posts = useSelector(state => state.posts.items);
  const postsStatus = useSelector(state => state.posts.status);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?._id) return;
    dispatch(getUserProfile(authUser._id))
      .finally(() => setLoading(false));

    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserPosts({ userId: authUser._id, token }));
    }
  }, [authUser, dispatch]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!userProfile) return <p>Profil bulunamadı.</p>;

  return (
    <ProtectedPage>
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h2 style={{ color: theme === "dark" ? "white" : "black" }}>
          {userProfile.username} Profil
        </h2>
        <p>Email: {userProfile.email}</p>
        <p>Bio: {userProfile.bio || "Henüz bio eklenmemiş."}</p>

        <div style={{ marginTop: "20px" }}>
          <h3>Gönderiler</h3>
          {postsStatus === "loading" ? (
            <p>Gönderiler yükleniyor...</p>
          ) : posts.length === 0 ? (
            <p>Henüz gönderi yok.</p>
          ) : (
            posts.map(post => <PostCard key={post._id} post={post} theme={theme} />)
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}
