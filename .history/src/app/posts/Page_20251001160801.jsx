'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'
import { MdOutlinePerson } from "react-icons/md";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";

export default function PostsPage() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const status = useSelector((state) => state.posts.status)
  const theme= useTheme().theme;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts())
  }, [dispatch, status])

  return (
    <div className="container" style={{padding:'20px',margin:'0 auto'}}>
      {status === 'loading' && <p className="text-center text-gray-500">Yükleniyor...</p>}

      {status === 'succeeded' && (
        <div className=" flex flex-col items-center justify-center gap-6" style={{margin: '20px'}}>
          {posts.map((post) => (
            <div className='' key={post._id}>
              <div className='flex items-center gap-2 mb-2' style={{marginBottom:'5px',}}>
                <MdOutlinePerson size={30} style={{color: theme ==='dark' ? '#e0e7ff' : '#6b21a8',}}/>
                <p className="text-l mt-4">{post.author.username}</p>
              </div>
              
                {post?.image && (
                  <div key={post._id}
                    className="flex flex-row justify-between h-50 w-150  rounded-lg hover:shadow-xl shadow-md transition-shadow duration-300 gap-4"
                    style={{backgroundColor: theme ==='dark' ? '#7008e7' : '#8e51ff',padding:'6px'}}
                  >
                    <div className='flex items-center justify-center ' style={{marginLeft:'20px'}}>
                      <Image
                      src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
                      alt={post.title}
                      width={250}
                      height={200}
                      className="rounded object-cover"
                    />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-center flex items-center " style={{margin:'10px'}}>{post.title}</p>
                      <p style={{color: theme ==='dark' ? 'lightGray' : '#18191a', marginRight:'40px'}}>{post.content}</p>
                    </div>
                    <div className='flex flex-col justify-center items-end gap-4' style={{marginRight:'20px'}}>
                      <TiHeart size={35} className="text-red-800" />
                      <MdModeComment size={30} className="text-black-500" />
                    </div>
                  </div>
                )}
                {!post?.image && (
                  <div
                    key={post._id}
                    className="relative flex flex-col justify-between rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 w-[350px] h-[220px] overflow-hidden"
                    style={{
                      background: theme === "dark"
                        ? "linear-gradient(135deg, #5d0ec0, #7008e7)"
                        : "linear-gradient(135deg, #8e51ff, #cbb2ff)",
                      color: theme === "dark" ? "#e0e0e0" : "#18191a",
                    }}
                  >
                    {/* İçerik */}
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-2xl font-extrabold mb-2 tracking-wide">
                          {post.title}
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed line-clamp-3">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* Alt kısım: Like ve Yorum */}
                    <div className="absolute bottom-3 right-4 flex items-center gap-6">
                      <button className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
                        <TiHeart size={28} className="text-red-500" />
                      </button>
                      <button className="flex items-center gap-1 hover:scale-110 transition-transform duration-200">
                        <MdModeComment size={25} className={theme === "dark" ? "text-white" : "text-black"} />
                      </button>
                    </div>
                  </div>
                )}

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
