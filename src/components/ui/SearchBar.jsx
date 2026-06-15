import { useState } from 'react'
import Button from './Button'

export default function SearchBar({ onSearch, placeholder = 'Buscar quadras...', initialValue = '' }) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar quadras"
        className="w-full rounded-xl border border-sand-200 bg-white px-4 py-2 outline-none focus:border-ocean-500"
      />
      <Button type="submit">Buscar</Button>
    </form>
  )
}
