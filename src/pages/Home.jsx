import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getCourts } from '../services/courtsService'
import SearchBar from '../components/ui/SearchBar'
import CourtList from '../features/courts/CourtList'
import Loader from '../components/ui/Loader'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Home() {
  const navigate = useNavigate()
  const { data: courts, loading, error } = useFetch(getCourts)
  const featured = (courts ?? []).slice(0, 3)

  return (
    <>
      <section className="bg-gradient-to-br from-ocean-600 to-ocean-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-black md:text-5xl">Reserve sua quadra de beach tennis</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Encontre arenas perto de você e garanta seu horário em segundos.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <SearchBar
              placeholder="Busque por bairro ou arena..."
              onSearch={(term) => navigate(term ? `/quadras?q=${encodeURIComponent(term)}` : '/quadras')}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Quadras em destaque</h2>
          <Button variant="ghost" onClick={() => navigate('/quadras')}>Ver todas</Button>
        </div>
        {loading && <Loader />}
        {!loading && error && (
          <EmptyState title="Erro ao carregar quadras" message="Não foi possível carregar as quadras em destaque." />
        )}
        {!loading && !error && <CourtList courts={featured} />}
      </section>
    </>
  )
}
