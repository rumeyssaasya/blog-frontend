'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getPostById } from "../../redux/slices/postsSlice";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { theme } = useTheme(); // light / dark
  const postId = params.id;
  const post = useSelector(state => state.posts.singlePost);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
    }
  }, [dispatch, postId]);

  if (!post) return <p>Post yükleniyor...</p>;

  return (
    <div
      style={{
        margin: "2% 10%",
        borderRadius: "12px",
        backgroundColor: theme === "dark" ? "#4c1d95" : "#c4b5fd",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px"
      }}
    >
      {/* Overlay */}


      {/* Başlık */}
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 1
        }}
      >
        {post.title}
      </h1>

      {/* İçerik */}
      <p
        style={{
          fontSize: "24px",
          lineHeight: "1.6",
          maxWidth: "90%",
          zIndex: 1
        }}
      >
        {post.content}
      </p>

      

            {post?.image ? 
      <Image
              src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
              alt={post.title}
              width={400}
              height={400}
              style={{ borderRadius: "8px" }}
              className="rounded  max-w-[400px]"
        /> : null
      }

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <p style={{ color: theme === "dark" ? "lightGray" : "#18191a", marginBottom: "12px" , fontSize: "24px",
          lineHeight: "1.6", color:"white"}}>
          {"#" + post.tags.join(" #")}
        </p>
      )}

      {/* Yazar */}
      {post.author?.username && (
        <p
          style={{
            alignSelf: "flex-end",
            fontSize: "18px",
            fontStyle: "italic",
            zIndex: 1
          }}
        >
          {`Yazar: ${post.author.username}`}
        </p>
      )}
    </div>
  );
}
