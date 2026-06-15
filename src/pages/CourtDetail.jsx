import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getCourtById, getSlots } from '../services/courtsService'
import { useBooking } from '../features/booking/BookingContext'
import { useToast } from '../components/ui/Toast'
import TimeSlotGrid from '../features/booking/TimeSlotGrid'
import Modal from '../components/ui/Modal'
import Loader from '../components/ui/Loader'
import EmptyState from '../components/ui/EmptyState'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function CourtDetail() {
  const { courtId } = useParams()
  const navigate = useNavigate()
  const { addReservation } = useBooking()
  const { showToast } = useToast()

  const { data: court, loading: loadingCourt } = useFetch(() => getCourtById(courtId), [courtId])
  const { data: slots, loading: loadingSlots, error: slotsError } = useFetch(() => getSlots(courtId), [courtId])

  const [selected, setSelected] = useState(null)
  const [confirming, setConfirming] = useState(false)

  // Reset the chosen slot whenever the court changes, so a slot from a
  // previous court cannot be booked on a different one.
  useEffect(() => {
    setSelected(null)
  }, [courtId])

  if (loadingCourt) return <Loader />
  if (!court) {
    return (
      <EmptyState
        title="Quadra não encontrada"
        action={<Link to="/quadras"><Button>Ver quadras</Button></Link>}
      />
    )
  }

  function confirmBooking() {
    addReservation({
      id: crypto.randomUUID(),
      courtId: court.id,
      courtName: court.name,
      time: selected,
      date: new Date().toISOString().slice(0, 10),
      createdAt: Date.now(),
    })
    setConfirming(false)
    showToast('Reserva confirmada com sucesso!')
    navigate('/reservas')
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <Link to="/quadras" className="text-sm text-ocean-600 hover:underline">← Voltar para quadras</Link>

      <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
        <img src={court.image} alt={court.name} className="h-56 w-full object-cover" />
        <div className="space-y-2 p-6">
          <h1 className="text-2xl font-bold text-gray-900">{court.name}</h1>
          <p className="text-gray-500">{court.neighborhood} · R$ {court.pricePerHour}/h</p>
          <div className="flex flex-wrap gap-1">
            {court.features.map((feature) => <Badge key={feature}>{feature}</Badge>)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Escolha um horário (hoje)</h2>
        {loadingSlots && <Loader />}
        {!loadingSlots && slotsError && (
          <EmptyState title="Erro ao carregar horários" message="Não foi possível carregar os horários desta quadra." />
        )}
        {!loadingSlots && !slotsError && (
          <TimeSlotGrid slots={slots ?? []} selected={selected} onSelect={setSelected} />
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-sand-50 p-4">
        <span className="text-sm text-gray-600">
          {selected ? `Horário selecionado: ${selected}` : 'Selecione um horário disponível'}
        </span>
        <Button disabled={!selected} onClick={() => setConfirming(true)}>Reservar</Button>
      </div>

      <Modal
        open={confirming}
        title="Confirmar reserva"
        confirmLabel="Confirmar reserva"
        onConfirm={confirmBooking}
        onCancel={() => setConfirming(false)}
      >
        Reservar <strong>{court.name}</strong> às <strong>{selected}</strong> de hoje?
      </Modal>
    </section>
  )
}
