// components/UserSearchCard.js
'use client';

export default function UserSearchCard({ user }) {
  if (!user) {
    return <div className="text-center p-4">Kullanıcı bilgisi yok</div>;
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-3 mb-3">
        <img 
          src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : '/default-avatar.png'} 
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover border"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{user.username}</h3>
          <p className="text-gray-500 text-sm truncate">{user.email}</p>
        </div>
      </div>
      
      {user.bio && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {user.bio}
        </p>
      )}
      
      <button 
        onClick={() => window.location.href = `/profile/${user._id}`}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Profili Görüntüle
      </button>
    </div>
  );
}