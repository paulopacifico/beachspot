import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-6xl font-black text-ocean-600">404</p>
      <h1 className="text-2xl font-bold text-gray-900">Página não encontrada</h1>
      <p className="text-gray-600">A página que você procura não existe ou foi movida.</p>
      <Link to="/"><Button>Voltar para o início</Button></Link>
    </section>
  )
}
