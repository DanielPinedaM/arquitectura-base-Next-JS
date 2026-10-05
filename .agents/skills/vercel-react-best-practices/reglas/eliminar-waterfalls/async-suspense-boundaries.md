---
title: Suspense boundaries estratégicos
impact: HIGH
impactDescription: primer pintado más rápido
tags: async, suspense, streaming, layout-shift
---

## Suspense boundaries estratégicos

En lugar de hacer await de los datos en componentes asíncronos antes de devolver el JSX, usa Suspense boundaries para mostrar más rápido la UI contenedora mientras se cargan los datos.

**Incorrecto (el contenedor queda bloqueado por la obtención de datos):**

```tsx
async function Page() {
  const data = await fetchData() // Bloquea toda la página
  
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <DataDisplay data={data} />
      </div>
      <div>Footer</div>
    </div>
  )
}
```

Todo el layout espera los datos aunque solo la sección central los necesita.

**Correcto (el contenedor se muestra de inmediato, los datos llegan por streaming):**

```tsx
function Page() {
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <Suspense fallback={<Skeleton />}>
          <DataDisplay />
        </Suspense>
      </div>
      <div>Footer</div>
    </div>
  )
}

async function DataDisplay() {
  const data = await fetchData() // Solo bloquea este componente
  return <div>{data.content}</div>
}
```

Sidebar, Header y Footer se renderizan de inmediato. Solo DataDisplay espera los datos.

**Alternativa (compartir la promise entre componentes):**

```tsx
function Page() {
  // Inicia el fetch de inmediato, pero no hagas await
  const dataPromise = fetchData()
  
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <Suspense fallback={<Skeleton />}>
        <DataDisplay dataPromise={dataPromise} />
        <DataSummary dataPromise={dataPromise} />
      </Suspense>
      <div>Footer</div>
    </div>
  )
}

function DataDisplay({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Desenvuelve la promise
  return <div>{data.content}</div>
}

function DataSummary({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise) // Reutiliza la misma promise
  return <div>{data.summary}</div>
}
```

Ambos componentes comparten la misma promise, por lo que solo ocurre un fetch. El layout se renderiza de inmediato mientras ambos componentes esperan juntos.

**Cuándo NO usar este patrón:**

- Datos críticos necesarios para decisiones de layout (afectan el posicionamiento)
- Contenido crítico para el SEO en la parte superior de la página (above the fold)
- Queries pequeñas y rápidas donde el overhead de suspense no vale la pena
- Cuando quieres evitar el layout shift (salto de carga → contenido)

**Compromiso:** Primer pintado más rápido vs. posible layout shift. Elige según tus prioridades de UX.
