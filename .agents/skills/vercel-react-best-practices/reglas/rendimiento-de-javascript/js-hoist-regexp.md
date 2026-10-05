---
title: Haz hoisting de la creación de RegExp
impact: LOW-MEDIUM
impactDescription: evita la recreación
tags: javascript, regexp, optimization, memoization
---

## Haz hoisting de la creación de RegExp

No crees RegExp dentro del render. Haz hoisting al scope del módulo o memoízala con `useMemo()`.

**Incorrecto (nueva RegExp en cada render):**

```tsx
function Highlighter({ text, query }: Props) {
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

**Correcto (memoiza o haz hoisting):**

```tsx
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Highlighter({ text, query }: Props) {
  const regex = useMemo(
    () => new RegExp(`(${escapeRegex(query)})`, 'gi'),
    [query]
  )
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

**Advertencia (una regex global tiene estado mutable):**

Una regex global (`/g`) tiene un estado `lastIndex` mutable:

```typescript
const regex = /foo/g
regex.test('foo')  // true, lastIndex = 3
regex.test('foo')  // false, lastIndex = 0
```
