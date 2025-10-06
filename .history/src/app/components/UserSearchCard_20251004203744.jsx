// components/UserSearchCard.js
'use client';

import { useTheme } from 'next-themes';
import { MdOutlinePerson } from 'react-icons/md';

export default function UserSearchCard({ user }) {
  const { theme } = useTheme();

  if (!user) return <div className="text-center p-4">Kullanıcı bilgisi yok</div>;

  const cardBg = theme === 'dark' ? 'bg-violet-950' : 'bg-violet-300';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div
      onClick={() => window.location.href = `/profilDetail/${user._id}`}
      className={`${cardBg} ${textColor} cursor-pointer rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 flex flex-col items-center`}
      style={{padding:'1rem'}}
    >
      <div style={{marginBottom:'2rem'}}>
        {user.profilePic ? (
          <img
            src={`http://localhost:5000/${user.profilePic}`}
            alt={user.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
            
            onError={(e) => { e.target.src = '/default-avatar.png'; }}
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl">
            <MdOutlinePerson  size={50}/>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg truncate">{user.username}</h3>
      <p className="text-sm truncate">{user.email}</p>
    </div>
  );
}
