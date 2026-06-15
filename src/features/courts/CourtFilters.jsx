export default function CourtFilters({ neighborhoods, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={value.neighborhood}
        onChange={(event) => onChange({ ...value, neighborhood: event.target.value })}
        aria-label="Filtrar por bairro"
        className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">Todos os bairros</option>
        {neighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
      <select
        value={value.maxPrice}
        onChange={(event) => onChange({ ...value, maxPrice: event.target.value })}
        aria-label="Filtrar por preço"
        className="rounded-xl border border-sand-200 bg-white px-3 py-2 text-sm"
      >
        <option value="">Qualquer preço</option>
        <option value="60">Até R$ 60/h</option>
        <option value="90">Até R$ 90/h</option>
        <option value="120">Até R$ 120/h</option>
      </select>
    </div>
  )
}
