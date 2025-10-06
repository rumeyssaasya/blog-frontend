"use client"
import Providers from './Providers'
import { Provider } from 'react-redux'
import './globals.css'
import { Header } from './components/layout/Header'
import Footer from './components/layout/Footer'
import {store} from './redux/store/store'
import { useTheme } from 'next-themes';

function Layout({ children }) {
  const theme= useTheme().theme;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='dark:bg-gray-800' >
        <Provider store={store}> 
          <Providers>
              <Header />
              {children}
              <Footer />
          </Providers>
        </Provider>  
      </body>
    </html>
  )
}

export default Layout;