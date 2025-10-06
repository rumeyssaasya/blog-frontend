import Providers from './Providers'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BlogSite - Modern Blog Platform',
  description: 'Modern blog sitesi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}