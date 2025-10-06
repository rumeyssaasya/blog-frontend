'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getPostById } from "../../redux/slices/postsSlice";

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.id; // URL'den id alıyoruz
  const post = useSelector(state => state.posts.singlePost);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId)); // tek postu Redux'tan alıyoruz
    }
  }, [dispatch, postId]);

  if (!post) return <p>Post yükleniyor...</p>;

  return (
    <div
  style={{
    margin: "2% 10%",
    maxWidth: "800px",
    height: "500px",
    borderRadius: "12px",
    backgroundImage: post.image
      ? `url(http://localhost:5000/${post.image.replace(/\\/g, "/")})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "24px",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      borderRadius: "12px",
    }}
  />
  
  {/* İçerik */}
  <div style={{ position: "relative", zIndex: 1 }}>
    <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>
      {post.title}
    </h1>
    <p style={{ fontSize: "18px", lineHeight: "1.6" }}>{post.content}</p>
  </div>
</div>

  );
}
