import { describe, it, expect } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetch } from './useFetch'

describe('useFetch', () => {
  it('starts loading, then exposes data on success', async () => {
    const { result } = renderHook(() => useFetch(() => Promise.resolve(['a', 'b'])))
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toEqual(['a', 'b'])
    expect(result.current.error).toBeNull()
  })

  it('captures errors', async () => {
    const { result } = renderHook(() => useFetch(() => Promise.reject(new Error('boom'))))
    await waitFor(() => expect(result.current.error).toBeTruthy())
    expect(result.current.error.message).toBe('boom')
    expect(result.current.data).toBeNull()
  })

  it('reload triggers a second fetch', async () => {
    let count = 0
    const { result } = renderHook(() =>
      useFetch(() => {
        count += 1
        return Promise.resolve(count)
      }),
    )
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toBe(1)

    act(() => result.current.reload())
    await waitFor(() => expect(result.current.data).toBe(2))
    expect(count).toBe(2)
  })
})
