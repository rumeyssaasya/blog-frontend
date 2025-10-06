import { Header } from './components/layout/Header'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
     <ThemeProvider>
        <main>
          <Header />
        </main>
    </ThemeProvider>
  )
}