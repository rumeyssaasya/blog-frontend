"use client"
import Providers from './Providers'
import { Provider } from 'react-redux'
import PageContainer from './components/container/PageContainer'
import './globals.css'
import { Header } from './components/layout/Header'
import Footer from './components/layout/Footer'
import {store} from './redux/store/store'




function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='dark' >
        <Provider store={store}> 
          <Providers>
            <PageContainer>
              <Header />
              {children}
              <Footer />
            </PageContainer>
          </Providers>
        </Provider>  
      </body>
    </html>
  )
}

export default Layout;