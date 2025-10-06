'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogin, fetchAllUsers, fetchAllPosts, fetchAllComments, deleteUserByAdmin, deletePostByAdmin, deleteCommentByAdmin } from '../redux/slices/adminSlice';

export default function AdminPanel() {
  const dispatch = useDispatch();
  const { token, users, posts, comments } = useSelector(state => state.admin);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllUsers());
      dispatch(fetchAllPosts());
      dispatch(fetchAllComments());
    } else {
      dispatch(adminLogin({ email: "admin@system.com", password: "supersecurepassword" }));
    }
  }, [dispatch, token]);

  if (!token) return <p>Admin girişi yapılıyor...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {/* KULLANICILAR */}
      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Kullanıcılar</h2>
        {users.map(user => (
          <div key={user._id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{user.username} ({user.email})</span>
            <button
              onClick={() => dispatch(deleteUserByAdmin(user._id))}
              className="text-red-600 hover:text-red-800"
            >
              Sil
            </button>
          </div>
        ))}
      </section>

      {/* POSTLAR */}
      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Postlar</h2>
        {posts.map(post => (
          <div key={post._id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{post.title}</span>
            <button
              onClick={() => dispatch(deletePostByAdmin(post._id))}
              className="text-red-600 hover:text-red-800"
            >
              Sil
            </button>
          </div>
        ))}
      </section>

      {/* YORUMLAR */}
      <section>
        <h2 className="text-xl font-semibold mt-6 mb-2">Yorumlar</h2>
        {comments.map(comment => (
          <div key={comment._id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{comment.text}</span>
            <button
              onClick={() => dispatch(deleteCommentByAdmin(comment._id))}
              className="text-red-600 hover:text-red-800"
            >
              Sil
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
