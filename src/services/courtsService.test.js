import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCourts, getCourtById, getSlots } from './courtsService'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

async function resolve(promise) {
  await vi.runAllTimersAsync()
  return promise
}

describe('courtsService', () => {
  it('getCourts resolves a non-empty array of courts', async () => {
    const courts = await resolve(getCourts())
    expect(Array.isArray(courts)).toBe(true)
    expect(courts.length).toBeGreaterThan(0)
    expect(courts[0]).toHaveProperty('id')
  })

  it('getCourtById returns the matching court', async () => {
    const court = await resolve(getCourtById('arena-ipanema'))
    expect(court).not.toBeNull()
    expect(court.name).toBe('Arena Ipanema')
  })

  it('getCourtById returns null for an unknown id', async () => {
    const court = await resolve(getCourtById('does-not-exist'))
    expect(court).toBeNull()
  })

  it('getSlots returns the slot list for a court', async () => {
    const slots = await resolve(getSlots('arena-copacabana'))
    expect(slots.length).toBeGreaterThan(0)
    expect(slots[0]).toHaveProperty('time')
    expect(slots[0]).toHaveProperty('available')
  })

  it('getSlots returns an empty list for an unknown court', async () => {
    const slots = await resolve(getSlots('does-not-exist'))
    expect(slots).toEqual([])
  })
})
