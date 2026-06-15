import { describe, it, expect } from 'vitest'
import { bookingReducer } from './BookingContext'

describe('bookingReducer', () => {
  it('adds a reservation', () => {
    const next = bookingReducer({ reservations: [] }, { type: 'add', reservation: { id: '1' } })
    expect(next.reservations).toHaveLength(1)
    expect(next.reservations[0].id).toBe('1')
  })

  it('removes a reservation by id', () => {
    const start = { reservations: [{ id: '1' }, { id: '2' }] }
    const next = bookingReducer(start, { type: 'remove', id: '1' })
    expect(next.reservations.map((r) => r.id)).toEqual(['2'])
  })

  it('ignores unknown actions', () => {
    const start = { reservations: [{ id: '1' }] }
    expect(bookingReducer(start, { type: 'noop' })).toBe(start)
  })
})
