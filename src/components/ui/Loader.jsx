export default function Loader({ label = 'Carregando...' }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-12 text-ocean-600">
      <span aria-hidden="true" className="h-8 w-8 animate-spin rounded-full border-4 border-sand-200 border-t-ocean-600" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
