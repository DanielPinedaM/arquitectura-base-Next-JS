---
title: Anima el wrapper del SVG en lugar del elemento SVG
impact: LOW
impactDescription: habilita la aceleración por hardware
tags: rendering, svg, css, animation, performance
---

## Anima el wrapper del SVG en lugar del elemento SVG

Muchos navegadores no tienen aceleración por hardware para las animaciones CSS3 en elementos SVG. Envuelve el SVG en un `<div>` y anima el wrapper en su lugar.

**Incorrecto (animar el SVG directamente - sin aceleración por hardware):**

```tsx
function LoadingSpinner() {
  return (
    <svg 
      className="animate-spin"
      width="24" 
      height="24" 
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
    </svg>
  )
}
```

**Correcto (animar el div wrapper - acelerado por hardware):**

```tsx
function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
      </svg>
    </div>
  )
}
```

Esto aplica a todas las transformaciones y transiciones CSS (`transform`, `opacity`, `translate`, `scale`, `rotate`). El div wrapper permite que los navegadores usen la aceleración por GPU para animaciones más fluidas.
