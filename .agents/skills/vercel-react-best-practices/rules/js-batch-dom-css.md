---
title: Evita el layout thrashing
impact: MEDIUM
impactDescription: evita layouts síncronos forzados y reduce los cuellos de botella de rendimiento
tags: javascript, dom, css, performance, reflow, layout-thrashing
---

## Evita el layout thrashing

Evita intercalar escrituras de estilos con lecturas de layout. Cuando lees una propiedad de layout (como `offsetWidth`, `getBoundingClientRect()` o `getComputedStyle()`) entre cambios de estilo, el navegador se ve obligado a disparar un reflow síncrono.

**Esto está bien (el navegador agrupa los cambios de estilo):**
```typescript
function updateElementStyles(element: HTMLElement) {
  // Cada línea invalida el estilo, pero el navegador agrupa el recálculo
  element.style.width = '100px'
  element.style.height = '200px'
  element.style.backgroundColor = 'blue'
  element.style.border = '1px solid black'
}
```

**Incorrecto (las lecturas y escrituras intercaladas fuerzan reflows):**
```typescript
function layoutThrashing(element: HTMLElement) {
  element.style.width = '100px'
  const width = element.offsetWidth  // Fuerza un reflow
  element.style.height = '200px'
  const height = element.offsetHeight  // Fuerza otro reflow
}
```

**Correcto (agrupa las escrituras y luego lee una sola vez):**
```typescript
function updateElementStyles(element: HTMLElement) {
  // Agrupa todas las escrituras juntas
  element.style.width = '100px'
  element.style.height = '200px'
  element.style.backgroundColor = 'blue'
  element.style.border = '1px solid black'
  
  // Lee después de que terminen todas las escrituras (un solo reflow)
  const { width, height } = element.getBoundingClientRect()
}
```

**Correcto (agrupa las lecturas y luego las escrituras):**
```typescript
function avoidThrashing(element: HTMLElement) {
  // Fase de lectura - todas las consultas de layout primero
  const rect1 = element.getBoundingClientRect()
  const offsetWidth = element.offsetWidth
  const offsetHeight = element.offsetHeight
  
  // Fase de escritura - todos los cambios de estilo después
  element.style.width = '100px'
  element.style.height = '200px'
}
```

**Mejor: usa clases CSS**
```css
.highlighted-box {
  width: 100px;
  height: 200px;
  background-color: blue;
  border: 1px solid black;
}
```
```typescript
function updateElementStyles(element: HTMLElement) {
  element.classList.add('highlighted-box')
  
  const { width, height } = element.getBoundingClientRect()
}
```

**Ejemplo en React:**
```tsx
// Incorrecto: intercalar cambios de estilo con consultas de layout
function Box({ isHighlighted }: { isHighlighted: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current && isHighlighted) {
      ref.current.style.width = '100px'
      const width = ref.current.offsetWidth // Fuerza el layout
      ref.current.style.height = '200px'
    }
  }, [isHighlighted])
  
  return <div ref={ref}>Content</div>
}

// Correcto: alterna la clase
function Box({ isHighlighted }: { isHighlighted: boolean }) {
  return (
    <div className={isHighlighted ? 'highlighted-box' : ''}>
      Content
    </div>
  )
}
```

Prefiere las clases CSS en lugar de los estilos inline cuando sea posible. Los archivos CSS son cacheados por el navegador, y las clases proporcionan una mejor separación de responsabilidades y son más fáciles de mantener.

Consulta [este gist](https://gist.github.com/paulirish/5d52fb081b3570c81e3a) y [CSS Triggers](https://csstriggers.com/) para más información sobre las operaciones que fuerzan el layout.
