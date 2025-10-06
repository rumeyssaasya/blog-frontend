'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllUsers, fetchAllPosts, fetchAllComments,
  deleteUserByAdmin, deletePostByAdmin, deleteCommentByAdmin,
  createPostByAdmin, updatePostByAdmin, updateUserByAdmin
} from '../redux/slices/adminSlice';
import ProtectedAdmin from '../components/ProtectedAdmin';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { token, users, posts, comments } = useSelector(state => state.admin);

  const [activeTab, setActiveTab] = useState('users');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const selectedPost = useMemo(() => posts.find(p => p._id === selectedPostId), [selectedPostId, posts]);
  const postComments = useMemo(() =>
  comments.filter(c => {
    if (!c.post) return false;
    const postId = typeof c.post === 'object' ? c.post._id : c.post;
    return postId === selectedPostId;
  }),
  [comments, selectedPostId]
);
  const selectedComment = useMemo(() => comments.find(c => c._id === selectedCommentId), [selectedCommentId, comments]);

  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', image: null });
  const [editPost, setEditPost] = useState({ id: null, title: '', content: '', tags: '', image: null, author: null });
  const [editUser, setEditUser] = useState({ id: null, username: '', email: '', bio: '' });
  const [editComment, setEditComment] = useState({ id: null, content: '' });

  const commentDetailRef = useRef(null);
  const postDetailRef = useRef(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
      dispatch(fetchAllComments());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (selectedCommentId && commentDetailRef.current) {
      commentDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCommentId]);

  useEffect(() => {
    if (selectedPostId && postDetailRef.current) {
      postDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedPostId]);

  const handleUpdateUser = () => {
    if (editUser.id) {
      dispatch(updateUserByAdmin({
        id: editUser.id,
        data: { username: editUser.username, email: editUser.email, bio: editUser.bio }
      }));
      setEditUser({ id: null, username: '', email: '', bio: '' });
    }
  };

  const handleUpdatePost = () => {
    if (editPost.id) {
      dispatch(updatePostByAdmin({
        id: editPost.id,
        data: { title: editPost.title, content: editPost.content, tags: editPost.tags, image: editPost.image, author: editPost.author }
      }));
      setEditPost({ id: null, title: '', content: '', tags: '', image: null, author: null });
    }
  };

  if (!token) return null;

  const containerStyle = { padding: '20px', margin: '20px' };
  const sectionStyle = { padding: '20px', marginBottom: '24px', borderRadius: '16px', backgroundColor: '#EDE9FE', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' };
  const cardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', marginBottom: '12px', borderRadius: '12px', backgroundColor: '#DDD6FE', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' };
  const inputStyle = { padding: '8px', borderRadius: '8px', border: '1px solid #C4B5FD', flex: 1 };
  const buttonStyle = { padding: '8px 16px', borderRadius: '8px', fontWeight: '600', color: 'white', cursor: 'pointer' };
  const tabButtonStyle = (active) => ({
    padding: '10px 20px', borderRadius: '12px', fontWeight: '600', color: active ? 'white' : '#4C1D95',
    backgroundColor: active ? '#7C3AED' : '#DDD6FE', cursor: 'pointer', boxShadow: active ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'
  });
  const tabContainerStyle = { display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' };

  return (
    <ProtectedAdmin>
      <div style={tabContainerStyle}>
        {['users', 'posts', 'comments'].map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSelectedPostId(null); setSelectedCommentId(null); }} style={tabButtonStyle(activeTab === tab)}>{tab.toUpperCase()}</button>
        ))}
      </div>

      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '700', color: '#5B21B6', marginBottom: '24px' }}>Admin Panel</h1>

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#6D28D9' }}>Kullanıcılar</h2>
            {editUser.id && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <input value={editUser.username} onChange={e => setEditUser({ ...editUser, username: e.target.value })} placeholder="Username" style={inputStyle} />
                <input value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} placeholder="Email" style={inputStyle} />
                <input value={editUser.bio} onChange={e => setEditUser({ ...editUser, bio: e.target.value })} placeholder="Bio" style={inputStyle} />
                <button onClick={handleUpdateUser} style={{ ...buttonStyle, backgroundColor: '#7C3AED' }}>Kaydet</button>
                <button onClick={() => setEditUser({ id: null, username: '', email: '', bio: '' })} style={{ ...buttonStyle, backgroundColor: '#9CA3AF' }}>İptal</button>
              </div>
            )}
            {users.map(user => (
              <div key={user._id} style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span><strong>Kullanıcı Adı:</strong> {user.username}</span>
                  <span><strong>E-mail:</strong> {user.email}</span>
                  <span><strong>Bio:</strong> {user.bio || "Bilgi girilmemiş."}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setEditUser({ id: user._id, username: user.username, email: user.email, bio: user.bio })} style={{ ...buttonStyle, backgroundColor: '#3B82F6' }}>Düzenle</button>
                  <button onClick={() => dispatch(deleteUserByAdmin(user._id))} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* POSTS TAB */}
        {activeTab === 'posts' && (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#6D28D9' }}>Postlar</h2>

            {/* Create Post */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <input value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Başlık" style={inputStyle} />
              <input value={newPost.content} onChange={e => setNewPost({ ...newPost, content: e.target.value })} placeholder="İçerik" style={inputStyle} />
              <input value={newPost.tags} onChange={e => setNewPost({ ...newPost, tags: e.target.value })} placeholder="Tagler (virgülle)" style={inputStyle} />
              <input type="file" onChange={e => setNewPost({ ...newPost, image: e.target.files?.[0] || null })} style={inputStyle} />
              <button onClick={() => { dispatch(createPostByAdmin({ ...newPost })); setNewPost({ title: '', content: '', tags: '', image: null }); }} style={{ ...buttonStyle, backgroundColor: '#10B981' }}>Oluştur</button>
            </div>

            {/* Posts List */}
            {posts.map(post => (
              <div key={post._id} style={cardStyle} onClick={() => { setSelectedPostId(post._id); setSelectedCommentId(null); }}>
                <span>{post.title} -- {post.author?.username || "Anonim"}</span>
              </div>
            ))}

            {/* Post Detail */}
            {selectedPost && (
              <div ref={postDetailRef} style={{ marginTop: '24px', padding: '16px', border: '1px solid #C4B5FD', borderRadius: '12px', backgroundColor: '#F3E8FF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{selectedPost.title}</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => setEditPost({ id: selectedPost._id, title: selectedPost.title, content: selectedPost.content, tags: Array.isArray(selectedPost.tags) ? selectedPost.tags.join(',') : selectedPost.tags || '', image: null, author: selectedPost.author })} style={{ ...buttonStyle, backgroundColor: '#3B82F6' }}>Düzenle</button>
                    <button onClick={() => { dispatch(deletePostByAdmin(selectedPost._id)); setSelectedPostId(null); }} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
                  </div>
                </div>
                <p style={{ marginBottom: '12px' }}>{selectedPost.content}</p>

                {/* Yorumlar */}
                <h4 style={{ marginBottom: '12px', fontWeight: '600' }}>Yorumlar</h4>
                {postComments.length === 0 ? (
                  <p style={{ color: '#6b7280' }}>Henüz yorum yapılmamış.</p>
                ) : (
                  postComments.map(comment => (
                    <div key={comment._id} style={{ ...cardStyle, justifyContent: 'space-between' }} onClick={() => setSelectedCommentId(comment._id)}>
                      <span>{comment.author?.username || "Anonim"}: {comment.content}</span>
                    </div>
                  ))
                )}

                {/* Yorum Detayı */}
                {selectedComment && (
                  <div ref={commentDetailRef} style={{ marginTop: '16px', padding: '12px', border: '1px solid #C4B5FD', borderRadius: '12px', backgroundColor: '#EDE9FE' }}>
                    <h5 style={{ fontWeight: '600', marginBottom: '12px' }}>Yorum Detayı</h5>
                    <textarea
                      value={editComment.id === selectedComment._id ? editComment.content : selectedComment.content}
                      onChange={e => setEditComment({ id: selectedComment._id, content: e.target.value })}
                      style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #C4B5FD', minHeight: '80px' }}
                    />
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => { setEditComment({ id: null, content: '' }); setSelectedCommentId(null); }} style={{ ...buttonStyle, backgroundColor: '#3B82F6' }}>Kaydet</button>
                      <button onClick={() => { dispatch(deleteCommentByAdmin(selectedComment._id)); setSelectedCommentId(null); }} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
                      <button onClick={() => setSelectedCommentId(null)} style={{ ...buttonStyle, backgroundColor: '#9CA3AF' }}>İptal</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* COMMENTS TAB */}
        {activeTab === 'comments' && (
          <section style={sectionStyle}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#6D28D9' }}>Tüm Yorumlar</h2>
            {comments.map(comment => {
              const parentPost = posts.find(p => p._id === comment.post);
              return (
                <div key={comment._id} style={cardStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span><strong>Post:</strong> {parentPost?.title || "Post silinmiş"}</span>
                    <span><strong>Kullanıcı:</strong> {comment.author?.username || "Kullanıcı Silinmiş"}</span>
                    <span><strong>Yorum:</strong> {comment.content}</span>
                  </div>
                  <button onClick={() => dispatch(deleteCommentByAdmin(comment._id))} style={{ ...buttonStyle, backgroundColor: '#EF4444' }}>Sil</button>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </ProtectedAdmin>
  );
}
