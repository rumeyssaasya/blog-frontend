'use client'

import { BlogEditor } from '../blog/BlogCard'

export default function CreateBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Yeni Blog Yazısı</h1>
      <BlogEditor />
    </div>
  )
}