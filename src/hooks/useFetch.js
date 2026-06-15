import { useCallback, useEffect, useState } from 'react'

export function useFetch(fetchFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    let active = true
    setState({ data: null, loading: true, error: null })
    Promise.resolve(fetchFn())
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState({ data: null, loading: false, error }))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey])

  return { ...state, reload }
}
