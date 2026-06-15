import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getCourts } from '../services/courtsService'
import SearchBar from '../components/ui/SearchBar'
import CourtFilters from '../features/courts/CourtFilters'
import CourtList from '../features/courts/CourtList'
import Loader from '../components/ui/Loader'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Courts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const { data: courts, loading, error, reload } = useFetch(getCourts)
  const [filters, setFilters] = useState({ neighborhood: '', maxPrice: '' })

  const neighborhoods = useMemo(
    () => [...new Set((courts ?? []).map((c) => c.neighborhood))],
    [courts],
  )

  const visible = useMemo(() => {
    return (courts ?? []).filter((court) => {
      const term = query.toLowerCase()
      const matchesQuery =
        !term || court.name.toLowerCase().includes(term) || court.neighborhood.toLowerCase().includes(term)
      const matchesNeighborhood = !filters.neighborhood || court.neighborhood === filters.neighborhood
      const matchesPrice = !filters.maxPrice || court.pricePerHour <= Number(filters.maxPrice)
      return matchesQuery && matchesNeighborhood && matchesPrice
    })
  }, [courts, query, filters])

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900">Quadras</h1>
      <SearchBar key={query} initialValue={query} onSearch={(term) => setSearchParams(term ? { q: term } : {})} />
      <CourtFilters neighborhoods={neighborhoods} value={filters} onChange={setFilters} />

      {loading && <Loader />}
      {error && (
        <EmptyState
          title="Erro ao carregar dados"
          message="Não foi possível buscar as quadras."
          action={<Button onClick={reload}>Tentar novamente</Button>}
        />
      )}
      {!loading && !error && visible.length === 0 && (
        <EmptyState title="Nenhuma quadra encontrada" message="Tente ajustar a busca ou os filtros." />
      )}
      {!loading && !error && visible.length > 0 && <CourtList courts={visible} />}
    </section>
  )
}
