import { Hero } from './components/home/Hero'
import { RecentPosts } from './components/home/RecentPosts'
import { PopularBlogs } from './components/home/PopularBlogs'
import { CategoryFilter } from './components/home/CategoryFilter'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <RecentPosts />
          </div>
          <div className="lg:col-span-1">
            <PopularBlogs />
          </div>
        </div>
      </div>
    </main>
  )
}