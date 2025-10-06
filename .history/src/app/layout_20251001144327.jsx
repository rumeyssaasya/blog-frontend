"use client"
import Providers from './Providers'
import { Provider } from 'react-redux'
import './globals.css'
import { Header } from './components/layout/Header'
import Footer from './components/layout/Footer'
import {store} from './redux/store/store'
import { useTheme } from 'next-themes';

function Layout({ children }) {
  const { theme, mounted } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{backgroundColor: mounted? theme === 'dark'? '#18191a': '#f9f9f9'}}>
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