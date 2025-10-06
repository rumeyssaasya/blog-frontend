'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'

export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Postlar</h1>

      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <div className="grid grid-rows w-fit justify-center text-center gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white grid-rows  dark:bg-slate-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              <p className="text-sm text-gray-500 mt-4">Yazar: {post.author.username}</p>
              
            </div>
          ))}
        </div>
      )}

      {status === 'failed' && (
        <p className="text-center text-red-500">Yükleme hatası: {posts.error}</p>
      )}
    </div>

  )
}
