---
title: Usa useRef para valores transitorios
impact: MEDIUM
impactDescription: evita re-renders innecesarios en actualizaciones frecuentes
tags: rerender, useref, state, performance
---

## Usa useRef para valores transitorios

Cuando un valor cambia con frecuencia y no quieres un re-render en cada actualización (p. ej., rastreadores del mouse, intervalos, flags transitorios), almacénalo en `useRef` en lugar de `useState`. Mantén el estado del componente para la UI; usa refs para valores temporales relacionados con el DOM. Actualizar una ref no dispara un re-render.

**Incorrecto (renderiza en cada actualización):**

```tsx
function Tracker() {
  const [lastX, setLastX] = useState(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setLastX(e.clientX)
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: lastX,
        width: 8,
        height: 8,
        background: 'black',
      }}
    />
  )
}
```

**Correcto (sin re-render para el rastreo):**

```tsx
function Tracker() {
  const lastXRef = useRef(0)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastXRef.current = e.clientX
      const node = dotRef.current
      if (node) {
        node.style.transform = `translateX(${e.clientX}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 8,
        height: 8,
        background: 'black',
        transform: 'translateX(0px)',
      }}
    />
  )
}
```
