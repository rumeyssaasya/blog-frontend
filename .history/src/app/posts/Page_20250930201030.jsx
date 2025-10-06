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
        <div className=" flex flex-col items-center justify-center gap-6">
          {posts.map((post) => (
            <div className='' key={post._id}>
              <div className='flex  gap-2 mb-2'>
                <MdOutlinePerson size={20} className="text-violet-800 dark:text-indigo-100"/>
                <p className="text-m mt-4">{post.author.username}</p>
              </div>
              <div
                key={post._id}
                className="flex flex-row justify-between items-center h-50 w-120 bg-white  dark:bg-slate-800  rounded-lg p-6 hover:shadow-xl shadow-md transition-shadow duration-300 "
              >
                <div>
                  <Image
                  src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
                  alt={post.title}
                  width={250}
                  height={200}
                  className="rounded object-cover"
                />
                </div>
                <div>
                  <p className="text-4xl font-bold text-center mb-2">{post.title}</p>
                  <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
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
