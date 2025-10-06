"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, addComment, deleteComment, addReply, deleteReply } from "../redux/slices/commentsSlice";

export default function CommentsSection({ postId }) {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector(state => state.comments);
  const { user } = useSelector(state => state.auth); // giriş yapmış kullanıcı
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (postId) dispatch(getComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    dispatch(addComment({ postId, content: newComment }));
    setNewComment("");
  };

  const handleAddReply = (commentId) => {
    if (!replyContent.trim()) return;
    dispatch(addReply({ commentId, content: replyContent }));
    setReplyContent("");
    setReplyingTo(null);
  };

  return (
    <div style={{ marginTop: "30px", backgroundColor: "#f9f9f9", borderRadius: "12px", padding: "16px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Yorumlar</h2>

      {/* Yeni yorum */}
      {user ? (
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Yorum ekle..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleAddComment}
            style={{ marginLeft: "8px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "#6d28d9", color: "#fff" }}
          >
            Gönder
          </button>
        </div>
      ) : (
        <p>Yorum eklemek için giriş yapmalısınız.</p>
      )}

      {loading && <p>Yükleniyor...</p>}
      {!loading && comments.length === 0 && <p>Henüz yorum yok.</p>}
       
       {comments.map((comment) => (
  <div key={comment._id} style={{ marginBottom: "16px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
    <p>
      <strong>{user?.username}:</strong> {comment.content} 
    </p>
    <div style={{ marginTop: "8px" }}>
      {user && (
        <button onClick={() => setReplyingTo(comment._id)} style={{ marginRight: "8px", color: "#6d28d9" }}>
          Yanıtla
        </button>
      )}
      
        {user && comment.user && comment.user._id.toString() === user._id && (
        <button
            onClick={() => dispatch(deleteComment(comment._id))}
            style={{ color: "blue" }}
        >
            Sil
        </button>
        )}
    </div>

    {/* Yanıt formu */}
    {replyingTo === comment._id && user && (
      <div style={{ marginTop: "10px", display: "flex" }}>
        <input
          type="text"
          placeholder="Yanıt yaz..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          onClick={() => handleAddReply(comment._id)}
          style={{ marginLeft: "8px", padding: "8px 12px", borderRadius: "8px", backgroundColor: "#6d28d9", color: "#fff" }}
        >
          Gönder
        </button>
      </div>
    )}

    {/* Yanıtlar */}
    {comment.replies?.length > 0 && (
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
        {comment.replies.map(reply => (
          <div key={reply._id} style={{ marginBottom: "6px" }}>
            <p>
              <strong>{user?.username}:</strong> {reply.content} 
            </p>
            {user && reply.user?._id === user._id && ( // sadece reply sahibi görebilir
              <button
                onClick={() => dispatch(deleteReply({ commentId: comment._id, replyId: reply._id }))}
                style={{ color: "crimson" }}
              >
                Sil
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
))}
    </div>
  );
}
