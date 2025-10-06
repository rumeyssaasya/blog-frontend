"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/redux/slices/postsSlice";
import {
  getComments,
  deleteComment,
  updateComment,
} from "@/redux/slices/commentsSlice";
import ProtectedAdmin from "@/components/ProtectedAdmin";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Postlar ve yorumlar yükleniyor
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, [dispatch]);

  // Yalnızca seçili postun yorumlarını filtrele
  const postComments = useMemo(
    () =>
      comments.filter((c) => {
        if (!c.post) return false;
        const postId = typeof c.post === "object" ? c.post._id : c.post;
        return postId === selectedPostId;
      }),
    [comments, selectedPostId]
  );

  // Yorum silme
  const handleDelete = (id) => {
    if (window.confirm("Yorumu silmek istediğine emin misin?")) {
      dispatch(deleteComment(id));
    }
  };

  // Yorum düzenleme
  const handleEdit = (id, currentContent) => {
    setEditingCommentId(id);
    setEditedContent(currentContent);
  };

  // Düzenlemeyi kaydet
  const handleSave = (id) => {
    if (!editedContent.trim()) return;
    dispatch(updateComment({ id, content: editedContent }));
    setEditingCommentId(null);
    setEditedContent("");
  };

  return (
    <ProtectedAdmin>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Admin Paneli
        </h2>

        {/* Gönderi Listesi */}
        {!selectedPostId && (
          <div>
            <h3 style={{ marginBottom: "12px" }}>Gönderiler</h3>
            {posts.length === 0 ? (
              <p>Henüz gönderi yok.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => {
                    setSelectedPostId(post._id);
                    setEditingCommentId(null);
                  }}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <h4 style={{ margin: "0 0 8px 0" }}>{post.title}</h4>
                  <p style={{ margin: "0", color: "#666" }}>
                    {post.content?.slice(0, 120)}...
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Seçilen Gönderinin Yorumları */}
        {selectedPostId && (
          <div>
            <button
              onClick={() => setSelectedPostId(null)}
              style={{
                marginBottom: "16px",
                background: "#222",
                color: "#fff",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ← Gönderilere Dön
            </button>

            <h3 style={{ marginBottom: "12px" }}>Yorumlar</h3>

            {postComments.length === 0 ? (
              <p>Bu gönderiye henüz yorum yapılmamış.</p>
            ) : (
              postComments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <p style={{ marginBottom: "6px", fontWeight: "500" }}>
                    {comment.author?.username || "Anonim"}
                  </p>

                  {editingCommentId === comment._id ? (
                    <>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        style={{
                          width: "100%",
                          height: "60px",
                          borderRadius: "6px",
                          padding: "6px",
                          marginBottom: "8px",
                        }}
                      />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleSave(comment._id)}
                          style={{
                            background: "#198754",
                            color: "#fff",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Kaydet
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          style={{
                            background: "#6c757d",
                            color: "#fff",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          İptal
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ marginBottom: "8px" }}>{comment.content}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() =>
                            handleEdit(comment._id, comment.content)
                          }
                          style={{
                            background: "#0d6efd",
                            color: "#fff",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          style={{
                            background: "#dc3545",
                            color: "#fff",
                            border: "none",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Sil
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </ProtectedAdmin>
  );
}
