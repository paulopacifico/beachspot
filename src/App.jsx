import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AppRouter from './routes/AppRouter'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}
