'use client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/postsSlice'

export default function Posts() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Postlar</h1>
      {status === 'loading' && <p>Yükleniyor...</p>}
      {status === 'succeeded' && posts.map(post => (
        <div key={post.id} className="p-4 mb-2 border rounded bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
