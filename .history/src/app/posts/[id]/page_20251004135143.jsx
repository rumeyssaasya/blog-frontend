'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import UserProfile from "../../components/UserProfile";
import { fetchUserPosts } from "@/app/redux/slices/postsSlice";

export default function PostPage() {
  const { id } = useParams(); // URL'den userId
  const dispatch = useDispatch();
  const { items: userPosts, status, error } = useSelector(state => state.posts);
  const theme = useTheme().theme;

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPosts({ userId: id }));
    }
  }, [dispatch, id]);

  return (
    <div style={{ padding: "20px" }}>
      <UserProfile userId={id} />

      {status === "loading" && <p>Yükleniyor...</p>}
      {status === "failed" && <p style={{ color: "red" }}>Hata: {error}</p>}
      {status === "succeeded" && userPosts.length === 0 && <p>Henüz gönderi yok.</p>}

      {status === "succeeded" && userPosts.length > 0 && (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))" }}>
          {userPosts.map(post => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}
