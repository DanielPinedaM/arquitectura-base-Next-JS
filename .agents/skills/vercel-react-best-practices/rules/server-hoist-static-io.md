---
title: Haz hoisting de la I/O estática al nivel del módulo
impact: HIGH
impactDescription: evita la I/O repetida de archivos/red en cada petición
tags: server, io, performance, next.js, route-handlers, og-image
---

## Haz hoisting de la I/O estática al nivel del módulo

**Impacto: HIGH (evita la I/O repetida de archivos/red en cada petición)**

Al cargar assets estáticos (fuentes, logos, imágenes, archivos de configuración) en route handlers o funciones del servidor, haz hoisting de la operación de I/O al nivel del módulo. El código a nivel de módulo se ejecuta una vez cuando el módulo se importa por primera vez, no en cada petición. Esto elimina las lecturas redundantes del sistema de archivos o los fetches de red que, de otro modo, se ejecutarían en cada invocación.

**Incorrecto (lee el archivo de la fuente en cada petición):**

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  // Se ejecuta en CADA petición - ¡costoso!
  const fontData = await fetch(
    new URL('./fonts/Inter.ttf', import.meta.url)
  ).then(res => res.arrayBuffer())

  const logoData = await fetch(
    new URL('./images/logo.png', import.meta.url)
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    <div style={{ fontFamily: 'Inter' }}>
      <img src={logoData} />
      Hello World
    </div>,
    { fonts: [{ name: 'Inter', data: fontData }] }
  )
}
```

**Correcto (se carga una vez al inicializar el módulo):**

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

// Nivel de módulo: se ejecuta UNA VEZ cuando el módulo se importa por primera vez
const fontData = fetch(
  new URL('./fonts/Inter.ttf', import.meta.url)
).then(res => res.arrayBuffer())

const logoData = fetch(
  new URL('./images/logo.png', import.meta.url)
).then(res => res.arrayBuffer())

export async function GET(request: Request) {
  // Hace await de las promises ya iniciadas
  const [font, logo] = await Promise.all([fontData, logoData])

  return new ImageResponse(
    <div style={{ fontFamily: 'Inter' }}>
      <img src={logo} />
      Hello World
    </div>,
    { fonts: [{ name: 'Inter', data: font }] }
  )
}
```

**Correcto (fs síncrono a nivel de módulo):**

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// Lectura síncrona a nivel de módulo - bloquea solo durante la inicialización del módulo
const fontData = readFileSync(
  join(process.cwd(), 'public/fonts/Inter.ttf')
)

const logoData = readFileSync(
  join(process.cwd(), 'public/images/logo.png')
)

export async function GET(request: Request) {
  return new ImageResponse(
    <div style={{ fontFamily: 'Inter' }}>
      <img src={logoData} />
      Hello World
    </div>,
    { fonts: [{ name: 'Inter', data: fontData }] }
  )
}
```

**Incorrecto (lee la configuración en cada llamada):**

```typescript
import fs from 'node:fs/promises'

export async function processRequest(data: Data) {
  const config = JSON.parse(
    await fs.readFile('./config.json', 'utf-8')
  )
  const template = await fs.readFile('./template.html', 'utf-8')

  return render(template, data, config)
}
```

**Correcto (hace hoisting de la configuración y la plantilla al nivel del módulo):**

```typescript
import fs from 'node:fs/promises'

const configPromise = fs
  .readFile('./config.json', 'utf-8')
  .then(JSON.parse)
const templatePromise = fs.readFile('./template.html', 'utf-8')

export async function processRequest(data: Data) {
  const [config, template] = await Promise.all([
    configPromise,
    templatePromise,
  ])

  return render(template, data, config)
}
```

Cuándo usar este patrón:

- Cargar fuentes para la generación de imágenes OG
- Cargar logos, íconos o marcas de agua estáticos
- Leer archivos de configuración que no cambian en runtime
- Cargar plantillas de email u otras plantillas estáticas
- Cualquier asset estático que sea igual en todas las peticiones

Cuándo no usar este patrón:

- Assets que varían por petición o por usuario
- Archivos que pueden cambiar durante el runtime (en su lugar, usa caching con TTL)
- Archivos grandes que consumirían demasiada memoria si se mantienen cargados
- Datos sensibles que no deben persistir en memoria

Con [Fluid Compute](https://vercel.com/docs/fluid-compute) de Vercel, el caching a nivel de módulo es especialmente efectivo porque múltiples peticiones concurrentes comparten la misma instancia de la función. Los assets estáticos se mantienen cargados en memoria entre peticiones sin penalizaciones de cold start.

En serverless tradicional, cada cold start vuelve a ejecutar el código a nivel de módulo, pero las invocaciones en caliente posteriores reutilizan los assets cargados hasta que la instancia se recicla.
