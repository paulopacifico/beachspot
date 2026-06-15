import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

export default function CourtCard({ court }) {
  const navigate = useNavigate()

  return (
    <article className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-md">
      <img src={court.image} alt={court.name} loading="lazy" className="h-44 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900">{court.name}</h3>
          <Badge tone={court.status === 'available' ? 'success' : 'warning'}>
            {court.status === 'available' ? 'Disponível hoje' : 'Lotada'}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{court.neighborhood}</p>
        <div className="flex flex-wrap gap-1">
          {court.features.map((feature) => <Badge key={feature}>{feature}</Badge>)}
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-ocean-700">R$ {court.pricePerHour}/h</span>
          <Button onClick={() => navigate(`/quadras/${court.id}`)}>Ver horários</Button>
        </div>
      </div>
    </article>
  )
}
