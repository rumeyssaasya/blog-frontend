import Providers from './Providers'
import PageContainer from './components/container/PageContainer'
import CssBaseline from "@mui/material/CssBaseline";
import './globals.css'
import { Header } from './components/layout/Header'


export const metadata = {
  title: 'BlogSite - Modern Blog Platform',
  description: 'Modern blog sitesi',
}

function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <CssBaseline />
          <Providers>
            <PageContainer>
              <Header />
              {children}
            </PageContainer>
          </Providers>
      </body>
    </html>
  )
}

export default Layout;