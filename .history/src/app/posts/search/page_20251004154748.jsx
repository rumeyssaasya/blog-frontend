'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../redux/slices/postsSlice';

export default function SearchResultsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [loading, setLoading] = useState(true);
  const posts = useSelector(state => state.posts.items);

  useEffect(() => {
    if (query) {
      setLoading(true);
      dispatch(searchPosts({ q: query })).finally(() => setLoading(false));
    }
  }, [dispatch, query]);

  if (loading) return <p>Arama yapılıyor...</p>;

  return (
    <div style={{ margin: '2% 10%' }}>
      <h1>Sonuçları: "{query}"</h1>
      {posts.length === 0 && <p>Sonuç bulunamadı</p>}
      {posts.map(post => (
        <div key={post._id} className="mb-4">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
