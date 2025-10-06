'use client'

import { useState, useEffect } from 'react'
import { BlogList } from '@/components/blog/BlogList'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { useInView } from 'react-intersection-observer'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    tag: '',
    search: ''
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreBlogs()
    }
  }, [inView])

  const loadMoreBlogs = async () => {
    // API call simulation
    const newBlogs = await fetch(`/api/blogs?page=${page}&...`).then(res => res.json())
    
    if (newBlogs.length === 0) {
      setHasMore(false)
    } else {
      setBlogs(prev => [...prev, ...newBlogs])
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tüm Yazılar</h1>
      
      <BlogFilters filters={filters} onFilterChange={setFilters} />
      
      <BlogList blogs={blogs} />
      
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  )
}