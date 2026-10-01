---
title: Usa un bucle para min/max en lugar de sort
impact: LOW
impactDescription: O(n) en lugar de O(n log n)
tags: javascript, arrays, performance, sorting, algorithms
---

## Usa un bucle para min/max en lugar de sort

Encontrar el elemento más pequeño o más grande solo requiere una pasada por el array. Ordenar es un desperdicio y es más lento.

**Incorrecto (O(n log n) - ordenar para encontrar el más reciente):**

```typescript
interface Project {
  id: string
  name: string
  updatedAt: number
}

function getLatestProject(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => b.updatedAt - a.updatedAt)
  return sorted[0]
}
```

Ordena todo el array solo para encontrar el valor máximo.

**Incorrecto (O(n log n) - ordenar para el más antiguo y el más reciente):**

```typescript
function getOldestAndNewest(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => a.updatedAt - b.updatedAt)
  return { oldest: sorted[0], newest: sorted[sorted.length - 1] }
}
```

Sigue ordenando innecesariamente cuando solo se necesitan el mínimo y el máximo.

**Correcto (O(n) - un solo bucle):**

```typescript
function getLatestProject(projects: Project[]) {
  if (projects.length === 0) return null
  
  let latest = projects[0]
  
  for (let i = 1; i < projects.length; i++) {
    if (projects[i].updatedAt > latest.updatedAt) {
      latest = projects[i]
    }
  }
  
  return latest
}

function getOldestAndNewest(projects: Project[]) {
  if (projects.length === 0) return { oldest: null, newest: null }
  
  let oldest = projects[0]
  let newest = projects[0]
  
  for (let i = 1; i < projects.length; i++) {
    if (projects[i].updatedAt < oldest.updatedAt) oldest = projects[i]
    if (projects[i].updatedAt > newest.updatedAt) newest = projects[i]
  }
  
  return { oldest, newest }
}
```

Una sola pasada por el array, sin copias, sin ordenamiento.

**Alternativa (Math.min/Math.max para arrays pequeños):**

```typescript
const numbers = [5, 2, 8, 1, 9]
const min = Math.min(...numbers)
const max = Math.max(...numbers)
```

Esto funciona para arrays pequeños, pero puede ser más lento o directamente lanzar un error para arrays muy grandes debido a las limitaciones del spread operator. La longitud máxima del array es aproximadamente 124000 en Chrome 143 y 638000 en Safari 18; los números exactos pueden variar - consulta [el fiddle](https://jsfiddle.net/qw1jabsx/4/). Usa el enfoque del bucle para mayor confiabilidad.
