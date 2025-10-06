'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import { MdOutlinePerson } from "react-icons/md";
import { TiHeart } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { updatePost, deletePost, likePost, getLikes } from "../redux/slices/postsSlice";
import ProtectedPage from "./ProtectedPage";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";

function PostCard({ post, theme, currentUserId }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newTags, setNewTags] = useState(Array.isArray(post.tags) ? post.tags.join(", ") : post.tags);
  const [newImage, setNewImage] = useState(null);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [liked, setLiked] = useState(Array.isArray(post.likedByUsers) && post.likedByUsers.includes(currentUserId));
  const [loadingLikes, setLoadingLikes] = useState(false);

  const dispatch = useDispatch();
  const hasImage = !!post?.image;
  const route = useRouter();

  // Sayfa yüklendiğinde like bilgisini çek
  useEffect(() => {
    fetchLikes();
  }, [post._id, currentUserId]);

  // Direkt axios ile like bilgisini çek (Redux state sorununu bypass et)
  const fetchLikes = async () => {
    try {
      setLoadingLikes(true);
      
      // Redux yerine direkt API'ye istek at
      const response = await axios.get(`http://localhost:5000/api/posts/${post._id}/likes`);
      const data = response.data;
      
      console.log("Like bilgisi:", data);
      
      setLikesCount(data.likesCount || 0);
      setLiked(Array.isArray(data.likedByUsers) && data.likedByUsers.includes(currentUserId));
    } catch (error) {
      console.error("Like bilgisi çekilemedi:", error);
    } finally {
      setLoadingLikes(false);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    // Optimistic UI update
    const previousLiked = liked;
    const previousLikesCount = likesCount;
    setLiked(!previousLiked);
    setLikesCount(previousLiked ? previousLikesCount - 1 : previousLikesCount + 1);

    try {
      // Redux yerine direkt API'ye istek at
      await axios.post(`http://localhost:5000/api/posts/${post._id}/like`);
      
      // Like işleminden sonra güncel like bilgisini çek
      await fetchLikes();
      
    } catch (err) {
      console.error(err);
      // Geri al
      setLiked(previousLiked);
      setLikesCount(previousLikesCount);
      alert("Like işlemi başarısız oldu");
    }
  };

  const postDetail = (e) => {
    e.preventDefault();
    route.push(`/posts/${post._id}`);
  };

  const handleDelete = (postId) => {
    if (confirm("Postu silmek istediğinizden emin misiniz?")) {
      dispatch(deletePost(postId)).unwrap().catch(err => alert(err.message || "Post silinirken hata oluştu"));
      setOpenMenu(false);
    }
  };

  const handleUpdate = async () => {
    if (!newTitle || !newContent) return alert("Başlık ve içerik boş olamaz");
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("content", newContent);
      formData.append("tags", Array.isArray(newTags) ? newTags.join(",") : newTags);
      if (newImage) formData.append("image", newImage);

      await dispatch(updatePost({ postId: post._id, formData })).unwrap();
      setIsUpdating(false);
      setNewImage(null);
      setOpenMenu(false);
    } catch (err) {
      alert(err.message || "Güncelleme başarısız");
    }
  };

  return (
    <div className="cursor-pointer" style={{ marginBottom: "16px", width: "500px", marginLeft: '20px' }}>
      {/* Üst Bilgi */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MdOutlinePerson size={30} style={{ color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} />
          <p style={{ fontSize: "16px", marginTop: "4px" }}>{post.author.username}</p>
        </div>

        <ProtectedPage>
          <div style={{ position: "relative" }}>
            <BsThreeDots size={25} style={{ cursor: "pointer", color: theme === "dark" ? "#e0e7ff" : "#6b21a8" }} onClick={() => setOpenMenu(!openMenu)} />
            {openMenu && (
              <div style={{ position: "absolute", right: 0, marginTop: "8px", width: "120px", borderRadius: "8px", fontSize: "14px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", zIndex: 20, background: theme === "dark" ? "#1e293b" : "#c4b5fd", border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}` }}>
                <p style={{ cursor: "pointer", padding: "8px 12px" }} onClick={() => { setIsUpdating(true); setOpenMenu(false); }}>Güncelle</p>
                <p style={{ cursor: "pointer", padding: "8px 12px", color: theme === "dark" ? "#f87171" : "#dc2626" }} onClick={() => handleDelete(post._id)}>Sil</p>
              </div>
            )}
          </div>
        </ProtectedPage>
      </div>

      {/* Post Kart */}
      <motion.div onClick={postDetail} key={post._id} className="relative flex rounded-2xl shadow-md gap-4 transition-shadow duration-300" style={{ backgroundColor: theme === "dark" ? "#7008e7" : "#8e51ff", width: "500px", height: "300px", padding: "16px", display: "flex", alignItems: "center", justifyContent: hasImage ? "flex-start" : "center", position: "relative" }} whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.8)" }}>
        {hasImage && (
          <div style={{ flexShrink: 0 }}>
            <Image src={`http://localhost:5000/${post.image.replace(/\\/g, "/")}`} alt={post.title} width={200} height={250} style={{ borderRadius: "8px" }} className="rounded object-cover max-h-[250px] w-auto" />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, marginLeft: hasImage ? "16px" : "0", textAlign: hasImage ? "left" : "center" }}>
          <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</p>
          <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.content}</p>
          <p style={{ color: theme === "dark" ? "lightGray" : "#18191a" }}>{post.tags.length ? "#" : null}{Array.isArray(post.tags) ? post.tags.join(" #") : post.tags}</p>
        </div>

        {/* Like Button */}
        <div style={{ position: "absolute", bottom: "12px", right: "12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <motion.div whileTap={{ scale: 1.3 }} className="flex items-center gap-2 cursor-pointer" onClick={handleLike} style={{ padding: "4px 8px", borderRadius: "20px", backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", transition: "all 0.2s ease" }}>
            <TiHeart size={28} style={{ 
              color: liked ? "#9f1239" : (theme === "dark" ? "white" : "white"), 
              transition: "color 0.2s ease",
              fill: liked ? "#ff0000" : "none",
            }} />
            <span style={{ 
              color: liked ? "#9f1239" : (theme === "dark" ? "white" : "white"), 
              fontSize: "14px", 
              fontWeight: "bold", 
              minWidth: "20px", 
              textAlign: "center" 
            }}>
              {loadingLikes ? "..." : likesCount}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Update Modal */}
      {isUpdating && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        }}>
          <div style={{
            backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
            padding: "24px",
            borderRadius: "12px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "relative",
          }}>
            <AiOutlineClose
              size={24}
              style={{ position: "absolute", top: "12px", right: "12px", cursor: "pointer" }}
              onClick={() => { setIsUpdating(false); setNewImage(null); }}
            />
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Başlık"
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="İçerik"
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", minHeight: "100px" }}
            />
            <textarea
              value={newTags}
              onChange={e => setNewTags(e.target.value)}
              placeholder="Tag'ler (virgülle ayırın)"
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => setNewImage(e.target.files[0])}
              style={{ marginTop: "8px" }}
            />
            <button
              onClick={handleUpdate}
              style={{ padding: "8px 12px", background: "#4f46e5", color: "#fff", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Kaydet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard;