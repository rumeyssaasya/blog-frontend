'use client';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import axios from "axios";
import ProtectedPage from "./ProtectedPage";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const singlePost = useSelector(state => state.posts.singlePost);
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    if (singlePost?._id) fetchComments();
  }, [singlePost]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${singlePost._id}/comments`);
      // Yeni yorumlar altta gözüksün
      setComments([...res.data].reverse());
    } catch (err) {
      console.error("Yorumlar yüklenirken hata:", err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/posts/${singlePost._id}/comments`, {
        content: commentText,
        userId: currentUser?._id
      });
      setCommentText("");
      fetchComments();
    } catch (err) {
      console.error("Yorum eklenirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async (parentCommentId) => {
    if (!replyText.trim()) return;
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/posts/${singlePost._id}/comments`, {
        content: replyText,
        userId: currentUser?._id,
        parentCommentId
      });
      setReplyText("");
      setReplyingTo(null);
      fetchComments();
    } catch (err) {
      console.error("Yanıt eklenirken hata:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!singlePost) return <p>Post yükleniyor...</p>;

  return (
    <ProtectedPage>
    <div style={{ margin: "2% 10%" }}>
      {/* POST */}
      <div style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h1 style={{
          fontSize: "2rem",
          color: theme === "dark" ? "white" : "#18191a"
        }}>{singlePost.title}</h1>
        <p style={{
          color: theme === "dark" ? "#d1d5db" : "#4b5563"
        }}>{singlePost.content}</p>
      </div>

      {/* YORUMLAR */}
      <div>
        <h3 style={{ color: theme === "dark" ? "white" : "#18191a" }}>
          Yorumlar ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>
            Henüz yorum yapılmamış.
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment._id} style={{
              backgroundColor: theme === "dark" ? "#1f2937" : "white",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px"
            }}>
              <strong style={{ color: theme === "dark" ? "white" : "#18191a" }}>
                {comment.userId?.username}
              </strong>
              <p style={{ color: theme === "dark" ? "#d1d5db" : "#4b5563" }}>
                {comment.content}
              </p>

              <button
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontSize: "0.875rem"
                }}
              >
                Yanıtla
              </button>

              {replyingTo === comment._id && (
                <div style={{ marginTop: "10px" }}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Yanıtınızı yazın..."
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      padding: "8px",
                      borderRadius: "4px",
                      marginBottom: "8px"
                    }}
                  />
                  <button
                    onClick={() => handleAddReply(comment._id)}
                    disabled={loading}
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      marginRight: "8px"
                    }}
                  >
                    {loading ? "Gönderiliyor..." : "Yanıtla"}
                  </button>
                  <button
                    onClick={() => { setReplyingTo(null); setReplyText(""); }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6b7280",
                      cursor: "pointer"
                    }}
                  >
                    İptal
                  </button>
                </div>
              )}

              {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  {comment.replies.map(reply => (
                    <div key={reply._id} style={{
                      backgroundColor: theme === "dark" ? "#111827" : "#f9fafb",
                      padding: "10px",
                      borderRadius: "6px",
                      marginBottom: "8px"
                    }}>
                      <strong style={{ color: theme === "dark" ? "white" : "#18191a" }}>
                        {reply.userId?.username}
                      </strong>
                      <p style={{
                        color: theme === "dark" ? "#d1d5db" : "#4b5563",
                        fontSize: "0.875rem"
                      }}>
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* YORUM EKLEME EN ALTA */}
      <div style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "white",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "25px"
      }}>
        <h3 style={{ color: theme === "dark" ? "white" : "#18191a" }}>
          Yorum Yap
        </h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Yorumunuzu yazın..."
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px"
          }}
        />
        <button
          onClick={handleAddComment}
          disabled={loading}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px"
          }}
        >
          {loading ? "Gönderiliyor..." : "Yorum Yap"}
        </button>
      </div>
    </div>
    </ProtectedPage>
  );
}
