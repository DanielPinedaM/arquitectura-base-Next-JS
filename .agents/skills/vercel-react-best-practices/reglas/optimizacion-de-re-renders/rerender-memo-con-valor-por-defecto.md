---

title: Extrae a una constante el valor por defecto no primitivo de un parámetro de un componente memoizado
impact: MEDIUM
impactDescription: restablece la memoization usando una constante para el valor por defecto
tags: rerender, memo, optimization

---

## Extrae a una constante el valor por defecto no primitivo de un parámetro de un componente memoizado

Cuando un componente memoizado tiene un valor por defecto para algún parámetro opcional no primitivo, como un array, una función o un objeto, llamar al componente sin ese parámetro rompe la memoization. Esto se debe a que se crean nuevas instancias del valor en cada rerender, y estas no pasan la comparación de igualdad estricta en `memo()`.

Para resolver este problema, extrae el valor por defecto a una constante.

**Incorrecto (`onClick` tiene valores diferentes en cada rerender):**

```tsx
const UserAvatar = memo(function UserAvatar({ onClick = () => {} }: { onClick?: () => void }) {
  // ...
})

// Se usa sin el onClick opcional
<UserAvatar />
```

**Correcto (valor por defecto estable):**

```tsx
const NOOP = () => {};

const UserAvatar = memo(function UserAvatar({ onClick = NOOP }: { onClick?: () => void }) {
  // ...
})

// Se usa sin el onClick opcional
<UserAvatar />
```
