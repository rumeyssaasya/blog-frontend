'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import { MdOutlinePerson, MdModeComment } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import ProtectedPage from "./ProtectedPage";
import { updatePost, deletePost, likePost } from "../redux/slices/postsSlice";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";

function PostCard({ post, theme, currentUserId }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newTags, setNewTags] = useState(Array.isArray(post.tags) ? post.tags.join(", ") : post.tags);
  const [newImage, setNewImage] = useState(null);
  const dispatch = useDispatch();
  const route = useRouter();

  const hasImage = !!post?.image;
  const [liked, setLiked] = useState(post.likes.includes(currentUserId));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = async (e) => {
    e.stopPropagation(); // postDetail click'ini engelle
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    await dispatch(likePost(post._id));
  };

  const postDetail = () => route.push(`/posts/${post._id}`);

  return (
    <motion.div
      key={post._id}
      onClick={postDetail}
      className="relative flex rounded-2xl shadow-md gap-4 transition-shadow duration-300 cursor-pointer"
      style={{
        backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff",
        width: "500px",
        height: "300px",
        padding: "16px",
        alignItems: "center",
        justifyContent: hasImage ? "flex-start" : "center",
        position: "relative"
      }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}
    >
      {hasImage && (
        <div style={{ flexShrink: 0 }}>
          <Image
            src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`}
            alt={post.title}
            width={200}
            height={250}
            style={{ borderRadius: "8px" }}
            className="rounded object-cover max-h-[250px] w-auto"
          />
        </div>
      )}

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        marginLeft: hasImage ? "16px" : "0",
        textAlign: hasImage ? "left" : "center"
      }}>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</p>
        <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.content}</p>
        <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>
          {post.tags.length ? "#" : null}{Array.isArray(post.tags) ? post.tags.join(" #") : post.tags}
        </p>
      </div>

      {/* Beğeni & Yorum */}
      <div style={{
        position: "absolute",
        bottom: "12px",
        right: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}>
        <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
          <TiHeart size={28} style={{ color: liked ? "red" : "white" }} />
          <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{likesCount}</span>
        </motion.div>
        <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-1 cursor-pointer">
          <MdModeComment size={24} style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a" }} />
          <span style={{ color: theme === "dark" ? "#e0e0e0" : "#18191a", fontSize: "14px" }}>{post.comments?.length || 0}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PostCard;
