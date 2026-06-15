import CourtCard from './CourtCard'

export default function CourtList({ courts }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => <CourtCard key={court.id} court={court} />)}
    </div>
  )
}
