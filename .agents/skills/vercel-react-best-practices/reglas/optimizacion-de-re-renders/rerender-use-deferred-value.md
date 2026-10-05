---
title: Usa useDeferredValue para renders derivados costosos
impact: MEDIUM
impactDescription: mantiene el input responsivo durante cómputos pesados
tags: rerender, useDeferredValue, optimization, concurrent
---

## Usa useDeferredValue para renders derivados costosos

Cuando el input del usuario dispara cómputos o renders costosos, usa `useDeferredValue` para mantener el input responsivo. El valor diferido se queda atrás, lo que permite a React priorizar la actualización del input y renderizar el resultado costoso cuando esté ocioso.

**Incorrecto (el input se siente lento mientras se filtra):**

```tsx
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const filtered = items.filter(item => fuzzyMatch(item, query))

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={filtered} />
    </>
  )
}
```

**Correcto (el input se mantiene ágil, los resultados se renderizan cuando están listos):**

```tsx
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const filtered = useMemo(
    () => items.filter(item => fuzzyMatch(item, deferredQuery)),
    [items, deferredQuery]
  )
  const isStale = query !== deferredQuery

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.7 : 1 }}>
        <ResultsList results={filtered} />
      </div>
    </>
  )
}
```

**Cuándo usarlo:**

- Filtrar/buscar en listas grandes
- Visualizaciones costosas (charts, gráficos) que reaccionan al input
- Cualquier estado derivado que provoque retrasos de render perceptibles

**Nota:** Envuelve el cómputo costoso en `useMemo` con el valor diferido como dependencia; de lo contrario, se seguirá ejecutando en cada render.

Referencia: [React useDeferredValue](https://react.dev/reference/react/useDeferredValue)
