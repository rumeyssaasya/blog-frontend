'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  addComment,
  addReply,
  deleteComment,
  deleteReply,
} from "../redux/slices/commentsSlice";
import ProtectedPage from "./ProtectedPage";

export default function MyProfile() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comments);

  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const singlePost = JSON.parse(localStorage.getItem("singlePost") || "{}");

  // Client-side user yükleme
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // Yorumları yükle
  useEffect(() => {
    if (singlePost?._id) dispatch(getComments(singlePost._id));
  }, [singlePost, dispatch]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !currentUser) return alert("Yorum eklemek için giriş yapmalısınız.");
    dispatch(addComment({ postId: singlePost._id, content: commentText }));
    setCommentText("");
  };

  const handleAddReply = async (parentCommentId) => {
    if (!replyText.trim() || !currentUser) return alert("Yanıt eklemek için giriş yapmalısınız.");
    dispatch(addReply({ commentId: parentCommentId, content: replyText }));
    setReplyText("");
    setReplyingTo(null);
  };

  const handleDeleteComment = (commentId) => {
    if (!window.confirm("Yorumu silmek istediğinize emin misiniz?")) return;
    dispatch(deleteComment(commentId));
  };

  const handleDeleteReply = (commentId, replyId) => {
    if (!window.confirm("Yanıtı silmek istediğinize emin misiniz?")) return;
    dispatch(deleteReply({ commentId, replyId }));
  };

  if (!singlePost?._id) return <p>Post yükleniyor...</p>;

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
          <h1 style={{ fontSize: "2rem", color: theme === "dark" ? "white" : "#18191a" }}>
            {singlePost.title}
          </h1>
          <p style={{ color: theme === "dark" ? "#d1d5db" : "#4b5563" }}>
            {singlePost.content}
          </p>
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
                  {comment.author?.username || "Anonim"}
                </strong>
                <p style={{ color: theme === "dark" ? "#d1d5db" : "#4b5563" }}>
                  {comment.content}
                </p>

                {currentUser?._id === comment.author?._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", marginRight: "10px" }}
                  >
                    Sil
                  </button>
                )}

                <button
                  onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                  style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "0.875rem" }}
                >
                  Yanıtla
                </button>

                {/* Reply Form */}
                {replyingTo === comment._id && (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Yanıtınızı yazın..."
                      style={{ width: "100%", minHeight: "60px", padding: "8px", borderRadius: "4px", marginBottom: "8px" }}
                    />
                    <button
                      onClick={() => handleAddReply(comment._id)}
                      disabled={loading}
                      style={{ backgroundColor: "#3b82f6", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", marginRight: "8px" }}
                    >
                      {loading ? "Gönderiliyor..." : "Yanıtla"}
                    </button>
                    <button
                      onClick={() => { setReplyingTo(null); setReplyText(""); }}
                      style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}
                    >
                      İptal
                    </button>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                    {comment.replies.map(reply => (
                      <div key={reply._id} style={{ padding: "10px", borderRadius: "6px", backgroundColor: theme === "dark" ? "#111827" : "#f9fafb", marginBottom: "8px" }}>
                        <strong style={{ color: theme === "dark" ? "white" : "#18191a" }}>
                          {reply.author || "Anonim"}
                        </strong>
                        <p style={{ color: theme === "dark" ? "#d1d5db" : "#4b5563", fontSize: "0.875rem" }}>
                          {reply.content}
                        </p>
                        {currentUser?.username === reply.author && (
                          <button
                            onClick={() => handleDeleteReply(comment._id, reply._id)}
                            style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }}
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* YORUM EKLEME */}
        <div style={{ backgroundColor: theme === "dark" ? "#1f2937" : "white", padding: "20px", borderRadius: "8px", marginTop: "25px" }}>
          <h3 style={{ color: theme === "dark" ? "white" : "#18191a" }}>Yorum Yap</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Yorumunuzu yazın..."
            style={{ width: "100%", minHeight: "80px", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}
          />
          <button
            onClick={handleAddComment}
            disabled={loading || !currentUser}
            style={{ backgroundColor: "#3b82f6", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}
          >
            {loading ? "Gönderiliyor..." : "Yorum Yap"}
          </button>
          {!currentUser && <p style={{ color: "red", marginTop: "8px" }}>Yorum eklemek için giriş yapmalısınız.</p>}
        </div>
      </div>
    </ProtectedPage>
  );
}
