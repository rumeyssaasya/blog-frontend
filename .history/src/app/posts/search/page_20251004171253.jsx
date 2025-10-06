'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../redux/slices/postsSlice';
import { searchUsers } from '../../redux/slices/usersSlices'; // kullanıcı arama slice'ı
import PostCard from '../../components/PostCard';
import { useTheme } from 'next-themes';

export default function SearchResultsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const [postRes, userRes] = await Promise.all([
          dispatch(searchPosts({ q: query })).unwrap(),
          dispatch(searchUsers({ q: query })).unwrap(),
        ]);

        setPosts(postRes);
        setUsers(userRes);
      } catch (err) {
        setError(err.message || 'Arama sırasında hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [dispatch, query]);

  if (loading) return <p className="text-center mt-10">Arama yapılıyor...</p>;
  if (error) return <p className="text-center text-red-500">Hata: {error}</p>;

  return (
    <div style={{ margin: '2% 10%' }}>
      <h1 className="text-2xl font-bold mb-6">
        "{query}" için sonuçlar gösteriliyor
      </h1>

      {/* POST SONUÇLARI */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">📚 Post Sonuçları</h2>
        {posts.length === 0 ? (
          <p>Post bulunamadı</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </section>

      {/* KULLANICI SONUÇLARI */}
      <section>
        <h2 className="text-xl font-semibold mb-3">👤 Kullanıcı Sonuçları</h2>
        {users.length === 0 ? (
          <p>Kullanıcı bulunamadı</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className="border-b py-2 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button className="bg-violet-600 text-white px-3 py-1 rounded-md text-sm">
                  Profili Gör
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
