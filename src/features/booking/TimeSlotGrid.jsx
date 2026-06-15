import TimeSlot from './TimeSlot'

export default function TimeSlotGrid({ slots, selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      {slots.map((slot) => (
        <TimeSlot
          key={slot.time}
          time={slot.time}
          available={slot.available}
          selected={selected === slot.time}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
