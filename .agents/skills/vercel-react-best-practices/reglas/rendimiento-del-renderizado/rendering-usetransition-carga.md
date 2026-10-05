---
title: Usa useTransition en lugar de estados de carga manuales
impact: LOW
impactDescription: reduce los re-renders y mejora la claridad del código
tags: rendering, transitions, useTransition, loading, state
---

## Usa useTransition en lugar de estados de carga manuales

Usa `useTransition` en lugar de `useState` manual para los estados de carga. Proporciona un estado `isPending` integrado y gestiona las transiciones automáticamente.

**Incorrecto (estado de carga manual):**

```tsx
function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setIsLoading(true)
    setQuery(value)
    const data = await fetchResults(value)
    setResults(data)
    setIsLoading(false)
  }

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isLoading && <Spinner />}
      <ResultsList results={results} />
    </>
  )
}
```

**Correcto (useTransition con estado pending integrado):**

```tsx
import { useTransition, useState } from 'react'

function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setQuery(value) // Actualiza el input de inmediato
    
    startTransition(async () => {
      // Obtiene y actualiza los resultados
      const data = await fetchResults(value)
      setResults(data)
    })
  }

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  )
}
```

**Beneficios:**

- **Estado pending automático**: No es necesario gestionar manualmente `setIsLoading(true/false)`
- **Resiliencia ante errores**: El estado pending se restablece correctamente incluso si la transición lanza un error
- **Mejor capacidad de respuesta**: Mantiene la UI responsiva durante las actualizaciones
- **Manejo de interrupciones**: Las nuevas transiciones cancelan automáticamente las pendientes

Referencia: [useTransition](https://react.dev/reference/react/useTransition)
