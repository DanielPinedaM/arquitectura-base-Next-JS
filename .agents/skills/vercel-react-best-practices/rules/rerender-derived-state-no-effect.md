---
title: Calcula el estado derivado durante el renderizado
impact: MEDIUM
impactDescription: evita renders redundantes y la desincronización del estado
tags: rerender, derived-state, useEffect, state
---

## Calcula el estado derivado durante el renderizado

Si un valor puede calcularse a partir de las props/el estado actuales, no lo almacenes en el estado ni lo actualices en un effect. Derívalo durante el render para evitar renders adicionales y la desincronización del estado. No establezcas el estado en effects únicamente como respuesta a cambios de props; en su lugar, prefiere valores derivados o resets mediante key.

**Incorrecto (estado y effect redundantes):**

```tsx
function Form() {
  const [firstName, setFirstName] = useState('First')
  const [lastName, setLastName] = useState('Last')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(firstName + ' ' + lastName)
  }, [firstName, lastName])

  return <p>{fullName}</p>
}
```

**Correcto (deriva durante el render):**

```tsx
function Form() {
  const [firstName, setFirstName] = useState('First')
  const [lastName, setLastName] = useState('Last')
  const fullName = firstName + ' ' + lastName

  return <p>{fullName}</p>
}
```

Referencias: [Quizás no necesites un Effect](https://react.dev/learn/you-might-not-need-an-effect)
