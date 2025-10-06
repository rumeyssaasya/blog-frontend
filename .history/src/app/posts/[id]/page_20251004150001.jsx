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
            overflow: "hidden",
            display:"flex",
            alignItems: "center",
            justifyContent:"center"
    }}
    >
    {/* Overlay */}
    <div
        style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        }}
    />

    {/* Başlık */}
    <h1
        style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "40px",
        fontWeight: "bold",
        zIndex: 1,
        textAlign: "center",
        }}
    >
        {post.title}
    </h1>

    {/* İçerik */}
    <p
        style={{
        bottom: "20px",
        left: "20px",
        fontSize: "30px",
        lineHeight: "1.6",
        zIndex: 1,
        maxWidth: "90%",
        }}
    >
        {post.content}
    </p>
    </div>


  );
}
