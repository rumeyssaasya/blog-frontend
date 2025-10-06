'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, fetchAllPosts, fetchAllComments, deleteUserByAdmin, deletePostByAdmin, deleteCommentByAdmin, createPostByAdmin, updatePostByAdmin, updateUserByAdmin } from '../redux/slices/adminSlice';
import ProtectedAdmin from '../components/ProtectedAdmin';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { token, users, posts, comments } = useSelector(state => state.admin);
  const [activeTab, setActiveTab] = useState('users');

  // Create post form state
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '', image: null });
  const [editPost, setEditPost] = useState({ id: null, title: '', content: '', tags: '', image: null });

  // Edit user form state
  const [editUser, setEditUser] = useState({ id: null, username: '', email: '' });

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
      dispatch(fetchAllComments());
    }
  }, [dispatch, token]);

  if (!token) return null;

  const containerStyle = { padding: '12px', margin: '12px' }
  const sectionClass = 'rounded shadow-sm bg-slate-50 dark:bg-slate-800'
  const tabBtn = (tab) => `px-4 py-2 rounded ${activeTab===tab ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-slate-700 dark:text-white'}`

  return (
    <ProtectedAdmin>


      {/* Tabs */}
      <div className="flex flex-row text-xl font-semibold justify-center gap-2 mb-6 bg-violet-500 text-white rounded-2xl">
        {['users','posts','comments'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={tabBtn(tab)}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
          <div style={containerStyle}>
      <p className="text-3xl font-bold text-center " style={{marginBottom:'2rem'}}>Admin Panel</p>

      {activeTab === 'users' && (
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mt-2 mb-4">Kullanıcılar</h2>
          {/* Edit user form */}
          {editUser.id && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-slate-700 rounded">
              <div className="flex gap-2 mb-2">
                <input value={editUser.username} onChange={e=>setEditUser({...editUser, username:e.target.value})} placeholder="Username" className="border p-2 rounded w-1/3"/>
                <input value={editUser.email} onChange={e=>setEditUser({...editUser, email:e.target.value})} placeholder="Email" className="border p-2 rounded w-1/3"/>
                <button onClick={()=>{dispatch(updateUserByAdmin({ id: editUser.id, data: { username: editUser.username, email: editUser.email } })); setEditUser({ id:null, username:'', email:'' });}} className="px-3 py-2 bg-blue-600 text-white rounded">Kaydet</button>
                <button onClick={()=>setEditUser({ id:null, username:'', email:'' })} className="px-3 py-2 bg-gray-400 text-white rounded">İptal</button>
              </div>
            </div>
          )}
          {users.map(user => (
            <div key={user._id} className="flex justify-between items-center bg-gray-100 dark:bg-slate-700 p-2 mb-2 rounded">
              <span>{user.username} ({user.email})</span>
              <div className="flex gap-2">
                <button onClick={() => setEditUser({ id:user._id, username:user.username, email:user.email })} className="text-blue-600 hover:text-blue-800">Düzenle</button>
                <button onClick={() => dispatch(deleteUserByAdmin(user._id))} className="text-red-600 hover:text-red-800">Sil</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'posts' && (
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mt-2 mb-4">Postlar</h2>
          {/* Create post */}
          <div className="mb-4 p-3 bg-gray-100 dark:bg-slate-700 rounded">
            <div className="flex flex-wrap gap-2 mb-2">
              <input value={newPost.title} onChange={e=>setNewPost({...newPost, title:e.target.value})} placeholder="Başlık" className="border p-2 rounded w-1/3"/>
              <input value={newPost.content} onChange={e=>setNewPost({...newPost, content:e.target.value})} placeholder="İçerik" className="border p-2 rounded w-1/3"/>
              <input value={newPost.tags} onChange={e=>setNewPost({...newPost, tags:e.target.value})} placeholder="Tagler (virgülle)" className="border p-2 rounded w-1/3"/>
              <input type="file" onChange={e=>setNewPost({...newPost, image: e.target.files?.[0] || null})} className="border p-2 rounded w-1/3"/>
            </div>
            <button onClick={()=>{dispatch(createPostByAdmin({ title:newPost.title, content:newPost.content, tags:newPost.tags, image:newPost.image })); setNewPost({ title:'', content:'', tags:'', image:null });}} className="px-3 py-2 bg-green-600 text-white rounded">Oluştur</button>
          </div>

          {/* Edit post */}
          {editPost.id && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-slate-700 rounded">
              <div className="flex flex-wrap gap-2 mb-2">
                <input value={editPost.title} onChange={e=>setEditPost({...editPost, title:e.target.value})} placeholder="Başlık" className="border p-2 rounded w-1/3"/>
                <input value={editPost.content} onChange={e=>setEditPost({...editPost, content:e.target.value})} placeholder="İçerik" className="border p-2 rounded w-1/3"/>
                <input value={editPost.tags} onChange={e=>setEditPost({...editPost, tags:e.target.value})} placeholder="Tagler (virgülle)" className="border p-2 rounded w-1/3"/>
                <input type="file" onChange={e=>setEditPost({...editPost, image: e.target.files?.[0] || null})} className="border p-2 rounded w-1/3"/>
              </div>
              <button onClick={()=>{
                const fd = new FormData();
                fd.append('title', editPost.title);
                fd.append('content', editPost.content);
                if (editPost.tags) fd.append('tags', editPost.tags);
                if (editPost.image) fd.append('image', editPost.image);
                dispatch(updatePostByAdmin({ id: editPost.id, formData: fd }));
                setEditPost({ id:null, title:'', content:'', tags:'', image:null });
              }} className="px-3 py-2 bg-blue-600 text-white rounded">Kaydet</button>
              <button onClick={()=>setEditPost({ id:null, title:'', content:'', tags:'', image:null })} className="ml-2 px-3 py-2 bg-gray-400 text-white rounded">İptal</button>
            </div>
          )}

          {posts.map(post => (
            <div key={post._id} className="flex justify-between items-center bg-gray-100 dark:bg-slate-700 p-2 mb-2 rounded">
              <span>{post.title}</span>
              <div className="flex gap-2">
                <button onClick={() => setEditPost({ id:post._id, title:post.title, content:post.content, tags:Array.isArray(post.tags) ? post.tags.join(',') : (post.tags||'') , image:null })} className="text-blue-600 hover:text-blue-800">Düzenle</button>
                <button onClick={() => dispatch(deletePostByAdmin(post._id))} className="text-red-600 hover:text-red-800">Sil</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'comments' && (
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold mt-2 mb-4">Yorumlar</h2>
          {comments.map(comment => (
            <div key={comment._id} className="flex justify-between bg-gray-100 dark:bg-slate-700 p-2 mb-2 rounded">
              <span>{comment.text}</span>
              <button onClick={() => dispatch(deleteCommentByAdmin(comment._id))} className="text-red-600 hover:text-red-800">Sil</button>
            </div>
          ))}
        </section>
      )}
    </div>
    </ProtectedAdmin>
  );
}
