export default function EmptyState({ title = 'Nada por aqui', message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-gray-500">
      <p className="text-lg font-semibold text-gray-700">{title}</p>
      {message && <p className="text-sm">{message}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
