import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Início', exact: true },
  { to: '/quadras', label: 'Quadras' },
  { to: '/reservas', label: 'Reservas' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isActive = (to, exact) => (exact ? pathname === to : pathname.startsWith(to))

  const linkClass = (link) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive(link.to, link.exact) ? 'bg-ocean-600 text-white' : 'text-ocean-700 hover:bg-sand-100'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-ocean-700" onClick={() => setOpen(false)}>BeachSpot</Link>

        <nav aria-label="Principal" className="hidden gap-1 sm:flex">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link)}>{link.label}</Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ocean-700 hover:bg-sand-100 sm:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <nav aria-label="Menu mobile" className="flex flex-col gap-1 border-t border-sand-200 px-4 py-2 sm:hidden">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link)} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
