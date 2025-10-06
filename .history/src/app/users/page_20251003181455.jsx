'use client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllUsers } from '../redux/slices/usersSlices'
import Image from 'next/image';
import { FaRegUser } from "react-icons/fa";
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";
import ProtectedPage from '../components/ProtectedPage'
import { useRouter } from 'next/navigation'

export default function UsersPage() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.items)
  const status = useSelector((state) => state.users.status)
  const theme = useTheme().theme;
  const router = useRouter()

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

  const handleUserClick = (id) => {
    router.push(`/users/${id}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: "0 12px 25px rgba(0,0,0,0.3)" }
  }

  return (
    <ProtectedPage>
      <div className="container mx-auto" style={{padding:'20px'}}>
      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {users.map((user) => (
            <motion.div
              key={user._id}
              className="rounded-xl cursor-pointer overflow-hidden"
              style={{ backgroundColor: theme === 'dark' ? '#5d0ec0' : '#8e51ff' }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleUserClick(user._id)}
            >
              <div className="flex flex-col items-center" style={{padding:'20px'}}>
                <div style={{marginBottom:'10px'}}>
                  {user?.profilePic ? (
                    <Image
                      src={`http://localhost:5000/${user.profilePic.replace(/\\/g, '/')}`}
                      alt={user.username}
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <FaRegUser size={120} className="text-gray-100" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">{user.username}</p>
                  <p className="text-md font-bold text-white mb-2" style={{marginBottom:'5px'}}>{user.email}</p>
                  <p className="text-gray-200 text-sm">{user.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      {status === 'failed' && (
        <p className="text-center text-red-500">Yükleme hatası: {users.error}</p>
      )}
    </div>
    </ProtectedPage>
    
  )
}
