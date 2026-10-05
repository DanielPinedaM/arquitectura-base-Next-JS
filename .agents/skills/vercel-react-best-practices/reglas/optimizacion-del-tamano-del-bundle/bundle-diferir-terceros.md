---
title: Difiere las librerías de terceros no críticas
impact: MEDIUM
impactDescription: se carga después de la hydration
tags: bundle, third-party, analytics, defer
---

## Difiere las librerías de terceros no críticas

Las analíticas, el logging y el seguimiento de errores no bloquean la interacción del usuario. Cárgalos después de la hydration.

**Incorrecto (bloquea el bundle inicial):**

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Correcto (se carga después de la hydration):**

```tsx
import dynamic from 'next/dynamic'

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```
