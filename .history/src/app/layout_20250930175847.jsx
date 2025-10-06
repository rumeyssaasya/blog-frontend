"use client"
import Providers from './Providers'
import PageContainer from './components/container/PageContainer'
import './globals.css'
import { Header } from './components/layout/Header'
import Footer from './components/layout/Footer'

function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='dark' >
          <Providers>
            <PageContainer>
              <Header />
              {children}
              <Footer />
            </PageContainer>
          </Providers>
      </body>
    </html>
  )
}

export default Layout;