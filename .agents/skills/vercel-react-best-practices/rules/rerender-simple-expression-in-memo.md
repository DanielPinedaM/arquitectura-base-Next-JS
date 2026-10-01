---
title: No envuelvas en useMemo una expresión simple con un tipo de resultado primitivo
impact: LOW-MEDIUM
impactDescription: cómputo desperdiciado en cada render
tags: rerender, useMemo, optimization
---

## No envuelvas en useMemo una expresión simple con un tipo de resultado primitivo

Cuando una expresión es simple (pocos operadores lógicos o aritméticos) y tiene un tipo de resultado primitivo (boolean, number, string), no la envuelvas en `useMemo`.
Llamar a `useMemo` y comparar las dependencias del hook puede consumir más recursos que la propia expresión.

**Incorrecto:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = useMemo(() => {
    return user.isLoading || notifications.isLoading
  }, [user.isLoading, notifications.isLoading])

  if (isLoading) return <Skeleton />
  // devuelve algo de markup
}
```

**Correcto:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = user.isLoading || notifications.isLoading

  if (isLoading) return <Skeleton />
  // devuelve algo de markup
}
```
