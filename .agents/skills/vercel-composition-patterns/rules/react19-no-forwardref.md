---
title: Cambios en la API de React 19
impact: MEDIUM
impactDescription: definiciones de componentes y uso del context más limpios
tags: react19, refs, context, hooks
---

## Cambios en la API de React 19

> **⚠️ Solo React 19+.** Omite esto si estás en React 18 o una versión anterior.

En React 19, `ref` ahora es una prop normal (no se necesita el wrapper `forwardRef`), y `use()` reemplaza a `useContext()`.

**Incorrecto (forwardRef en React 19):**

```tsx
const ComposerInput = forwardRef<TextInput, Props>((props, ref) => {
  return <TextInput ref={ref} {...props} />
})
```

**Correcto (ref como una prop normal):**

```tsx
function ComposerInput({ ref, ...props }: Props & { ref?: React.Ref<TextInput> }) {
  return <TextInput ref={ref} {...props} />
}
```

**Incorrecto (useContext en React 19):**

```tsx
const value = useContext(MyContext)
```

**Correcto (use en lugar de useContext):**

```tsx
const value = use(MyContext)
```

`use()` también puede llamarse de forma condicional, a diferencia de `useContext()`.
