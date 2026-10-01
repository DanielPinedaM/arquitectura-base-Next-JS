---
title: Usa los resource hints de React DOM
impact: HIGH
impactDescription: reduce el tiempo de carga de los recursos críticos
tags: rendering, preload, preconnect, prefetch, resource-hints
---

## Usa los resource hints de React DOM

**Impacto: HIGH (reduce el tiempo de carga de los recursos críticos)**

React DOM proporciona APIs para indicarle al navegador los recursos que va a necesitar. Son especialmente útiles en los server components para empezar a cargar recursos antes de que el cliente siquiera reciba el HTML.

- **`prefetchDNS(href)`**: Resuelve el DNS de un dominio al que esperas conectarte
- **`preconnect(href)`**: Establece la conexión (DNS + TCP + TLS) con un servidor
- **`preload(href, options)`**: Obtiene un recurso (stylesheet, fuente, script, imagen) que usarás pronto
- **`preloadModule(href)`**: Obtiene un módulo ES que usarás pronto
- **`preinit(href, options)`**: Obtiene y evalúa un stylesheet o script
- **`preinitModule(href)`**: Obtiene y evalúa un módulo ES

**Ejemplo (preconnect a APIs de terceros):**

```tsx
import { preconnect, prefetchDNS } from 'react-dom'

export default function App() {
  prefetchDNS('https://analytics.example.com')
  preconnect('https://api.example.com')

  return <main>{/* contenido */}</main>
}
```

**Ejemplo (preload de fuentes y estilos críticos):**

```tsx
import { preload, preinit } from 'react-dom'

export default function RootLayout({ children }) {
  // Preload del archivo de la fuente
  preload('/fonts/inter.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

  // Obtiene y aplica de inmediato el stylesheet crítico
  preinit('/styles/critical.css', { as: 'style' })

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

**Ejemplo (preload de módulos para rutas con code splitting):**

```tsx
import { preloadModule, preinitModule } from 'react-dom'

function Navigation() {
  const preloadDashboard = () => {
    preloadModule('/dashboard.js', { as: 'script' })
  }

  return (
    <nav>
      <a href="/dashboard" onMouseEnter={preloadDashboard}>
        Dashboard
      </a>
    </nav>
  )
}
```

**Cuándo usar cada uno:**

| API | Caso de uso |
|-----|----------|
| `prefetchDNS` | Dominios de terceros a los que te conectarás más tarde |
| `preconnect` | APIs o CDNs de los que harás fetch de inmediato |
| `preload` | Recursos críticos necesarios para la página actual |
| `preloadModule` | Módulos JS para la siguiente navegación probable |
| `preinit` | Stylesheets/scripts que deben ejecutarse temprano |
| `preinitModule` | Módulos ES que deben ejecutarse temprano |

Referencia: [APIs de precarga de recursos de React DOM](https://react.dev/reference/react-dom#resource-preloading-apis)
