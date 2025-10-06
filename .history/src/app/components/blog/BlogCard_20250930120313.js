import { motion } from 'framer-motion'
import Link from 'next/link'

export function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{blog.author.name}</span>
          </div>
          <span>{new Date(blog.publishedAt).toLocaleDateString('tr-TR')}</span>
        </div>
      </div>
    </motion.article>
  )
}