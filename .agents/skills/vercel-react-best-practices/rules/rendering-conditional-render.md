---
title: Usa renderizado condicional explícito
impact: LOW
impactDescription: evita renderizar 0 o NaN
tags: rendering, conditional, jsx, falsy-values
---

## Usa renderizado condicional explícito

Usa operadores ternarios explícitos (`? :`) en lugar de `&&` para el renderizado condicional cuando la condición pueda ser `0`, `NaN` u otros valores falsy que se renderizan.

**Incorrecto (renderiza "0" cuando count es 0):**

```tsx
function Badge({ count }: { count: number }) {
  return (
    <div>
      {count && <span className="badge">{count}</span>}
    </div>
  )
}

// Cuando count = 0, renderiza: <div>0</div>
// Cuando count = 5, renderiza: <div><span class="badge">5</span></div>
```

**Correcto (no renderiza nada cuando count es 0):**

```tsx
function Badge({ count }: { count: number }) {
  return (
    <div>
      {count > 0 ? <span className="badge">{count}</span> : null}
    </div>
  )
}

// Cuando count = 0, renderiza: <div></div>
// Cuando count = 5, renderiza: <div><span class="badge">5</span></div>
```
