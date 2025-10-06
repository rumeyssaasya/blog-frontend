import { Header } from './components/layout/Header'


export default function Home() {
  return (
    <ThemeProvider>
        <main>
          <Header />
        </main>
    </ThemeProvider>
  )
}