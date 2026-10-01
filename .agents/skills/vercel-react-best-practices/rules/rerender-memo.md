---
title: Extrae a componentes memoizados
impact: MEDIUM
impactDescription: permite early returns
tags: rerender, memo, useMemo, optimization
---

## Extrae a componentes memoizados

Extrae el trabajo costoso a componentes memoizados para permitir early returns antes del cómputo.

**Incorrecto (calcula el avatar incluso durante la carga):**

```tsx
function Profile({ user, loading }: Props) {
  const avatar = useMemo(() => {
    const id = computeAvatarId(user)
    return <Avatar id={id} />
  }, [user])

  if (loading) return <Skeleton />
  return <div>{avatar}</div>
}
```

**Correcto (omite el cómputo durante la carga):**

```tsx
const UserAvatar = memo(function UserAvatar({ user }: { user: User }) {
  const id = useMemo(() => computeAvatarId(user), [user])
  return <Avatar id={id} />
})

function Profile({ user, loading }: Props) {
  if (loading) return <Skeleton />
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  )
}
```

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, la memoization manual con `memo()` y `useMemo()` no es necesaria. El compiler optimiza automáticamente los re-renders.
