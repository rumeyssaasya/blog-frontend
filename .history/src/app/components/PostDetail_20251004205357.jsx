'use client';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyProfile() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const singlePost = useSelector(state => state.posts.singlePost);
  const currentUser = useSelector(state => state.auth.user); // Mevcut kullanıcı

  // Yorumları getir
  useEffect(() => {
    if (singlePost?._id) {
      fetchComments();
    }
  }, [singlePost]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${singlePost._id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Yorumlar yüklenirken hata:", error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/posts/${singlePost._id}/comments`, {
        content: commentText,
        userId: currentUser?._id // Kullanıcı ID'si
      });
      
      setCommentText("");
      fetchComments(); // Yorumları yenile
    } catch (error) {
      console.error("Yorum eklenirken hata:", error);
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
        parentCommentId: parentCommentId
      });
      
      setReplyText("");
      setReplyingTo(null);
      fetchComments(); // Yorumları yenile
    } catch (error) {
      console.error("Yanıt eklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!singlePost) return <p>Post yükleniyor...</p>;

  return (
    <div style={{ margin: "2% 10%" }}>
      {/* POST İÇERİĞİ */}
      <div style={{ 
        backgroundColor: theme === "dark" ? "#1f2937" : "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h1 style={{ 
          fontSize: "2rem", 
          marginBottom: "10px",
          color: theme === "dark" ? "white" : "#18191a"
        }}>
          {singlePost.title}
        </h1>
        
        <p style={{ 
          fontSize: "1.1rem",
          color: theme === "dark" ? "#d1d5db" : "#4b5563",
          marginBottom: "15px"
        }}>
          {singlePost.content}
        </p>
        
        {Array.isArray(singlePost.tags) && singlePost.tags.length > 0 && (
          <p style={{ 
            color: theme === "dark" ? "#9ca3af" : "#6b7280", 
            marginBottom: "12px",
            fontStyle: "italic"
          }}>
            {"#" + singlePost.tags.join(" #")}
          </p>
        )}
        
        {singlePost.image && (
          <img 
            src={`http://localhost:5000/${singlePost.image.replace(/\\/g, "/")}`} 
            alt={singlePost.title}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          />
        )}
      </div>

      {/* YORUM EKLEME */}
      <div style={{ 
        backgroundColor: theme === "dark" ? "#1f2937" : "white",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h3 style={{ 
          color: theme === "dark" ? "white" : "#18191a",
          marginBottom: "15px"
        }}>
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
            border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
            borderRadius: "4px",
            backgroundColor: theme === "dark" ? "#374151" : "white",
            color: theme === "dark" ? "white" : "#18191a",
            marginBottom: "10px",
            resize: "vertical"
          }}
        />
        
        <button
          onClick={handleAddComment}
          disabled={loading || !commentText.trim()}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Gönderiliyor..." : "Yorum Yap"}
        </button>
      </div>

      {/* YORUM LİSTESİ */}
      <div>
        <h3 style={{ 
          color: theme === "dark" ? "white" : "#18191a",
          marginBottom: "15px"
        }}>
          Yorumlar ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <p style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}>
            Henüz yorum yapılmamış.
          </p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment._id} style={{
                backgroundColor: theme === "dark" ? "#1f2937" : "white",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`
              }}>
                {/* ANA YORUM */}
                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "10px" }}>
                  <img
                    src={comment.userId?.profilePic ? `http://localhost:5000/${comment.userId.profilePic}` : '/default-avatar.png'}
                    alt={comment.userId?.username}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      marginRight: "10px"
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      alignItems: "flex-start"
                    }}>
                      <div>
                        <strong style={{ color: theme === "dark" ? "white" : "#18191a" }}>
                          {comment.userId?.username}
                        </strong>
                        <p style={{ 
                          color: theme === "dark" ? "#d1d5db" : "#4b5563",
                          margin: "5px 0"
                        }}>
                          {comment.content}
                        </p>
                      </div>
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
                    </div>

                    {/* YANIT YAZMA ALANI */}
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
                            border: `1px solid ${theme === "dark" ? "#374151" : "#d1d5db"}`,
                            borderRadius: "4px",
                            backgroundColor: theme === "dark" ? "#374151" : "white",
                            color: theme === "dark" ? "white" : "#18191a",
                            marginBottom: "8px",
                            resize: "vertical"
                          }}
                        />
                        <div>
                          <button
                            onClick={() => handleAddReply(comment._id)}
                            disabled={loading || !replyText.trim()}
                            style={{
                              backgroundColor: "#3b82f6",
                              color: "white",
                              padding: "6px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: loading ? "not-allowed" : "pointer",
                              opacity: loading ? 0.6 : 1,
                              marginRight: "8px"
                            }}
                          >
                            {loading ? "Gönderiliyor..." : "Yanıtla"}
                          </button>
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
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
                      </div>
                    )}

                    {/* YANITLAR */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                        {comment.replies.map((reply) => (
                          <div key={reply._id} style={{
                            backgroundColor: theme === "dark" ? "#111827" : "#f9fafb",
                            padding: "10px",
                            borderRadius: "6px",
                            marginBottom: "8px"
                          }}>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                              <img
                                src={reply.userId?.profilePic ? `http://localhost:5000/${reply.userId.profilePic}` : '/default-avatar.png'}
                                alt={reply.userId?.username}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  marginRight: "8px"
                                }}
                              />
                              <div>
                                <strong style={{ 
                                  color: theme === "dark" ? "white" : "#18191a",
                                  fontSize: "0.875rem"
                                }}>
                                  {reply.userId?.username}
                                </strong>
                                <p style={{ 
                                  color: theme === "dark" ? "#d1d5db" : "#4b5563",
                                  margin: "2px 0",
                                  fontSize: "0.875rem"
                                }}>
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}