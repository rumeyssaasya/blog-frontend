'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'
import { MdOutlinePerson } from "react-icons/md";
import Image from 'next/image';


export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Postlar</h1>

      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <div className=" flex flex-col items-center justify-center gap-6 min-h-screen">
          {posts.map((post) => (
            <div className='h-40' key={post._id}>
              <div className='flex w-100  gap-2 mb-2'>
                <MdOutlinePerson size={20} className="text-violet-800 dark:text-indigo-100"/>
                <p className="text-m mt-4">{post.author.username}</p>
              </div>
              <div
                key={post._id}
                className="bg-white grid-rows  dark:bg-slate-800 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold text-center mb-2">{post.title}</h2>
                <Image
                  src={`http://localhost:5000/${post.image}`}
                  alt={post.title}
                  width={128}
                  height={80}
                  className="rounded object-cover"
                />
                <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
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
