import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Courts from '../pages/Courts'
import CourtDetail from '../pages/CourtDetail'
import Reservations from '../pages/Reservations'
import NotFound from '../pages/NotFound'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quadras" element={<Courts />} />
      <Route path="/quadras/:courtId" element={<CourtDetail />} />
      <Route path="/reservas" element={<Reservations />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
