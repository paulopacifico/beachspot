export default function TimeSlot({ time, available, selected, onSelect }) {
  return (
    <button
      type="button"
      disabled={!available}
      aria-pressed={selected}
      onClick={() => onSelect(time)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
        !available
          ? 'cursor-not-allowed bg-sand-100 text-gray-400 line-through'
          : selected
            ? 'bg-ocean-600 text-white'
            : 'bg-white text-ocean-700 ring-1 ring-sand-200 hover:ring-ocean-500'
      }`}
    >
      {time}
    </button>
  )
}
