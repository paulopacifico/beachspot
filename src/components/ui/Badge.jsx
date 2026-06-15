const TONES = {
  default: 'bg-sand-100 text-ocean-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
}

export default function Badge({ children, tone = 'default' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone] ?? TONES.default}`}>
      {children}
    </span>
  )
}
