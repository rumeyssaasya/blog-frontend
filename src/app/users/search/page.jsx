'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../redux/slices/usersSlices';
import UserProfile from '../../components/UserProfile';
import { useTheme } from 'next-themes';

export default function SearchResultsPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        // Post ve user araması aynı anda
        const [postAction, userAction] = await Promise.all([
          dispatch(searchUsers({ q: query })).unwrap(),
        ]);
        setUsers(userAction);
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

      {/* KULLANICI SONUÇLARI */}
      <section>
        <h2 className="text-xl font-semibold mb-3">👤 Kullanıcı Sonuçları</h2>
        {users.length === 0 ? (
          <p>Kullanıcı bulunamadı</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserProfile key={user._id} user={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
