'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../redux/slices/postsSlice';
import PostCard from '../../components/PostCard';
import { useTheme } from 'next-themes';

export default function SearchResultsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const posts = useSelector(state => state.posts.items);
  const searchStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (query) {
      setLoading(true);
      dispatch(searchPosts({ q: query }))
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, [dispatch, query]);

  if (loading) return <p>Arama yapılıyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div style={{ margin: '2% 10%' }}>
      <h1>Sonuçları: "{query}"</h1>
      {posts.length === 0 && !loading && <p>Sonuç bulunamadı</p>}
      {posts.map(post => (
        <PostCard post={post._id} theme={theme}/>
      ))}
    </div>
  );
}