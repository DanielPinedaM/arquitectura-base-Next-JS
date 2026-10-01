---
title: Usa la inicialización lazy del estado
impact: MEDIUM
impactDescription: cómputo desperdiciado en cada render
tags: react, hooks, useState, performance, initialization
---

## Usa la inicialización lazy del estado

Pasa una función a `useState` para los valores iniciales costosos. Sin la forma de función, el inicializador se ejecuta en cada render aunque el valor solo se use una vez.

**Incorrecto (se ejecuta en cada render):**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() se ejecuta en CADA render, incluso después de la inicialización
  const [searchIndex, setSearchIndex] = useState(buildSearchIndex(items))
  const [query, setQuery] = useState('')
  
  // Cuando query cambia, buildSearchIndex se ejecuta de nuevo innecesariamente
  return <SearchResults index={searchIndex} query={query} />
}

function UserProfile() {
  // JSON.parse se ejecuta en cada render
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem('settings') || '{}')
  )
  
  return <SettingsForm settings={settings} onChange={setSettings} />
}
```

**Correcto (se ejecuta solo una vez):**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() se ejecuta SOLO en el render inicial
  const [searchIndex, setSearchIndex] = useState(() => buildSearchIndex(items))
  const [query, setQuery] = useState('')
  
  return <SearchResults index={searchIndex} query={query} />
}

function UserProfile() {
  // JSON.parse se ejecuta solo en el render inicial
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('settings')
    return stored ? JSON.parse(stored) : {}
  })
  
  return <SettingsForm settings={settings} onChange={setSettings} />
}
```

Usa la inicialización lazy al calcular valores iniciales a partir de localStorage/sessionStorage, al construir estructuras de datos (índices, maps), al leer del DOM o al realizar transformaciones pesadas.

Para primitivos simples (`useState(0)`), referencias directas (`useState(props.value)`) o literales baratos (`useState({})`), la forma de función es innecesaria.
