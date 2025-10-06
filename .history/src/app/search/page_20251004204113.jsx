'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../redux/slices/postsSlice';
import { searchUsers } from '../redux/slices/usersSlices';
import UserSearchCard from '../components/UserSearchCard'; // YENİ COMPONENT
import PostCard from '../components/PostCard';
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
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [postsResult, usersResult] = await Promise.all([
          dispatch(searchPosts({ q: query })),
          dispatch(searchUsers({ q: query }))
        ]);

        console.log("Arama Sonuçları:", {
          posts: postsResult.payload,
          users: usersResult.payload
        });

        // Direkt payload'dan al
        const postsData = postsResult.payload || [];
        const usersData = usersResult.payload || [];

        setPosts(Array.isArray(postsData) ? postsData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
        
      } catch (err) {
        console.error("Arama hatası:", err);
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
        "{query}" için sonuçlar
      </h1>

      {/* POST SONUÇLARI */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">📚 Post Sonuçları ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">Post bulunamadı</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} theme={theme} />
            ))}
          </div>
        )}
      </section>

      {/* KULLANICI SONUÇLARI - YENİ COMPONENT İLE */}
      <section style={{marginTop:'1rem'}}>
        <h2 className="text-xl font-semibold " style={{marginBottom:'1rem'}}>👤 Kullanıcı Sonuçları ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">Kullanıcı bulunamadı</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserSearchCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}