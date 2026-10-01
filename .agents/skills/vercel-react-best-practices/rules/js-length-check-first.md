---
title: Verificación temprana de la longitud en las comparaciones de arrays
impact: MEDIUM-HIGH
impactDescription: evita operaciones costosas cuando las longitudes difieren
tags: javascript, arrays, performance, optimization, comparison
---

## Verificación temprana de la longitud en las comparaciones de arrays

Al comparar arrays con operaciones costosas (ordenamiento, igualdad profunda, serialización), verifica primero las longitudes. Si las longitudes difieren, los arrays no pueden ser iguales.

En aplicaciones del mundo real, esta optimización es especialmente valiosa cuando la comparación se ejecuta en hot paths (event handlers, bucles de render).

**Incorrecto (siempre ejecuta la comparación costosa):**

```typescript
function hasChanges(current: string[], original: string[]) {
  // Siempre ordena y une, incluso cuando las longitudes difieren
  return current.sort().join() !== original.sort().join()
}
```

Se ejecutan dos ordenamientos O(n log n) incluso cuando `current.length` es 5 y `original.length` es 100. También existe el overhead de unir los arrays y comparar los strings.

**Correcto (primero la verificación O(1) de la longitud):**

```typescript
function hasChanges(current: string[], original: string[]) {
  // Early return si las longitudes difieren
  if (current.length !== original.length) {
    return true
  }
  // Solo ordena cuando las longitudes coinciden
  const currentSorted = current.toSorted()
  const originalSorted = original.toSorted()
  for (let i = 0; i < currentSorted.length; i++) {
    if (currentSorted[i] !== originalSorted[i]) {
      return true
    }
  }
  return false
}
```

Este nuevo enfoque es más eficiente porque:
- Evita el overhead de ordenar y unir los arrays cuando las longitudes difieren
- Evita consumir memoria para los strings unidos (especialmente importante para arrays grandes)
- Evita mutar los arrays originales
- Retorna temprano cuando se encuentra una diferencia
