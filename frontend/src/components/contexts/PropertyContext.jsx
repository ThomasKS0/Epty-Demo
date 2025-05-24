import { createContext, useContext, useState } from 'react'

const PropertyContext = createContext()

export function PropertyProvider({ children }) {
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    priceRange: [0, 10000000]
  })

  return (
    <PropertyContext.Provider value={{ filters, setFilters }}>
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  return useContext(PropertyContext)
}