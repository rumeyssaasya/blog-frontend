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
    <div style={{ margin: "2% 10%", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>{post.title}</h1>
      {post.image && (
        <img
          src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
          alt={post.title}
          style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "12px", marginBottom: "16px" }}
        />
      )}
      <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}>{post.content}</p>
    </div>
  );
}
