import { useDispatch } from "react-redux"

export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)
  const theme = useTheme().theme

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container" style={{ padding: '20px', margin: '0 auto' }}>
      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}
      {status === 'succeeded' && (
        <div
          className="grid gap-6"
          style={{
            margin: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))}
        </div>
      )}
      {status === 'failed' && <p className="text-center text-red-500">Yükleme hatası: {posts.error}</p>}
    </div>
  )
}