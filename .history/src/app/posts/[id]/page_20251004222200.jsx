'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getPostById, getLikes, toggleLike } from "../../redux/slices/postsSlice";
import { useTheme } from "next-themes";
import Image from "next/image";
import { TiHeart } from "react-icons/ti";

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { theme } = useTheme();
  const postId = params.id;
  const post = useSelector(state => state.posts.singlePost);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const username = useSelector(state => state.auth?.user?.username);

  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId));
      dispatch(getLikes(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likesCount || 0);
      setIsLiked(post.likedByUsers?.includes(username));
    }
  }, [post, username]);

  const handleLike = () => {
    dispatch(toggleLike(postId)).then(() => {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    });
  };

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

      {post?.image && (
        <Image
          src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
          alt={post.title}
          width={400}
          height={400}
          style={{ borderRadius: "8px", margin: "10px" }}
          className="rounded max-w-[400px]"
        />
      )}

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <p
          style={{
            color: "white",
            marginBottom: "12px",
            fontSize: "24px",
            lineHeight: "1.6"
          }}
        >
          {"#" + post.tags.join(" #")}
        </p>
      )}

      {/* Beğeni butonu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          marginTop: "10px",
          alignSelf: "flex-start"
        }}
        onClick={handleLike}
      >
        <TiHeart
          size={34}
          color={isLiked ? "red" : theme === "dark" ? "#d8b4fe" : "#4c1d95"}
        />
        <span style={{ fontSize: "20px" }}>{likeCount}</span>
      </div>

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
