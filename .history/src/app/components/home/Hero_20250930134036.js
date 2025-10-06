"use client";

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';

function goToPost() {
  const router = useRouter();
  router.push('/posts');
}

export function Hero() {

  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Modern Blog Platform
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          En son blog yazılarını keşfedin, kendi hikayelerinizi paylaşın ve topluluğa katılın.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={goToPost} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Yazıları Keşfet
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Blog Yazmaya Başla
          </button>
        </motion.div>
      </div>
    </section>
  )
}
