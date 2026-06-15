import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimeSlotGrid from './TimeSlotGrid'

const slots = [
  { time: '08:00', available: true },
  { time: '09:00', available: false },
]

describe('TimeSlotGrid', () => {
  it('selects an available slot', async () => {
    const onSelect = vi.fn()
    render(<TimeSlotGrid slots={slots} selected={null} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: '08:00' }))
    expect(onSelect).toHaveBeenCalledWith('08:00')
  })

  it('does not select an unavailable slot', async () => {
    const onSelect = vi.fn()
    render(<TimeSlotGrid slots={slots} selected={null} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: '09:00' }))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
