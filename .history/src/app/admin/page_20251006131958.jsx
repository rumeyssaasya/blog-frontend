'use client';
import { useEffect, useState } from 'react';
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

  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', image: null });
  const [editPost, setEditPost] = useState({ id: null, title: '', content: '', tags: '', image: null });
  const [editUser, setEditUser] = useState({ id: null, username: '', email: '' });

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
      dispatch(fetchAllComments());
    }
  }, [dispatch, token]);

  if (!token) return null;

  // Theme styles
  const containerStyle = { padding: '20px', margin: '20px' };
  const sectionStyle = { padding: '20px', marginBottom: '24px', borderRadius: '16px', backgroundColor: '#EDE9FE', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' };
  const cardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', marginBottom: '12px', borderRadius: '12px', backgroundColor: '#DDD6FE', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
  const inputStyle = { padding: '8px', borderRadius: '8px', border: '1px solid #C4B5FD', flex: 1 };
  const buttonStyle = { padding: '8px 16px', borderRadius: '8px', fontWeight: '600', color: 'white', cursor: 'pointer' };
  const tabButtonStyle = (active) => ({
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: '600',
    color: active ? 'white' : '#4C1D95',
    backgroundColor: active ? '#7C3AED' : '#DDD6FE',
    cursor: 'pointer',
    boxShadow: active ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'
  });
  const tabContainerStyle = { display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' };

  return (
    <ProtectedAdmin>
      {/* Tabs */}
      <div style={tabContainerStyle}>
        {['users','posts','comments'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={tabButtonStyle(activeTab === tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={containerStyle}>
        <h1 style={{textAlign:'center', fontSize:'2rem', fontWeight:'700', color:'#5B21B6', marginBottom:'24px'}}>Admin Panel</h1>

        {/* Users */}
        {activeTab === 'users' && (
          <section style={sectionStyle}>
            <h2 style={{fontSize:'1.5rem', fontWeight:'600', marginBottom:'16px', color:'#6D28D9'}}>Kullanıcılar</h2>

            {editUser.id && (
              <div style={{display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'16px'}}>
                <input
                  value={editUser.username}
                  onChange={e=>setEditUser({...editUser, username:e.target.value})}
                  placeholder="Username"
                  style={inputStyle}
                />
                <input
                  value={editUser.email}
                  onChange={e=>setEditUser({...editUser, email:e.target.value})}
                  placeholder="Email"
                  style={inputStyle}
                />
                <button
                  onClick={() => {
                    dispatch(updateUserByAdmin({ id: editUser.id, data: { username: editUser.username, email: editUser.email } }));
                    setEditUser({ id:null, username:'', email:'' });
                  }}
                  style={{...buttonStyle, backgroundColor:'#7C3AED'}}
                >
                  Kaydet
                </button>
                <button
                  onClick={()=>setEditUser({ id:null, username:'', email:'' })}
                  style={{...buttonStyle, backgroundColor:'#9CA3AF'}}
                >
                  İptal
                </button>
              </div>
            )}

            {users.map(user => (
              <div key={user._id} style={cardStyle}>
                <span>{user.username} ({user.email})</span>
                <div style={{display:'flex', gap:'12px'}}>
                  <button
                    onClick={() => setEditUser({ id:user._id, username:user.username, email:user.email })}
                    style={{...buttonStyle, backgroundColor:'#3B82F6'}}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => dispatch(deleteUserByAdmin(user._id))}
                    style={{...buttonStyle, backgroundColor:'#EF4444'}}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Posts */}
        {activeTab === 'posts' && (
          <section style={sectionStyle}>
            <h2 style={{fontSize:'1.5rem', fontWeight:'600', marginBottom:'16px', color:'#6D28D9'}}>Postlar</h2>

            {/* Create post */}
            <div style={{display:'flex', flexWrap:'wrap', gap:'12px', marginBottom:'16px'}}>
              <input
                value={newPost.title}
                onChange={e=>setNewPost({...newPost, title:e.target.value})}
                placeholder="Başlık"
                style={inputStyle}
              />
              <input
                value={newPost.content}
                onChange={e=>setNewPost({...newPost, content:e.target.value})}
                placeholder="İçerik"
                style={inputStyle}
              />
              <input
                value={newPost.tags}
                onChange={e=>setNewPost({...newPost, tags:e.target.value})}
                placeholder="Tagler (virgülle)"
                style={inputStyle}
              />
              <input
                type="file"
                onChange={e=>setNewPost({...newPost, image: e.target.files?.[0] || null})}
                style={inputStyle}
              />
              <button
                onClick={() => {
                  dispatch(createPostByAdmin({ ...newPost }));
                  setNewPost({ title:'', content:'', tags:'', image:null });
                }}
                style={{...buttonStyle, backgroundColor:'#10B981'}}
              >
                Oluştur
              </button>
            </div>

            {/* Posts list */}
            {posts.map(post => (
              <div key={post._id} style={cardStyle}>
                <span>{post.title}</span>
                <div style={{display:'flex', gap:'12px'}}>
                  <button
                    onClick={() => setEditPost({
                      id:post._id,
                      title:post.title,
                      content:post.content,
                      tags: Array.isArray(post.tags) ? post.tags.join(',') : (post.tags||''),
                      image:null
                    })}
                    style={{...buttonStyle, backgroundColor:'#3B82F6'}}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => dispatch(deletePostByAdmin(post._id))}
                    style={{...buttonStyle, backgroundColor:'#EF4444'}}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Comments */}
        {activeTab === 'comments' && (
          <section style={sectionStyle}>
            <h2 style={{fontSize:'1.5rem', fontWeight:'600', marginBottom:'16px', color:'#6D28D9'}}>Yorumlar</h2>
            {comments.map(comment => (
              <div key={comment._id} style={cardStyle}>
                <span>{comment.content}</span>
                <button
                  onClick={() => dispatch(deleteCommentByAdmin(comment._id))}
                  style={{...buttonStyle, backgroundColor:'#EF4444'}}
                >
                  Sil
                </button>
              </div>
            ))}
          </section>
        )}

      </div>
    </ProtectedAdmin>
  );
}
