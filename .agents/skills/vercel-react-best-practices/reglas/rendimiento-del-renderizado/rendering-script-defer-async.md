---
title: Usa defer o async en las etiquetas script
impact: HIGH
impactDescription: elimina el bloqueo del renderizado
tags: rendering, script, defer, async, performance
---

## Usa defer o async en las etiquetas script

**Impacto: HIGH (elimina el bloqueo del renderizado)**

Las etiquetas script sin `defer` ni `async` bloquean el parseo del HTML mientras el script se descarga y se ejecuta. Esto retrasa el First Contentful Paint y el Time to Interactive.

- **`defer`**: Se descarga en paralelo, se ejecuta después de que termina el parseo del HTML y mantiene el orden de ejecución
- **`async`**: Se descarga en paralelo, se ejecuta inmediatamente cuando está listo, sin orden garantizado

Usa `defer` para los scripts que dependen del DOM o de otros scripts. Usa `async` para scripts independientes como las analíticas.

**Incorrecto (bloquea el renderizado):**

```tsx
export default function Document() {
  return (
    <html>
      <head>
        <script src="https://example.com/analytics.js" />
        <script src="/scripts/utils.js" />
      </head>
      <body>{/* contenido */}</body>
    </html>
  )
}
```

**Correcto (no bloqueante):**

```tsx
export default function Document() {
  return (
    <html>
      <head>
        {/* Script independiente - usa async */}
        <script src="https://example.com/analytics.js" async />
        {/* Script que depende del DOM - usa defer */}
        <script src="/scripts/utils.js" defer />
      </head>
      <body>{/* contenido */}</body>
    </html>
  )
}
```

**Nota:** En Next.js, prefiere el componente `next/script` con la prop `strategy` en lugar de etiquetas script directas:

```tsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/analytics.js" strategy="afterInteractive" />
      <Script src="/scripts/utils.js" strategy="beforeInteractive" />
    </>
  )
}
```

Referencia: [MDN - Elemento script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer)
