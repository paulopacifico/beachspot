import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const BookingContext = createContext(null)
const STORAGE_KEY = 'beachspot.reservations'

export function bookingReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { reservations: [...state.reservations, action.reservation] }
    case 'remove':
      return { reservations: state.reservations.filter((r) => r.id !== action.id) }
    default:
      return state
  }
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return { reservations: raw ? JSON.parse(raw) : [] }
  } catch {
    return { reservations: [] }
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, undefined, init)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.reservations))
  }, [state.reservations])

  const value = useMemo(
    () => ({
      reservations: state.reservations,
      addReservation: (reservation) => dispatch({ type: 'add', reservation }),
      removeReservation: (id) => dispatch({ type: 'remove', id }),
    }),
    [state.reservations],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
