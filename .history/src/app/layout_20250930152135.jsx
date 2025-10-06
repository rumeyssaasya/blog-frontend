import Providers from './Providers'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from './components/layout/Header'
import PageContainer from './components/container/PageContainer'

export const metadata = {
  title: 'BlogSite - Modern Blog Platform',
  description: 'Modern blog sitesi',
}

function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PageContainer>
          <Providers>
            <Header />
            {children}
          </Providers>
        </PageContainer>
      </body>
    </html>
  )
}

export default Layout;