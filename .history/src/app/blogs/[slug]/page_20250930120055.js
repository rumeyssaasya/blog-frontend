import { BlogDetail } from '@/components/blog/BlogDetail'
import { CommentSection } from '@/components/blog/CommentSection'
import { SimilarPosts } from '@/components/blog/SimilarPosts'

async function getBlog(slug) {
  // SSG/SSR data fetching
  const res = await fetch(`https://api.example.com/blogs/${slug}`)
  return res.json()
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogDetail blog={blog} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <CommentSection blogId={blog.id} />
        </div>
        <div className="lg:col-span-1">
          <SimilarPosts currentBlog={blog} />
        </div>
      </div>
    </div>
  )
}