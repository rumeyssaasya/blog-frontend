'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/slices/usersSlices'
import { MdOutlinePerson } from "react-icons/md";
import Image from 'next/image';
import { FaRegUser } from "react-icons/fa";


export default function UsersPage() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.items)
  const status = useSelector((state) => state.users.status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

  return (
    <div className="container mx-auto p-4">
      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <div className=" flex flex-col items-center justify-center gap-6 m-[20px]">
          {users.map((users) => (
            <div className='' key={users._id}>
              <div className='flex  gap-2 mb-2'>
                <MdOutlinePerson size={20} className="text-violet-800 dark:text-indigo-100"/>
              </div>
              <div
                key={users._id}
                className="flex flex-row justify-between h-50 w-150 bg-white  dark:bg-slate-800  rounded-lg p-6 hover:shadow-xl shadow-md transition-shadow duration-300 gap-4"
              >
                <div className='flex items-center justify-center ml-[20px]'>
                {users?.profilePic && (
                <Image
                  src={`http://localhost:5000/${users.profilePic.replace(/\\/g, '/')}`}
                  alt={users.username}
                  width={250}
                  height={200}
                  className="rounded object-cover"
                />)}
                {!users?.profilePic && (
                  <FaRegUser size={150} className="text-gray-400" />)}
                </div>
                <div>
                  <p className="text-m mt-4">{users.username}</p>
                  <p className="text-3xl font-bold text-center mb-2">{users.email}</p>
                  <p className="text-gray-700 dark:text-gray-300">{users.bio}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'failed' && (
        <p className="text-center text-red-500">Yükleme hatası: {posts.error}</p>
      )}
    </div>

  )
}
