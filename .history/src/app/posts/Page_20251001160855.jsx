'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../redux/slices/postsSlice'
import { MdOutlinePerson } from "react-icons/md";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { TiHeart } from "react-icons/ti";
import { MdModeComment } from "react-icons/md";
import { FiShare2 } from 'react-icons/fi';

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
  <div key={post._id}
    className="flex justify-between items-stretch h-auto min-h-[180px] w-full max-w-2xl rounded-2xl p-6 hover:shadow-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-opacity-20"
    style={{
      backgroundColor: theme === 'dark' ? '#7008e7' : '#8e51ff',
      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
    }}
  >
    {/* İçerik Bölümü */}
    <div className='flex flex-col justify-between flex-1 pr-6'>
      <div>
        <h3 className="text-2xl font-bold mb-3 line-clamp-2" 
            style={{color: theme === 'dark' ? 'white' : '#f8fafc'}}>
          {post.title}
        </h3>
        <p className="text-lg leading-relaxed line-clamp-3"
           style={{color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(248,250,252,0.95)'}}>
          {post.content}
        </p>
      </div>
      
      {/* Etiketler/Alt Bilgi */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t"
           style={{borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(248,250,252,0.3)'}}>
        <span className="text-sm px-3 py-1 rounded-full bg-black bg-opacity-10 text-white">
          #{post.category || "Genel"}
        </span>
      </div>
    </div>

    {/* İkonlar Bölümü */}
    <div className='flex flex-col justify-center items-center gap-5 pl-4 border-l'
         style={{borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(248,250,252,0.3)'}}>
      
      <div className="flex flex-col items-center group cursor-pointer">
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
          <TiHeart size={28} className="text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-white text-sm mt-1 font-medium">256</span>
      </div>

      <div className="flex flex-col items-center group cursor-pointer">
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
          <MdModeComment size={26} className="text-white group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-white text-sm mt-1 font-medium">42</span>
      </div>

      <div className="flex flex-col items-center group cursor-pointer">
        <div className="p-3 rounded-full bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
          <FiShare2 size={22} className="text-white group-hover:scale-110 transition-transform" />
        </div>
      </div>
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
