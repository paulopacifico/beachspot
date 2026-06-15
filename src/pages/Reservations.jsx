import { Link } from 'react-router-dom'
import { useBooking } from '../features/booking/BookingContext'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import Tooltip from '../components/ui/Tooltip'

export default function Reservations() {
  const { reservations, removeReservation } = useBooking()

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Minhas reservas</h1>

      {reservations.length === 0 ? (
        <EmptyState
          title="Você ainda não tem reservas"
          message="Que tal reservar uma quadra agora?"
          action={<Link to="/quadras"><Button>Ver quadras</Button></Link>}
        />
      ) : (
        <ul className="space-y-3">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="flex items-center justify-between rounded-xl border border-sand-200 bg-white p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">{reservation.courtName}</p>
                <p className="text-sm text-gray-500">{reservation.date} · {reservation.time}</p>
              </div>
              <Tooltip label="Cancelar esta reserva">
                <Button variant="ghost" onClick={() => removeReservation(reservation.id)}>Cancelar</Button>
              </Tooltip>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
