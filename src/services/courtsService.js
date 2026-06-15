import courts from '../data/courts.json'
import slots from '../data/slots.json'

const LATENCY_MS = 500

function simulateRequest(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), LATENCY_MS)
  })
}

export function getCourts() {
  return simulateRequest(courts)
}

export function getCourtById(id) {
  const court = courts.find((c) => c.id === id) ?? null
  return simulateRequest(court)
}

export function getSlots(courtId) {
  return simulateRequest(slots[courtId] ?? [])
}
