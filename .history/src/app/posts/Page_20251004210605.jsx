'use client'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { fetchPosts } from '../redux/slices/postsSlice'
import PostCard from '../components/PostCard'
import { useTheme } from 'next-themes'
import ProtectedPage from '../components/ProtectedPage'

export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const theme = useTheme().theme

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <ProtectedPage>
      <div className="container" style={{ padding: '20px', margin: '10px 20px' }}>
        {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}
        {status === 'succeeded' && (
          <div
            className="grid gap-6"
            style={{
              margin: '20px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            }}
          >
            {posts.map((post,index) => (
              <PostCard key={post._id || index} post={post} theme={theme} />
            ))}
          </div>
        )}
        {status === 'failed' && <p className="text-center text-red-500">Yükleme hatası: {error}</p>}
      </div>
    </ProtectedPage>
  )
}
