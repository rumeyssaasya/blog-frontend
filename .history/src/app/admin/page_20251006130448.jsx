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

  const containerStyle = { padding: '16px', margin: '16px' };
  const sectionClass = 'rounded-xl shadow-lg bg-violet-50 dark:bg-violet-900 p-4 mb-6';
  const tabBtn = (tab) => `
    px-4 py-2 rounded-xl font-semibold
    ${activeTab===tab 
      ? 'bg-violet-600 text-white shadow-lg' 
      : 'bg-violet-200 dark:bg-violet-700 dark:text-white hover:bg-violet-500 hover:text-white'}
  `;

  const cardClass = 'flex justify-between items-center bg-violet-100 dark:bg-violet-800 p-4 rounded-lg mb-3 shadow-sm';

  const inputClass = 'border border-violet-300 dark:border-violet-600 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-violet-500';

  const buttonClass = 'px-4 py-2 rounded-lg font-semibold text-white';

  return (
    <ProtectedAdmin>
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {['users','posts','comments'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={tabBtn(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={containerStyle}>
        <h1 className="text-3xl font-bold text-center text-violet-700 dark:text-violet-300 mb-8">Admin Panel</h1>

        {/* Users */}
        {activeTab === 'users' && (
          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4 text-violet-700 dark:text-violet-200">Kullanıcılar</h2>

            {editUser.id && (
              <div className="mb-4 p-4 bg-violet-200 dark:bg-violet-700 rounded-lg flex flex-wrap gap-3 items-center">
                <input
                  value={editUser.username}
                  onChange={e=>setEditUser({...editUser, username:e.target.value})}
                  placeholder="Username"
                  className={inputClass}
                />
                <input
                  value={editUser.email}
                  onChange={e=>setEditUser({...editUser, email:e.target.value})}
                  placeholder="Email"
                  className={inputClass}
                />
                <button
                  onClick={() => {
                    dispatch(updateUserByAdmin({ id: editUser.id, data: { username: editUser.username, email: editUser.email } }));
                    setEditUser({ id:null, username:'', email:'' });
                  }}
                  className={`${buttonClass} bg-violet-600 hover:bg-violet-700`}
                >
                  Kaydet
                </button>
                <button
                  onClick={()=>setEditUser({ id:null, username:'', email:'' })}
                  className={`${buttonClass} bg-gray-400 hover:bg-gray-500`}
                >
                  İptal
                </button>
              </div>
            )}

            {users.map(user => (
              <div key={user._id} className={cardClass}>
                <span>{user.username} ({user.email})</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditUser({ id:user._id, username:user.username, email:user.email })}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => dispatch(deleteUserByAdmin(user._id))}
                    className="text-red-600 hover:text-red-800 font-semibold"
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
          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold mb-4 text-violet-700 dark:text-violet-200">Postlar</h2>

            {/* Create post */}
            <div className="mb-6 p-4 bg-violet-200 dark:bg-violet-700 rounded-lg flex flex-wrap gap-3 items-center">
              <input
                value={newPost.title}
                onChange={e=>setNewPost({...newPost, title:e.target.value})}
                placeholder="Başlık"
                className={inputClass}
              />
              <input
                value={newPost.content}
                onChange={e=>setNewPost({...newPost, content:e.target.value})}
                placeholder="İçerik"
                className={inputClass}
              />
              <input
                value={newPost.tags}
                onChange={e=>setNewPost({...newPost, tags:e.target.value})}
                placeholder="Tagler (virgülle)"
                className={inputClass}
              />
              <input
                type="file"
                onChange={e=>setNewPost({...newPost, image: e.target.files?.[0] || null})}
                className={inputClass}
              />
              <button
                onClick={() => {
                  dispatch(createPostByAdmin({ ...newPost }));
                  setNewPost({ title:'', content:'', tags:'', image:null });
                }}
                className={`${buttonClass} bg-green-600 hover:bg-green-700`}
              >
                Oluştur
              </button>
            </div>

            {/* Edit post */}
            {editPost.id && (
              <div className="mb-6 p-4 bg-violet-200 dark:bg-violet-700 rounded-lg flex flex-wrap gap-3 items-center">
                <input
                  value={editPost.title}
                  onChange={e=>setEditPost({...editPost, title:e.target.value})}
                  placeholder="Başlık"
                  className={inputClass}
                />
                <input
                  value={editPost.content}
                  onChange={e=>setEditPost({...editPost, content:e.target.value})}
                  placeholder="İçerik"
                  className={inputClass}
                />
                <input
                  value={editPost.tags}
                  onChange={e=>setEditPost({...editPost, tags:e.target.value})}
                  placeholder="Tagler (virgülle)"
                  className={inputClass}
                />
                <input
                  type="file"
                  onChange={e=>setEditPost({...editPost, image: e.target.files?.[0] || null})}
                  className={inputClass}
                />
                <button
                  onClick={()=>{
                    const fd = new FormData();
                    fd.append('title', editPost.title);
                    fd.append('content', editPost.content);
                    if(editPost.tags) fd.append('tags', editPost.tags);
                    if(editPost.image) fd.append('image', editPost.image);
                    dispatch(updatePostByAdmin({ id: editPost.id, formData: fd }));
                    setEditPost({ id:null, title:'', content:'', tags:'', image:null });
                  }}
                  className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}
                >
                  Kaydet
                </button>
                <button
                  onClick={()=>setEditPost({ id:null, title:'', content:'', tags:'', image:null })}
                  className={`${buttonClass} bg-gray-400 hover:bg-gray-500`}
                >
                  İptal
                </button>
              </div>
            )}

            {posts.map(post => (
              <div key={post._id} className={cardClass}>
                <span>{post.title}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditPost({
                      id:post._id,
                      title:post.title,
                      content:post.content,
                      tags: Array.isArray(post.tags) ? post.tags.join(',')
