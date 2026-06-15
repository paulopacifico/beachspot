const VARIANTS = {
  primary: 'bg-ocean-600 text-white hover:bg-ocean-500 active:scale-[0.98]',
  secondary: 'bg-sand-100 text-ocean-700 hover:bg-sand-200 active:scale-[0.98]',
  ghost: 'bg-transparent text-ocean-700 hover:bg-sand-100',
}

export default function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
