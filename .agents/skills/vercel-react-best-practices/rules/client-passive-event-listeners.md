---
title: Usa event listeners pasivos para el rendimiento del scroll
impact: MEDIUM
impactDescription: elimina el retraso del scroll causado por los event listeners
tags: client, event-listeners, scrolling, performance, touch, wheel
---

## Usa event listeners pasivos para el rendimiento del scroll

Agrega `{ passive: true }` a los event listeners de touch y wheel para habilitar el scroll inmediato. Normalmente, los navegadores esperan a que los listeners terminen para verificar si se llama a `preventDefault()`, lo que provoca un retraso en el scroll.

**Incorrecto:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)
  
  document.addEventListener('touchstart', handleTouch)
  document.addEventListener('wheel', handleWheel)
  
  return () => {
    document.removeEventListener('touchstart', handleTouch)
    document.removeEventListener('wheel', handleWheel)
  }
}, [])
```

**Correcto:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)
  
  document.addEventListener('touchstart', handleTouch, { passive: true })
  document.addEventListener('wheel', handleWheel, { passive: true })
  
  return () => {
    document.removeEventListener('touchstart', handleTouch)
    document.removeEventListener('wheel', handleWheel)
  }
}, [])
```

**Usa passive cuando:** hagas seguimiento/analíticas, logging, o en cualquier listener que no llame a `preventDefault()`.

**No uses passive cuando:** implementes gestos de swipe personalizados, controles de zoom personalizados o cualquier listener que necesite `preventDefault()`.
