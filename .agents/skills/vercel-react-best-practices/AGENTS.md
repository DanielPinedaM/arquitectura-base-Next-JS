# Buenas prácticas de React

**Versión 1.0.0**  
Vercel Engineering  
Enero de 2026

> **Nota:**  
> Este documento está pensado principalmente para que lo sigan agentes y LLMs al mantener,  
> generar o refactorizar codebases de React y Next.js. Los humanos  
> también pueden encontrarlo útil, pero las indicaciones aquí están optimizadas para la automatización  
> y la consistencia en flujos de trabajo asistidos por IA.

---

## Resumen

Guía completa de optimización del rendimiento para aplicaciones de React y Next.js, diseñada para agentes de IA y LLMs. Contiene más de 40 reglas en 8 categorías, priorizadas por impacto, desde críticas (eliminar waterfalls, reducir el tamaño del bundle) hasta incrementales (patrones avanzados). Cada regla incluye explicaciones detalladas, ejemplos del mundo real que comparan implementaciones incorrectas vs. correctas y métricas de impacto específicas para guiar la refactorización y la generación de código automatizadas.

---

## Tabla de contenidos

1. [Eliminar waterfalls](#1-eliminar-waterfalls) — **CRITICAL**
   - 1.1 [Verifica las condiciones baratas antes de los flags asíncronos](#11-verifica-las-condiciones-baratas-antes-de-los-flags-asíncronos)
   - 1.2 [Difiere el await hasta que sea necesario](#12-difiere-el-await-hasta-que-sea-necesario)
   - 1.3 [Paralelización basada en dependencias](#13-paralelización-basada-en-dependencias)
   - 1.4 [Evita las cadenas de waterfalls en las API routes](#14-evita-las-cadenas-de-waterfalls-en-las-api-routes)
   - 1.5 [Promise.all() para operaciones independientes](#15-promiseall-para-operaciones-independientes)
   - 1.6 [Suspense boundaries estratégicos](#16-suspense-boundaries-estratégicos)
2. [Optimización del tamaño del bundle](#2-optimización-del-tamaño-del-bundle) — **CRITICAL**
   - 2.1 [Evita los imports desde barrel files](#21-evita-los-imports-desde-barrel-files)
   - 2.2 [Carga condicional de módulos](#22-carga-condicional-de-módulos)
   - 2.3 [Difiere las librerías de terceros no críticas](#23-difiere-las-librerías-de-terceros-no-críticas)
   - 2.4 [Dynamic imports para los componentes pesados](#24-dynamic-imports-para-los-componentes-pesados)
   - 2.5 [Prefiere paths analizables estáticamente](#25-prefiere-paths-analizables-estáticamente)
   - 2.6 [Haz preload según la intención del usuario](#26-haz-preload-según-la-intención-del-usuario)
3. [Rendimiento del lado del servidor](#3-rendimiento-del-lado-del-servidor) — **HIGH**
   - 3.1 [Autentica las Server Actions como las API routes](#31-autentica-las-server-actions-como-las-api-routes)
   - 3.2 [Evita la serialización duplicada en las props de RSC](#32-evita-la-serialización-duplicada-en-las-props-de-rsc)
   - 3.3 [Evita el estado compartido del módulo para los datos de la petición](#33-evita-el-estado-compartido-del-módulo-para-los-datos-de-la-petición)
   - 3.4 [Caching LRU entre peticiones](#34-caching-lru-entre-peticiones)
   - 3.5 [Haz hoisting de la I/O estática al nivel del módulo](#35-haz-hoisting-de-la-io-estática-al-nivel-del-módulo)
   - 3.6 [Minimiza la serialización en los límites de RSC](#36-minimiza-la-serialización-en-los-límites-de-rsc)
   - 3.7 [Obtención de datos en paralelo con composición de componentes](#37-obtención-de-datos-en-paralelo-con-composición-de-componentes)
   - 3.8 [Obtención en paralelo de datos anidados](#38-obtención-en-paralelo-de-datos-anidados)
   - 3.9 [Deduplicación por petición con React.cache()](#39-deduplicación-por-petición-con-reactcache)
   - 3.10 [Usa after() para operaciones no bloqueantes](#310-usa-after-para-operaciones-no-bloqueantes)
4. [Obtención de datos del lado del cliente](#4-obtención-de-datos-del-lado-del-cliente) — **MEDIUM-HIGH**
   - 4.1 [Deduplica los event listeners globales](#41-deduplica-los-event-listeners-globales)
   - 4.2 [Usa event listeners pasivos para el rendimiento del scroll](#42-usa-event-listeners-pasivos-para-el-rendimiento-del-scroll)
   - 4.3 [Usa SWR para la deduplicación automática](#43-usa-swr-para-la-deduplicación-automática)
   - 4.4 [Versiona y minimiza los datos de localStorage](#44-versiona-y-minimiza-los-datos-de-localstorage)
5. [Optimización de re-renders](#5-optimización-de-re-renders) — **MEDIUM**
   - 5.1 [Calcula el estado derivado durante el renderizado](#51-calcula-el-estado-derivado-durante-el-renderizado)
   - 5.2 [Difiere las lecturas del estado al punto de uso](#52-difiere-las-lecturas-del-estado-al-punto-de-uso)
   - 5.3 [No envuelvas en useMemo una expresión simple con un tipo de resultado primitivo](#53-no-envuelvas-en-usememo-una-expresión-simple-con-un-tipo-de-resultado-primitivo)
   - 5.4 [No definas componentes dentro de componentes](#54-no-definas-componentes-dentro-de-componentes)
   - 5.5 [Extrae a una constante el valor por defecto no primitivo de un parámetro de un componente memoizado](#55-extrae-a-una-constante-el-valor-por-defecto-no-primitivo-de-un-parámetro-de-un-componente-memoizado)
   - 5.6 [Extrae a componentes memoizados](#56-extrae-a-componentes-memoizados)
   - 5.7 [Acota las dependencias de los effects](#57-acota-las-dependencias-de-los-effects)
   - 5.8 [Pon la lógica de interacción en los event handlers](#58-pon-la-lógica-de-interacción-en-los-event-handlers)
   - 5.9 [Divide los cómputos combinados de los hooks](#59-divide-los-cómputos-combinados-de-los-hooks)
   - 5.10 [Suscríbete al estado derivado](#510-suscríbete-al-estado-derivado)
   - 5.11 [Usa actualizaciones funcionales de setState](#511-usa-actualizaciones-funcionales-de-setstate)
   - 5.12 [Usa la inicialización lazy del estado](#512-usa-la-inicialización-lazy-del-estado)
   - 5.13 [Usa transitions para las actualizaciones no urgentes](#513-usa-transitions-para-las-actualizaciones-no-urgentes)
   - 5.14 [Usa useDeferredValue para renders derivados costosos](#514-usa-usedeferredvalue-para-renders-derivados-costosos)
   - 5.15 [Usa useRef para valores transitorios](#515-usa-useref-para-valores-transitorios)
6. [Rendimiento del renderizado](#6-rendimiento-del-renderizado) — **MEDIUM**
   - 6.1 [Anima el wrapper del SVG en lugar del elemento SVG](#61-anima-el-wrapper-del-svg-en-lugar-del-elemento-svg)
   - 6.2 [content-visibility de CSS para listas largas](#62-content-visibility-de-css-para-listas-largas)
   - 6.3 [Haz hoisting de los elementos JSX estáticos](#63-haz-hoisting-de-los-elementos-jsx-estáticos)
   - 6.4 [Optimiza la precisión de los SVG](#64-optimiza-la-precisión-de-los-svg)
   - 6.5 [Evita el hydration mismatch sin parpadeos](#65-evita-el-hydration-mismatch-sin-parpadeos)
   - 6.6 [Suprime los hydration mismatches esperados](#66-suprime-los-hydration-mismatches-esperados)
   - 6.7 [Usa el componente Activity para mostrar/ocultar](#67-usa-el-componente-activity-para-mostrarocultar)
   - 6.8 [Usa defer o async en las etiquetas script](#68-usa-defer-o-async-en-las-etiquetas-script)
   - 6.9 [Usa renderizado condicional explícito](#69-usa-renderizado-condicional-explícito)
   - 6.10 [Usa los resource hints de React DOM](#610-usa-los-resource-hints-de-react-dom)
   - 6.11 [Usa useTransition en lugar de estados de carga manuales](#611-usa-usetransition-en-lugar-de-estados-de-carga-manuales)
7. [Rendimiento de JavaScript](#7-rendimiento-de-javascript) — **LOW-MEDIUM**
   - 7.1 [Evita el layout thrashing](#71-evita-el-layout-thrashing)
   - 7.2 [Construye index maps para búsquedas repetidas](#72-construye-index-maps-para-búsquedas-repetidas)
   - 7.3 [Cachea el acceso a propiedades en los bucles](#73-cachea-el-acceso-a-propiedades-en-los-bucles)
   - 7.4 [Cachea las llamadas repetidas a funciones](#74-cachea-las-llamadas-repetidas-a-funciones)
   - 7.5 [Cachea las llamadas a la Storage API](#75-cachea-las-llamadas-a-la-storage-api)
   - 7.6 [Combina múltiples iteraciones de arrays](#76-combina-múltiples-iteraciones-de-arrays)
   - 7.7 [Difiere el trabajo no crítico con requestIdleCallback](#77-difiere-el-trabajo-no-crítico-con-requestidlecallback)
   - 7.8 [Verificación temprana de la longitud en las comparaciones de arrays](#78-verificación-temprana-de-la-longitud-en-las-comparaciones-de-arrays)
   - 7.9 [Early return en las funciones](#79-early-return-en-las-funciones)
   - 7.10 [Haz hoisting de la creación de RegExp](#710-haz-hoisting-de-la-creación-de-regexp)
   - 7.11 [Usa flatMap para hacer map y filter en una sola pasada](#711-usa-flatmap-para-hacer-map-y-filter-en-una-sola-pasada)
   - 7.12 [Usa un bucle para min/max en lugar de sort](#712-usa-un-bucle-para-minmax-en-lugar-de-sort)
   - 7.13 [Usa Set/Map para búsquedas O(1)](#713-usa-setmap-para-búsquedas-o1)
   - 7.14 [Usa toSorted() en lugar de sort() para la inmutabilidad](#714-usa-tosorted-en-lugar-de-sort-para-la-inmutabilidad)
8. [Patrones avanzados](#8-patrones-avanzados) — **LOW**
   - 8.1 [No pongas los Effect Events en los arrays de dependencias](#81-no-pongas-los-effect-events-en-los-arrays-de-dependencias)
   - 8.2 [Inicializa la app una vez, no en cada montaje](#82-inicializa-la-app-una-vez-no-en-cada-montaje)
   - 8.3 [Almacena los event handlers en refs](#83-almacena-los-event-handlers-en-refs)
   - 8.4 [useEffectEvent para refs de callbacks estables](#84-useeffectevent-para-refs-de-callbacks-estables)

---

## 1. Eliminar waterfalls

**Impacto: CRITICAL**

Los waterfalls son el asesino número 1 del rendimiento. Cada await secuencial agrega la latencia de red completa. Eliminarlos produce las mayores mejoras.

### 1.1 Verifica las condiciones baratas antes de los flags asíncronos

**Impacto: HIGH (evita trabajo asíncrono innecesario cuando un guard síncrono ya falla)**

Cuando una rama usa `await` para un flag o un valor remoto y además requiere una condición **síncrona barata** (props locales, metadata de la petición, estado ya cargado), evalúa la condición barata **primero**. De lo contrario, pagas por la llamada asíncrona incluso cuando la condición compuesta nunca puede ser verdadera.

Esta es una especialización de [Difiere el await hasta que sea necesario](./async-defer-await.md) para verificaciones del estilo `flag && cheapCondition`.

**Incorrecto:**

```typescript
const someFlag = await getFlag()

if (someFlag && someCondition) {
  // ...
}
```

**Correcto:**

```typescript
if (someCondition) {
  const someFlag = await getFlag()
  if (someFlag) {
    // ...
  }
}
```

Esto es importante cuando `getFlag` accede a la red, a un servicio de feature flags o a trabajo de `React.cache` / base de datos: omitirlo cuando `someCondition` es false elimina ese costo en el cold path.

Mantén el orden original si `someCondition` es costosa, depende del flag o debes ejecutar efectos secundarios en un orden fijo.

### 1.2 Difiere el await hasta que sea necesario

**Impacto: HIGH (evita bloquear code paths que no se usan)**

Mueve las operaciones `await` a las ramas donde realmente se usan para evitar bloquear code paths que no las necesitan.

**Incorrecto: bloquea ambas ramas**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)
  
  if (skipProcessing) {
    // Retorna de inmediato, pero aun así esperó a userData
    return { skipped: true }
  }
  
  // Solo esta rama usa userData
  return processUserData(userData)
}
```

**Correcto: solo bloquea cuando es necesario**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) {
    // Retorna de inmediato sin esperar
    return { skipped: true }
  }
  
  // Obtiene los datos solo cuando es necesario
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

**Otro ejemplo: optimización con early return**

```typescript
// Incorrecto: siempre obtiene los permisos
async function updateResource(resourceId: string, userId: string) {
  const permissions = await fetchPermissions(userId)
  const resource = await getResource(resourceId)
  
  if (!resource) {
    return { error: 'Not found' }
  }
  
  if (!permissions.canEdit) {
    return { error: 'Forbidden' }
  }
  
  return await updateResourceData(resource, permissions)
}

// Correcto: obtiene los datos solo cuando es necesario
async function updateResource(resourceId: string, userId: string) {
  const resource = await getResource(resourceId)
  
  if (!resource) {
    return { error: 'Not found' }
  }
  
  const permissions = await fetchPermissions(userId)
  
  if (!permissions.canEdit) {
    return { error: 'Forbidden' }
  }
  
  return await updateResourceData(resource, permissions)
}
```

Esta optimización es especialmente valiosa cuando la rama omitida se toma con frecuencia, o cuando la operación diferida es costosa.

Para `await getFlag()` combinado con un guard síncrono barato (`flag && someCondition`), consulta [Verifica las condiciones baratas antes de los flags asíncronos](./async-cheap-condition-before-await.md).

### 1.3 Paralelización basada en dependencias

**Impacto: CRITICAL (mejora de 2-10×)**

Para operaciones con dependencias parciales, usa `better-all` para maximizar el paralelismo. Inicia automáticamente cada tarea en el momento más temprano posible.

**Incorrecto: profile espera a config innecesariamente**

```typescript
const [user, config] = await Promise.all([
  fetchUser(),
  fetchConfig()
])
const profile = await fetchProfile(user.id)
```

**Correcto: config y profile se ejecutan en paralelo**

```typescript
import { all } from 'better-all'

const { user, config, profile } = await all({
  async user() { return fetchUser() },
  async config() { return fetchConfig() },
  async profile() {
    return fetchProfile((await this.$.user).id)
  }
})
```

**Alternativa sin dependencias adicionales:**

```typescript
const userPromise = fetchUser()
const profilePromise = userPromise.then(user => fetchProfile(user.id))

const [user, config, profile] = await Promise.all([
  userPromise,
  fetchConfig(),
  profilePromise
])
```

También podemos crear primero todas las promises y hacer `Promise.all()` al final.

Referencia: [https://github.com/shuding/better-all](https://github.com/shuding/better-all)

### 1.4 Evita las cadenas de waterfalls en las API routes

**Impacto: CRITICAL (mejora de 2-10×)**

En las API routes y las Server Actions, inicia las operaciones independientes de inmediato, aunque todavía no hagas await de ellas.

**Incorrecto: config espera a auth, data espera a ambos**

```typescript
export async function GET(request: Request) {
  const session = await auth()
  const config = await fetchConfig()
  const data = await fetchData(session.user.id)
  return Response.json({ data, config })
}
```

**Correcto: auth y config se inician de inmediato**

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth()
  const configPromise = fetchConfig()
  const session = await sessionPromise
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id)
  ])
  return Response.json({ data, config })
}
```

Para operaciones con cadenas de dependencias más complejas, usa `better-all` para maximizar automáticamente el paralelismo (consulta Paralelización basada en dependencias).

### 1.5 Promise.all() para operaciones independientes

**Impacto: CRITICAL (mejora de 2-10×)**

Cuando las operaciones asíncronas no tienen interdependencias, ejecútalas de forma concurrente usando `Promise.all()`.

**Incorrecto: ejecución secuencial, 3 round trips**

```typescript
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
```

**Correcto: ejecución en paralelo, 1 round trip**

```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

### 1.6 Suspense boundaries estratégicos

**Impacto: HIGH (primer pintado más rápido)**

En lugar de hacer await de los datos en componentes asíncronos antes de devolver el JSX, usa Suspense boundaries para mostrar más rápido la UI contenedora mientras se cargan los datos.

**Incorrecto: el contenedor queda bloqueado por la obtención de datos**

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

**Correcto: el contenedor se muestra de inmediato, los datos llegan por streaming**

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

**Alternativa: compartir la promise entre componentes**

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

---

## 2. Optimización del tamaño del bundle

**Impacto: CRITICAL**

Reducir el tamaño del bundle inicial mejora el Time to Interactive y el Largest Contentful Paint.

### 2.1 Evita los imports desde barrel files

**Impacto: CRITICAL (costo de import de 200-800ms, builds lentos)**

Importa directamente desde los archivos fuente en lugar de los barrel files para evitar cargar miles de módulos sin usar. Los **barrel files** son puntos de entrada que re-exportan múltiples módulos (p. ej., un `index.js` que hace `export * from './module'`).

Las librerías populares de íconos y componentes pueden tener **hasta 10,000 re-exports** en su archivo de entrada. En muchos paquetes de React, **solo importarlos toma 200-800ms**, lo que afecta tanto la velocidad de desarrollo como los cold starts en producción.

**Por qué el tree-shaking no ayuda:** Cuando una librería está marcada como external (no incluida en el bundle), el bundler no puede optimizarla. Si la incluyes en el bundle para habilitar el tree-shaking, los builds se vuelven considerablemente más lentos al analizar todo el grafo de módulos.

**Incorrecto: importa toda la librería**

```tsx
import { Check, X, Menu } from 'lucide-react'
// Carga 1,583 módulos, toma ~2.8s extra en dev
// Costo en runtime: 200-800ms en cada cold start

import { Button, TextField } from '@mui/material'
// Carga 2,225 módulos, toma ~4.2s extra en dev
```

**Correcto - Next.js 13.5+ (recomendado):**

```tsx
// Mantén los imports estándar - Next.js los transforma en imports directos
import { Check, X, Menu } from 'lucide-react'
// Soporte completo de TypeScript, sin manejo manual de paths
```

Este es el enfoque recomendado porque preserva la type safety de TypeScript y el autocompletado del editor, y aun así elimina el costo de los barrel imports.

**Correcto - Imports directos (proyectos que no son de Next.js):**

```tsx
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// Carga solo lo que usas
```

> **Advertencia de TypeScript:** Algunas librerías (en particular `lucide-react`) no incluyen archivos `.d.ts` para sus paths de import profundos. Importar desde `lucide-react/dist/esm/icons/check` se resuelve a un tipo `any` implícito, lo que provoca errores con `strict` o `noImplicitAny`. Prefiere `optimizePackageImports` cuando esté disponible, o verifica que la librería exporte tipos para sus subpaths antes de usar imports directos.

Estas optimizaciones proporcionan un arranque en dev entre 15 y 70% más rápido, builds 28% más rápidos, cold starts 40% más rápidos y un HMR significativamente más rápido.

Librerías afectadas con frecuencia: `lucide-react`, `@mui/material`, `@mui/icons-material`, `@tabler/icons-react`, `react-icons`, `@headlessui/react`, `@radix-ui/react-*`, `lodash`, `ramda`, `date-fns`, `rxjs`, `react-use`.

Referencia: [https://vercel.com/blog/how-we-optimized-package-imports-in-next-js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)

### 2.2 Carga condicional de módulos

**Impacto: HIGH (carga datos grandes solo cuando es necesario)**

Carga datos o módulos grandes solo cuando se activa una funcionalidad.

**Ejemplo: lazy-load de los frames de una animación**

```tsx
function AnimationPlayer({ enabled, setEnabled }: { enabled: boolean; setEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [frames, setFrames] = useState<Frame[] | null>(null)

  useEffect(() => {
    if (enabled && !frames && typeof window !== 'undefined') {
      import('./animation-frames.js')
        .then(mod => setFrames(mod.frames))
        .catch(() => setEnabled(false))
    }
  }, [enabled, frames, setEnabled])

  if (!frames) return <Skeleton />
  return <Canvas frames={frames} />
}
```

La verificación `typeof window !== 'undefined'` evita incluir este módulo en el bundle para SSR, optimizando el tamaño del bundle del servidor y la velocidad del build.

### 2.3 Difiere las librerías de terceros no críticas

**Impacto: MEDIUM (se carga después de la hydration)**

Las analíticas, el logging y el seguimiento de errores no bloquean la interacción del usuario. Cárgalos después de la hydration.

**Incorrecto: bloquea el bundle inicial**

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

**Correcto: se carga después de la hydration**

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

### 2.4 Dynamic imports para los componentes pesados

**Impacto: CRITICAL (afecta directamente al TTI y al LCP)**

Usa `next/dynamic` para hacer lazy-load de los componentes grandes que no se necesitan en el render inicial.

**Incorrecto: Monaco se incluye en el chunk principal, ~300KB**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correcto: Monaco se carga bajo demanda**

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

### 2.5 Prefiere paths analizables estáticamente

**Impacto: HIGH (evita bundles y file traces amplios accidentales)**

Las herramientas de build funcionan mejor cuando los paths de import y del sistema de archivos son evidentes en tiempo de build. Si ocultas el path real dentro de una variable o lo compones de forma demasiado dinámica, la herramienta tiene que incluir un conjunto amplio de archivos posibles, advertir que no puede analizar el import o ampliar el file tracing para no correr riesgos.

Prefiere maps explícitos o paths literales para que el conjunto de archivos alcanzables se mantenga acotado y predecible. Es la misma regla tanto si eliges módulos con `import()` como si lees archivos en código del servidor o de build.

Cuando el análisis se vuelve demasiado amplio, el costo es real:

- Bundles del servidor más grandes

- Builds más lentos

- Peores cold starts

- Mayor uso de memoria

**Incorrecto: el bundler no puede saber qué se puede importar**

```ts
const PAGE_MODULES = {
  home: './pages/home',
  settings: './pages/settings',
} as const

const Page = await import(PAGE_MODULES[pageName])
```

**Correcto: usa un map explícito de los módulos permitidos**

```ts
const PAGE_MODULES = {
  home: () => import('./pages/home'),
  settings: () => import('./pages/settings'),
} as const

const Page = await PAGE_MODULES[pageName]()
```

**Incorrecto: un enum de 2 valores aun así oculta el path final al análisis estático**

```ts
const baseDir = path.join(process.cwd(), 'content/' + contentKind)
```

**Correcto: haz que cada path final sea literal en el punto de llamada**

```ts
const baseDir =
  kind === ContentKind.Blog
    ? path.join(process.cwd(), 'content/blog')
    : path.join(process.cwd(), 'content/docs')
```

En el código del servidor de Next.js, esto también es importante para el output file tracing. `path.join(process.cwd(), someVar)` puede ampliar el conjunto de archivos rastreados porque Next.js analiza estáticamente el uso de `import`, `require` y `fs`.

Referencia: [https://nextjs.org/docs/app/api-reference/config/next-config-js/output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output), [https://nextjs.org/learn/seo/dynamic-imports](https://nextjs.org/learn/seo/dynamic-imports), [https://vite.dev/guide/features.html](https://vite.dev/guide/features.html), [https://esbuild.github.io/api/](https://esbuild.github.io/api/), [https://www.npmjs.com/package/@rollup/plugin-dynamic-import-vars](https://www.npmjs.com/package/@rollup/plugin-dynamic-import-vars), [https://webpack.js.org/guides/dependency-management/](https://webpack.js.org/guides/dependency-management/)

### 2.6 Haz preload según la intención del usuario

**Impacto: MEDIUM (reduce la latencia percibida)**

Haz preload de los bundles pesados antes de que se necesiten para reducir la latencia percibida.

**Ejemplo: preload en hover/focus**

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    if (typeof window !== 'undefined') {
      void import('./monaco-editor')
    }
  }

  return (
    <button
      onMouseEnter={preload}
      onFocus={preload}
      onClick={onClick}
    >
      Open Editor
    </button>
  )
}
```

**Ejemplo: preload cuando el feature flag está habilitado**

```tsx
function FlagsProvider({ children, flags }: Props) {
  useEffect(() => {
    if (flags.editorEnabled && typeof window !== 'undefined') {
      void import('./monaco-editor').then(mod => mod.init())
    }
  }, [flags.editorEnabled])

  return <FlagsContext.Provider value={flags}>
    {children}
  </FlagsContext.Provider>
}
```

La verificación `typeof window !== 'undefined'` evita incluir en el bundle para SSR los módulos con preload, optimizando el tamaño del bundle del servidor y la velocidad del build.

---

## 3. Rendimiento del lado del servidor

**Impacto: HIGH**

Optimizar el server-side rendering y la obtención de datos elimina los waterfalls del lado del servidor y reduce los tiempos de respuesta.

### 3.1 Autentica las Server Actions como las API routes

**Impacto: CRITICAL (evita el acceso no autorizado a las mutaciones del servidor)**

Las Server Actions (funciones con `"use server"`) se exponen como endpoints públicos, igual que las API routes. Verifica siempre la autenticación y la autorización **dentro** de cada Server Action; no dependas únicamente del middleware, de los guards del layout ni de las verificaciones a nivel de página, ya que las Server Actions pueden invocarse directamente.

La documentación de Next.js lo indica explícitamente: "Trata las Server Actions con las mismas consideraciones de seguridad que los endpoints de API públicos, y verifica si el usuario tiene permitido realizar una mutación."

**Incorrecto: sin verificación de autenticación**

```typescript
'use server'

export async function deleteUser(userId: string) {
  // ¡Cualquiera puede llamar a esto! Sin verificación de autenticación
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**Correcto: autenticación dentro de la action**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { unauthorized } from '@/lib/errors'

export async function deleteUser(userId: string) {
  // Verifica siempre la autenticación dentro de la action
  const session = await verifySession()
  
  if (!session) {
    throw unauthorized('Must be logged in')
  }
  
  // Verifica también la autorización
  if (session.user.role !== 'admin' && session.user.id !== userId) {
    throw unauthorized('Cannot delete other users')
  }
  
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**Con validación del input:**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { z } from 'zod'

const updateProfileSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function updateProfile(data: unknown) {
  // Valida primero el input
  const validated = updateProfileSchema.parse(data)
  
  // Luego autentica
  const session = await verifySession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  // Luego autoriza
  if (session.user.id !== validated.userId) {
    throw new Error('Can only update own profile')
  }
  
  // Finalmente realiza la mutación
  await db.user.update({
    where: { id: validated.userId },
    data: {
      name: validated.name,
      email: validated.email
    }
  })
  
  return { success: true }
}
```

Referencia: [https://nextjs.org/docs/app/guides/authentication](https://nextjs.org/docs/app/guides/authentication)

### 3.2 Evita la serialización duplicada en las props de RSC

**Impacto: LOW (reduce el payload de red al evitar la serialización duplicada)**

La serialización RSC→cliente deduplica por referencia de objeto, no por valor. Misma referencia = se serializa una vez; nueva referencia = se serializa de nuevo. Haz las transformaciones (`.toSorted()`, `.filter()`, `.map()`) en el cliente, no en el servidor.

**Incorrecto: duplica el array**

```tsx
// RSC: envía 6 strings (2 arrays × 3 elementos)
<ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />
```

**Correcto: envía 3 strings**

```tsx
// RSC: envía una sola vez
<ClientList usernames={usernames} />

// Cliente: transforma ahí
'use client'
const sorted = useMemo(() => [...usernames].sort(), [usernames])
```

**Comportamiento de la deduplicación anidada:**

```tsx
// string[] - duplica todo
usernames={['a','b']} sorted={usernames.toSorted()} // envía 4 strings

// object[] - duplica solo la estructura del array
users={[{id:1},{id:2}]} sorted={users.toSorted()} // envía 2 arrays + 2 objetos únicos (no 4)
```

La deduplicación funciona de forma recursiva. El impacto varía según el tipo de dato:

- `string[]`, `number[]`, `boolean[]`: **Impacto HIGH** - el array + todos los primitivos se duplican por completo

- `object[]`: **Impacto LOW** - el array se duplica, pero los objetos anidados se deduplican por referencia

**Operaciones que rompen la deduplicación: crean nuevas referencias**

- Arrays: `.toSorted()`, `.filter()`, `.map()`, `.slice()`, `[...arr]`

- Objetos: `{...obj}`, `Object.assign()`, `structuredClone()`, `JSON.parse(JSON.stringify())`

**Más ejemplos:**

```tsx
// ❌ Mal
<C users={users} active={users.filter(u => u.active)} />
<C product={product} productName={product.name} />

// ✅ Bien
<C users={users} />
<C product={product} />
// Haz el filtrado/la desestructuración en el cliente
```

**Excepción:** Pasa datos derivados cuando la transformación sea costosa o el cliente no necesite el original.

### 3.3 Evita el estado compartido del módulo para los datos de la petición

**Impacto: HIGH (evita bugs de concurrencia y fugas de datos entre peticiones)**

En los React Server Components y en los client components renderizados durante el SSR, evita usar variables mutables a nivel de módulo para compartir datos con alcance de petición. Los renders del servidor pueden ejecutarse de forma concurrente en el mismo proceso. Si un render escribe en el estado compartido del módulo y otro render lo lee, puedes obtener race conditions, contaminación entre peticiones y bugs de seguridad en los que los datos de un usuario aparecen en la respuesta de otro usuario.

Trata el scope del módulo en el servidor como memoria compartida de todo el proceso, no como estado local de la petición.

**Incorrecto: los datos de la petición se filtran entre renders concurrentes**

```tsx
let currentUser: User | null = null

export default async function Page() {
  currentUser = await auth()
  return <Dashboard />
}

async function Dashboard() {
  return <div>{currentUser?.name}</div>
}
```

Si dos peticiones se superponen, la petición A puede establecer `currentUser`, y luego la petición B lo sobrescribe antes de que la petición A termine de renderizar `Dashboard`.

**Correcto: mantén los datos de la petición locales al árbol de render**

```tsx
export default async function Page() {
  const user = await auth()
  return <Dashboard user={user} />
}

function Dashboard({ user }: { user: User | null }) {
  return <div>{user?.name}</div>
}
```

Excepciones seguras:

- Assets estáticos inmutables o configuración cargados una vez en el scope del módulo

- Cachés compartidas diseñadas intencionalmente para reutilizarse entre peticiones y con las keys correctas

- Singletons de todo el proceso que no almacenan datos mutables específicos de la petición o del usuario

Para los assets estáticos y la configuración, consulta [Haz hoisting de la I/O estática al nivel del módulo](./server-hoist-static-io.md).

### 3.4 Caching LRU entre peticiones

**Impacto: HIGH (cachea entre peticiones)**

`React.cache()` solo funciona dentro de una petición. Para los datos compartidos entre peticiones secuenciales (el usuario hace clic en el botón A y luego en el botón B), usa una caché LRU.

**Implementación:**

```typescript
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 5 * 60 * 1000  // 5 minutos
})

export async function getUser(id: string) {
  const cached = cache.get(id)
  if (cached) return cached

  const user = await db.user.findUnique({ where: { id } })
  cache.set(id, user)
  return user
}

// Petición 1: query a la base de datos, resultado cacheado
// Petición 2: cache hit, sin query a la base de datos
```

Úsala cuando las acciones secuenciales del usuario llamen a múltiples endpoints que necesiten los mismos datos en cuestión de segundos.

**Con [Fluid Compute](https://vercel.com/docs/fluid-compute) de Vercel:** El caching LRU es especialmente efectivo porque múltiples peticiones concurrentes pueden compartir la misma instancia de la función y la caché. Esto significa que la caché persiste entre peticiones sin necesitar un almacenamiento externo como Redis.

**En serverless tradicional:** Cada invocación se ejecuta de forma aislada, así que considera Redis para el caching entre procesos.

Referencia: [https://github.com/isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)

### 3.5 Haz hoisting de la I/O estática al nivel del módulo

**Impacto: HIGH (evita la I/O repetida de archivos/red en cada petición)**

Al cargar assets estáticos (fuentes, logos, imágenes, archivos de configuración) en route handlers o funciones del servidor, haz hoisting de la operación de I/O al nivel del módulo. El código a nivel de módulo se ejecuta una vez cuando el módulo se importa por primera vez, no en cada petición. Esto elimina las lecturas redundantes del sistema de archivos o los fetches de red que, de otro modo, se ejecutarían en cada invocación.

**Incorrecto: lee el archivo de la fuente en cada petición**

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

**Correcto: se carga una vez al inicializar el módulo**

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

**Correcto: fs síncrono a nivel de módulo**

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

**Incorrecto: lee la configuración en cada llamada**

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

**Correcto: hace hoisting de la configuración y la plantilla al nivel del módulo**

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

### 3.6 Minimiza la serialización en los límites de RSC

**Impacto: HIGH (reduce el tamaño de la transferencia de datos)**

El límite Server/Client de React serializa todas las propiedades de los objetos en strings y las incrusta en la respuesta HTML y en las peticiones RSC posteriores. Estos datos serializados impactan directamente en el peso de la página y en el tiempo de carga, por lo que **el tamaño importa mucho**. Pasa solo los campos que el cliente realmente usa.

**Incorrecto: serializa los 50 campos**

```tsx
async function Page() {
  const user = await fetchUser()  // 50 campos
  return <Profile user={user} />
}

'use client'
function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>  // usa 1 campo
}
```

**Correcto: serializa solo 1 campo**

```tsx
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}

'use client'
function Profile({ name }: { name: string }) {
  return <div>{name}</div>
}
```

### 3.7 Obtención de datos en paralelo con composición de componentes

**Impacto: CRITICAL (elimina los waterfalls del lado del servidor)**

Los React Server Components se ejecutan secuencialmente dentro de un árbol. Reestructura con composición para paralelizar la obtención de datos.

**Incorrecto: Sidebar espera a que termine el fetch de Page**

```tsx
export default async function Page() {
  const header = await fetchHeader()
  return (
    <div>
      <div>{header}</div>
      <Sidebar />
    </div>
  )
}

async function Sidebar() {
  const items = await fetchSidebarItems()
  return <nav>{items.map(renderItem)}</nav>
}
```

**Correcto: ambos hacen fetch simultáneamente**

```tsx
async function Header() {
  const data = await fetchHeader()
  return <div>{data}</div>
}

async function Sidebar() {
  const items = await fetchSidebarItems()
  return <nav>{items.map(renderItem)}</nav>
}

export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  )
}
```

**Alternativa con la prop children:**

```tsx
async function Header() {
  const data = await fetchHeader()
  return <div>{data}</div>
}

async function Sidebar() {
  const items = await fetchSidebarItems()
  return <nav>{items.map(renderItem)}</nav>
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default function Page() {
  return (
    <Layout>
      <Sidebar />
    </Layout>
  )
}
```

### 3.8 Obtención en paralelo de datos anidados

**Impacto: CRITICAL (elimina los waterfalls del lado del servidor)**

Al obtener datos anidados en paralelo, encadena los fetches dependientes dentro de la promise de cada elemento para que un elemento lento no bloquee al resto.

**Incorrecto: un solo elemento lento bloquea todos los fetches anidados**

```tsx
const chats = await Promise.all(
  chatIds.map(id => getChat(id))
)

const chatAuthors = await Promise.all(
  chats.map(chat => getUser(chat.author))
)
```

Si un `getChat(id)` de 100 es extremadamente lento, los autores de los otros 99 chats no pueden empezar a cargarse aunque sus datos estén listos.

**Correcto: cada elemento encadena su propio fetch anidado**

```tsx
const chatAuthors = await Promise.all(
  chatIds.map(id => getChat(id).then(chat => getUser(chat.author)))
)
```

Cada elemento encadena de forma independiente `getChat` → `getUser`, de modo que un chat lento no bloquea los fetches de los autores de los demás.

### 3.9 Deduplicación por petición con React.cache()

**Impacto: MEDIUM (deduplica dentro de la petición)**

Usa `React.cache()` para la deduplicación de peticiones del lado del servidor. La autenticación y las queries a la base de datos son las que más se benefician.

**Uso:**

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

Dentro de una sola petición, múltiples llamadas a `getCurrentUser()` ejecutan la query solo una vez.

**Evita los objetos inline como argumentos:**

`React.cache()` usa igualdad superficial (`Object.is`) para determinar los cache hits. Los objetos inline crean nuevas referencias en cada llamada, lo que impide los cache hits.

**Incorrecto: siempre cache miss**

```typescript
const getUser = cache(async (params: { uid: number }) => {
  return await db.user.findUnique({ where: { id: params.uid } })
})

// Cada llamada crea un nuevo objeto, nunca hay cache hit
getUser({ uid: 1 })
getUser({ uid: 1 })  // Cache miss, ejecuta la query de nuevo
```

**Correcto: cache hit**

```typescript
const params = { uid: 1 }
getUser(params)  // Se ejecuta la query
getUser(params)  // Cache hit (misma referencia)
```

Si debes pasar objetos, pasa la misma referencia:

**Nota específica de Next.js:**

En Next.js, la API `fetch` se extiende automáticamente con request memoization. Las peticiones con la misma URL y las mismas opciones se deduplican automáticamente dentro de una sola petición, por lo que no necesitas `React.cache()` para las llamadas a `fetch`. Sin embargo, `React.cache()` sigue siendo esencial para otras tareas asíncronas:

- Queries a la base de datos (Prisma, Drizzle, etc.)

- Cómputos pesados

- Verificaciones de autenticación

- Operaciones del sistema de archivos

- Cualquier trabajo asíncrono que no sea fetch

Usa `React.cache()` para deduplicar estas operaciones a lo largo de tu árbol de componentes.

Referencia: [https://react.dev/reference/react/cache](https://react.dev/reference/react/cache)

### 3.10 Usa after() para operaciones no bloqueantes

**Impacto: MEDIUM (tiempos de respuesta más rápidos)**

Usa `after()` de Next.js para programar el trabajo que debe ejecutarse después de enviar una respuesta. Esto evita que el logging, las analíticas y otros efectos secundarios bloqueen la respuesta.

**Incorrecto: bloquea la respuesta**

```tsx
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // Realiza la mutación
  await updateDatabase(request)
  
  // El logging bloquea la respuesta
  const userAgent = request.headers.get('user-agent') || 'unknown'
  await logUserAction({ userAgent })
  
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

**Correcto: no bloqueante**

```tsx
import { after } from 'next/server'
import { headers, cookies } from 'next/headers'
import { logUserAction } from '@/app/utils'

export async function POST(request: Request) {
  // Realiza la mutación
  await updateDatabase(request)
  
  // Hace el log después de enviar la respuesta
  after(async () => {
    const userAgent = (await headers()).get('user-agent') || 'unknown'
    const sessionCookie = (await cookies()).get('session-id')?.value || 'anonymous'
    
    logUserAction({ sessionCookie, userAgent })
  })
  
  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
```

La respuesta se envía de inmediato mientras el logging ocurre en segundo plano.

**Casos de uso comunes:**

- Seguimiento de analíticas

- Logging de auditoría

- Envío de notificaciones

- Invalidación de la caché

- Tareas de limpieza

**Notas importantes:**

- `after()` se ejecuta aunque la respuesta falle o redirija

- Funciona en Server Actions, Route Handlers y Server Components

Referencia: [https://nextjs.org/docs/app/api-reference/functions/after](https://nextjs.org/docs/app/api-reference/functions/after)

---

## 4. Obtención de datos del lado del cliente

**Impacto: MEDIUM-HIGH**

La deduplicación automática y los patrones eficientes de obtención de datos reducen las peticiones de red redundantes.

### 4.1 Deduplica los event listeners globales

**Impacto: LOW (un solo listener para N componentes)**

Usa `useSWRSubscription()` para compartir los event listeners globales entre las instancias de un componente.

**Incorrecto: N instancias = N listeners**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
```

Al usar el hook `useKeyboardShortcut` varias veces, cada instancia registrará un nuevo listener.

**Correcto: N instancias = 1 listener**

```tsx
import useSWRSubscription from 'swr/subscription'

// Map a nivel de módulo para rastrear los callbacks por key
const keyCallbacks = new Map<string, Set<() => void>>()

function useKeyboardShortcut(key: string, callback: () => void) {
  // Registra este callback en el Map
  useEffect(() => {
    if (!keyCallbacks.has(key)) {
      keyCallbacks.set(key, new Set())
    }
    keyCallbacks.get(key)!.add(callback)

    return () => {
      const set = keyCallbacks.get(key)
      if (set) {
        set.delete(callback)
        if (set.size === 0) {
          keyCallbacks.delete(key)
        }
      }
    }
  }, [key, callback])

  useSWRSubscription('global-keydown', () => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && keyCallbacks.has(e.key)) {
        keyCallbacks.get(e.key)!.forEach(cb => cb())
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
}

function Profile() {
  // Múltiples shortcuts compartirán el mismo listener
  useKeyboardShortcut('p', () => { /* ... */ }) 
  useKeyboardShortcut('k', () => { /* ... */ })
  // ...
}
```

### 4.2 Usa event listeners pasivos para el rendimiento del scroll

**Impacto: MEDIUM (elimina el retraso del scroll causado por los event listeners)**

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

### 4.3 Usa SWR para la deduplicación automática

**Impacto: MEDIUM-HIGH (deduplicación automática)**

SWR permite la deduplicación de peticiones, el caching y la revalidación entre las instancias de un componente.

**Incorrecto: sin deduplicación, cada instancia hace fetch**

```tsx
function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers)
  }, [])
}
```

**Correcto: múltiples instancias comparten una sola petición**

```tsx
import useSWR from 'swr'

function UserList() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

**Para datos inmutables:**

```tsx
import { useImmutableSWR } from '@/lib/swr'

function StaticContent() {
  const { data } = useImmutableSWR('/api/config', fetcher)
}
```

**Para mutaciones:**

```tsx
import { useSWRMutation } from 'swr/mutation'

function UpdateButton() {
  const { trigger } = useSWRMutation('/api/user', updateUser)
  return <button onClick={() => trigger()}>Update</button>
}
```

Referencia: [https://swr.vercel.app](https://swr.vercel.app)

### 4.4 Versiona y minimiza los datos de localStorage

**Impacto: MEDIUM (evita conflictos de schema, reduce el tamaño del almacenamiento)**

Agrega un prefijo de versión a las keys y almacena solo los campos necesarios. Evita conflictos de schema y el almacenamiento accidental de datos sensibles.

**Incorrecto:**

```typescript
// Sin versión, almacena todo, sin manejo de errores
localStorage.setItem('userConfig', JSON.stringify(fullUserObject))
const data = localStorage.getItem('userConfig')
```

**Correcto:**

```typescript
const VERSION = 'v2'

function saveConfig(config: { theme: string; language: string }) {
  try {
    localStorage.setItem(`userConfig:${VERSION}`, JSON.stringify(config))
  } catch {
    // Lanza una excepción en navegación incógnito/privada, al exceder la cuota o si está deshabilitado
  }
}

function loadConfig() {
  try {
    const data = localStorage.getItem(`userConfig:${VERSION}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// Migración de v1 a v2
function migrate() {
  try {
    const v1 = localStorage.getItem('userConfig:v1')
    if (v1) {
      const old = JSON.parse(v1)
      saveConfig({ theme: old.darkMode ? 'dark' : 'light', language: old.lang })
      localStorage.removeItem('userConfig:v1')
    }
  } catch {}
}
```

**Almacena los campos mínimos de las respuestas del servidor:**

```typescript
// El objeto User tiene más de 20 campos, almacena solo lo que la UI necesita
function cachePrefs(user: FullUser) {
  try {
    localStorage.setItem('prefs:v1', JSON.stringify({
      theme: user.preferences.theme,
      notifications: user.preferences.notifications
    }))
  } catch {}
}
```

**Envuelve siempre en try-catch:** `getItem()` y `setItem()` lanzan excepciones en la navegación incógnito/privada (Safari, Firefox), cuando se excede la cuota o cuando están deshabilitados.

**Beneficios:** Evolución del schema mediante el versionado, menor tamaño de almacenamiento, evita almacenar tokens/PII/flags internos.

---

## 5. Optimización de re-renders

**Impacto: MEDIUM**

Reducir los re-renders innecesarios minimiza el cómputo desperdiciado y mejora la capacidad de respuesta de la UI.

### 5.1 Calcula el estado derivado durante el renderizado

**Impacto: MEDIUM (evita renders redundantes y la desincronización del estado)**

Si un valor puede calcularse a partir de las props/el estado actuales, no lo almacenes en el estado ni lo actualices en un effect. Derívalo durante el render para evitar renders adicionales y la desincronización del estado. No establezcas el estado en effects únicamente como respuesta a cambios de props; en su lugar, prefiere valores derivados o resets mediante key.

**Incorrecto: estado y effect redundantes**

```tsx
function Form() {
  const [firstName, setFirstName] = useState('First')
  const [lastName, setLastName] = useState('Last')
  const [fullName, setFullName] = useState('')

  useEffect(() => {
    setFullName(firstName + ' ' + lastName)
  }, [firstName, lastName])

  return <p>{fullName}</p>
}
```

**Correcto: deriva durante el render**

```tsx
function Form() {
  const [firstName, setFirstName] = useState('First')
  const [lastName, setLastName] = useState('Last')
  const fullName = firstName + ' ' + lastName

  return <p>{fullName}</p>
}
```

Referencia: [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)

### 5.2 Difiere las lecturas del estado al punto de uso

**Impacto: MEDIUM (evita suscripciones innecesarias)**

No te suscribas a un estado dinámico (searchParams, localStorage) si solo lo lees dentro de callbacks.

**Incorrecto: se suscribe a todos los cambios de searchParams**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const searchParams = useSearchParams()

  const handleShare = () => {
    const ref = searchParams.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

**Correcto: lee bajo demanda, sin suscripción**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

### 5.3 No envuelvas en useMemo una expresión simple con un tipo de resultado primitivo

**Impacto: LOW-MEDIUM (cómputo desperdiciado en cada render)**

Cuando una expresión es simple (pocos operadores lógicos o aritméticos) y tiene un tipo de resultado primitivo (boolean, number, string), no la envuelvas en `useMemo`.

Llamar a `useMemo` y comparar las dependencias del hook puede consumir más recursos que la propia expresión.

**Incorrecto:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = useMemo(() => {
    return user.isLoading || notifications.isLoading
  }, [user.isLoading, notifications.isLoading])

  if (isLoading) return <Skeleton />
  // devuelve algo de markup
}
```

**Correcto:**

```tsx
function Header({ user, notifications }: Props) {
  const isLoading = user.isLoading || notifications.isLoading

  if (isLoading) return <Skeleton />
  // devuelve algo de markup
}
```

### 5.4 No definas componentes dentro de componentes

**Impacto: HIGH (evita el remontaje en cada render)**

Definir un componente dentro de otro componente crea un nuevo tipo de componente en cada render. React ve un componente diferente cada vez y lo vuelve a montar por completo, destruyendo todo el estado y el DOM.

Una razón común por la que los desarrolladores hacen esto es para acceder a las variables del padre sin pasar props. En su lugar, pasa siempre props.

**Incorrecto: se vuelve a montar en cada render**

```tsx
function UserProfile({ user, theme }) {
  // Definido dentro para acceder a `theme` - MAL
  const Avatar = () => (
    <img
      src={user.avatarUrl}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )

  // Definido dentro para acceder a `user` - MAL
  const Stats = () => (
    <div>
      <span>{user.followers} followers</span>
      <span>{user.posts} posts</span>
    </div>
  )

  return (
    <div>
      <Avatar />
      <Stats />
    </div>
  )
}
```

Cada vez que `UserProfile` se renderiza, `Avatar` y `Stats` son nuevos tipos de componentes. React desmonta las instancias anteriores y monta nuevas, perdiendo cualquier estado interno, volviendo a ejecutar los effects y recreando los nodos del DOM.

**Correcto: en su lugar, pasa props**

```tsx
function Avatar({ src, theme }: { src: string; theme: string }) {
  return (
    <img
      src={src}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )
}

function Stats({ followers, posts }: { followers: number; posts: number }) {
  return (
    <div>
      <span>{followers} followers</span>
      <span>{posts} posts</span>
    </div>
  )
}

function UserProfile({ user, theme }) {
  return (
    <div>
      <Avatar src={user.avatarUrl} theme={theme} />
      <Stats followers={user.followers} posts={user.posts} />
    </div>
  )
}
```

**Síntomas de este bug:**

- Los campos de input pierden el foco en cada pulsación de tecla

- Las animaciones se reinician inesperadamente

- El cleanup/setup de `useEffect` se ejecuta en cada render del padre

- La posición del scroll se restablece dentro del componente

### 5.5 Extrae a una constante el valor por defecto no primitivo de un parámetro de un componente memoizado

**Impacto: MEDIUM (restablece la memoization usando una constante para el valor por defecto)**

Cuando un componente memoizado tiene un valor por defecto para algún parámetro opcional no primitivo, como un array, una función o un objeto, llamar al componente sin ese parámetro rompe la memoization. Esto se debe a que se crean nuevas instancias del valor en cada rerender, y estas no pasan la comparación de igualdad estricta en `memo()`.

Para resolver este problema, extrae el valor por defecto a una constante.

**Incorrecto: `onClick` tiene valores diferentes en cada rerender**

```tsx
const UserAvatar = memo(function UserAvatar({ onClick = () => {} }: { onClick?: () => void }) {
  // ...
})

// Se usa sin el onClick opcional
<UserAvatar />
```

**Correcto: valor por defecto estable**

```tsx
const NOOP = () => {};

const UserAvatar = memo(function UserAvatar({ onClick = NOOP }: { onClick?: () => void }) {
  // ...
})

// Se usa sin el onClick opcional
<UserAvatar />
```

### 5.6 Extrae a componentes memoizados

**Impacto: MEDIUM (permite early returns)**

Extrae el trabajo costoso a componentes memoizados para permitir early returns antes del cómputo.

**Incorrecto: calcula el avatar incluso durante la carga**

```tsx
function Profile({ user, loading }: Props) {
  const avatar = useMemo(() => {
    const id = computeAvatarId(user)
    return <Avatar id={id} />
  }, [user])

  if (loading) return <Skeleton />
  return <div>{avatar}</div>
}
```

**Correcto: omite el cómputo durante la carga**

```tsx
const UserAvatar = memo(function UserAvatar({ user }: { user: User }) {
  const id = useMemo(() => computeAvatarId(user), [user])
  return <Avatar id={id} />
})

function Profile({ user, loading }: Props) {
  if (loading) return <Skeleton />
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  )
}
```

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, la memoization manual con `memo()` y `useMemo()` no es necesaria. El compiler optimiza automáticamente los re-renders.

### 5.7 Acota las dependencias de los effects

**Impacto: LOW (minimiza las re-ejecuciones del effect)**

Especifica dependencias primitivas en lugar de objetos para minimizar las re-ejecuciones del effect.

**Incorrecto: se vuelve a ejecutar ante cualquier cambio en los campos de user**

```tsx
useEffect(() => {
  console.log(user.id)
}, [user])
```

**Correcto: se vuelve a ejecutar solo cuando cambia id**

```tsx
useEffect(() => {
  console.log(user.id)
}, [user.id])
```

**Para el estado derivado, calcúlalo fuera del effect:**

```tsx
// Incorrecto: se ejecuta con width=767, 766, 765...
useEffect(() => {
  if (width < 768) {
    enableMobileMode()
  }
}, [width])

// Correcto: se ejecuta solo en la transición del booleano
const isMobile = width < 768
useEffect(() => {
  if (isMobile) {
    enableMobileMode()
  }
}, [isMobile])
```

### 5.8 Pon la lógica de interacción en los event handlers

**Impacto: MEDIUM (evita re-ejecuciones del effect y efectos secundarios duplicados)**

Si un efecto secundario lo dispara una acción específica del usuario (submit, click, drag), ejecútalo en ese event handler. No modeles la acción como estado + effect; eso hace que los effects se vuelvan a ejecutar ante cambios no relacionados y puede duplicar la acción.

**Incorrecto: evento modelado como estado + effect**

```tsx
function Form() {
  const [submitted, setSubmitted] = useState(false)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (submitted) {
      post('/api/register')
      showToast('Registered', theme)
    }
  }, [submitted, theme])

  return <button onClick={() => setSubmitted(true)}>Submit</button>
}
```

**Correcto: hazlo en el handler**

```tsx
function Form() {
  const theme = useContext(ThemeContext)

  function handleSubmit() {
    post('/api/register')
    showToast('Registered', theme)
  }

  return <button onClick={handleSubmit}>Submit</button>
}
```

Referencia: [https://react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler](https://react.dev/learn/removing-effect-dependencies#should-this-code-move-to-an-event-handler)

### 5.9 Divide los cómputos combinados de los hooks

**Impacto: MEDIUM (evita recalcular pasos independientes)**

Cuando un hook contiene múltiples tareas independientes con diferentes dependencias, divídelas en hooks separados. Un hook combinado vuelve a ejecutar todas las tareas cuando cambia cualquier dependencia, aunque algunas tareas no usen el valor que cambió.

**Incorrecto: cambiar `sortOrder` vuelve a calcular el filtrado**

```tsx
const sortedProducts = useMemo(() => {
  const filtered = products.filter((p) => p.category === category)
  const sorted = filtered.toSorted((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  )
  return sorted
}, [products, category, sortOrder])
```

**Correcto: el filtrado solo se vuelve a calcular cuando cambian products o category**

```tsx
const filteredProducts = useMemo(
  () => products.filter((p) => p.category === category),
  [products, category]
)

const sortedProducts = useMemo(
  () =>
    filteredProducts.toSorted((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    ),
  [filteredProducts, sortOrder]
)
```

Este patrón también aplica a `useEffect` al combinar efectos secundarios no relacionados:

**Incorrecto: ambos efectos se ejecutan cuando cambia cualquiera de las dependencias**

```tsx
useEffect(() => {
  analytics.trackPageView(pathname)
  document.title = `${pageTitle} | My App`
}, [pathname, pageTitle])
```

**Correcto: los effects se ejecutan de forma independiente**

```tsx
useEffect(() => {
  analytics.trackPageView(pathname)
}, [pathname])

useEffect(() => {
  document.title = `${pageTitle} | My App`
}, [pageTitle])
```

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, este optimiza automáticamente el rastreo de dependencias y puede manejar algunos de estos casos por ti.

### 5.10 Suscríbete al estado derivado

**Impacto: MEDIUM (reduce la frecuencia de los re-renders)**

Suscríbete a un estado booleano derivado en lugar de a valores continuos para reducir la frecuencia de los re-renders.

**Incorrecto: hace re-render en cada cambio de píxel**

```tsx
function Sidebar() {
  const width = useWindowWidth()  // se actualiza continuamente
  const isMobile = width < 768
  return <nav className={isMobile ? 'mobile' : 'desktop'} />
}
```

**Correcto: hace re-render solo cuando cambia el booleano**

```tsx
function Sidebar() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return <nav className={isMobile ? 'mobile' : 'desktop'} />
}
```

### 5.11 Usa actualizaciones funcionales de setState

**Impacto: MEDIUM (evita stale closures y recreaciones innecesarias de callbacks)**

Al actualizar el estado en función del valor actual del estado, usa la forma de actualización funcional de setState en lugar de referenciar directamente la variable de estado. Esto evita stale closures, elimina dependencias innecesarias y crea referencias de callbacks estables.

**Incorrecto: requiere el estado como dependencia**

```tsx
function TodoList() {
  const [items, setItems] = useState(initialItems)
  
  // El callback debe depender de items, se recrea en cada cambio de items
  const addItems = useCallback((newItems: Item[]) => {
    setItems([...items, ...newItems])
  }, [items])  // ❌ la dependencia items provoca recreaciones
  
  // Riesgo de stale closure si se olvida la dependencia
  const removeItem = useCallback((id: string) => {
    setItems(items.filter(item => item.id !== id))
  }, [])  // ❌ Falta la dependencia items - ¡usará items desactualizados!
  
  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

El primer callback se recrea cada vez que cambia `items`, lo que puede provocar que los componentes hijos hagan re-render innecesariamente. El segundo callback tiene un bug de stale closure: siempre referenciará el valor inicial de `items`.

**Correcto: callbacks estables, sin stale closures**

```tsx
function TodoList() {
  const [items, setItems] = useState(initialItems)
  
  // Callback estable, nunca se recrea
  const addItems = useCallback((newItems: Item[]) => {
    setItems(curr => [...curr, ...newItems])
  }, [])  // ✅ No se necesitan dependencias
  
  // Siempre usa el estado más reciente, sin riesgo de stale closure
  const removeItem = useCallback((id: string) => {
    setItems(curr => curr.filter(item => item.id !== id))
  }, [])  // ✅ Seguro y estable
  
  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

**Beneficios:**

1. **Referencias de callbacks estables** - Los callbacks no necesitan recrearse cuando cambia el estado

2. **Sin stale closures** - Siempre opera sobre el valor más reciente del estado

3. **Menos dependencias** - Simplifica los arrays de dependencias y reduce las fugas de memoria

4. **Evita bugs** - Elimina la fuente más común de bugs de closures en React

**Cuándo usar actualizaciones funcionales:**

- Cualquier setState que dependa del valor actual del estado

- Dentro de useCallback/useMemo cuando se necesita el estado

- Event handlers que referencian el estado

- Operaciones asíncronas que actualizan el estado

**Cuándo están bien las actualizaciones directas:**

- Establecer el estado a un valor estático: `setCount(0)`

- Establecer el estado solo a partir de props/argumentos: `setName(newName)`

- El estado no depende del valor anterior

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, el compiler puede optimizar automáticamente algunos casos, pero las actualizaciones funcionales siguen siendo recomendables por corrección y para evitar bugs de stale closures.

### 5.12 Usa la inicialización lazy del estado

**Impacto: MEDIUM (cómputo desperdiciado en cada render)**

Pasa una función a `useState` para los valores iniciales costosos. Sin la forma de función, el inicializador se ejecuta en cada render aunque el valor solo se use una vez.

**Incorrecto: se ejecuta en cada render**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() se ejecuta en CADA render, incluso después de la inicialización
  const [searchIndex, setSearchIndex] = useState(buildSearchIndex(items))
  const [query, setQuery] = useState('')
  
  // Cuando query cambia, buildSearchIndex se ejecuta de nuevo innecesariamente
  return <SearchResults index={searchIndex} query={query} />
}

function UserProfile() {
  // JSON.parse se ejecuta en cada render
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem('settings') || '{}')
  )
  
  return <SettingsForm settings={settings} onChange={setSettings} />
}
```

**Correcto: se ejecuta solo una vez**

```tsx
function FilteredList({ items }: { items: Item[] }) {
  // buildSearchIndex() se ejecuta SOLO en el render inicial
  const [searchIndex, setSearchIndex] = useState(() => buildSearchIndex(items))
  const [query, setQuery] = useState('')
  
  return <SearchResults index={searchIndex} query={query} />
}

function UserProfile() {
  // JSON.parse se ejecuta solo en el render inicial
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('settings')
    return stored ? JSON.parse(stored) : {}
  })
  
  return <SettingsForm settings={settings} onChange={setSettings} />
}
```

Usa la inicialización lazy al calcular valores iniciales a partir de localStorage/sessionStorage, al construir estructuras de datos (índices, maps), al leer del DOM o al realizar transformaciones pesadas.

Para primitivos simples (`useState(0)`), referencias directas (`useState(props.value)`) o literales baratos (`useState({})`), la forma de función es innecesaria.

### 5.13 Usa transitions para las actualizaciones no urgentes

**Impacto: MEDIUM (mantiene la capacidad de respuesta de la UI)**

Marca las actualizaciones de estado frecuentes y no urgentes como transitions para mantener la capacidad de respuesta de la UI.

**Incorrecto: bloquea la UI en cada scroll**

```tsx
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}
```

**Correcto: actualizaciones no bloqueantes**

```tsx
import { startTransition } from 'react'

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handler = () => {
      startTransition(() => setScrollY(window.scrollY))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}
```

### 5.14 Usa useDeferredValue para renders derivados costosos

**Impacto: MEDIUM (mantiene el input responsivo durante cómputos pesados)**

Cuando el input del usuario dispara cómputos o renders costosos, usa `useDeferredValue` para mantener el input responsivo. El valor diferido se queda atrás, lo que permite a React priorizar la actualización del input y renderizar el resultado costoso cuando esté ocioso.

**Incorrecto: el input se siente lento mientras se filtra**

```tsx
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const filtered = items.filter(item => fuzzyMatch(item, query))

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={filtered} />
    </>
  )
}
```

**Correcto: el input se mantiene ágil, los resultados se renderizan cuando están listos**

```tsx
function Search({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const filtered = useMemo(
    () => items.filter(item => fuzzyMatch(item, deferredQuery)),
    [items, deferredQuery]
  )
  const isStale = query !== deferredQuery

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.7 : 1 }}>
        <ResultsList results={filtered} />
      </div>
    </>
  )
}
```

**Cuándo usarlo:**

- Filtrar/buscar en listas grandes

- Visualizaciones costosas (charts, gráficos) que reaccionan al input

- Cualquier estado derivado que provoque retrasos de render perceptibles

**Nota:** Envuelve el cómputo costoso en `useMemo` con el valor diferido como dependencia; de lo contrario, se seguirá ejecutando en cada render.

Referencia: [https://react.dev/reference/react/useDeferredValue](https://react.dev/reference/react/useDeferredValue)

### 5.15 Usa useRef para valores transitorios

**Impacto: MEDIUM (evita re-renders innecesarios en actualizaciones frecuentes)**

Cuando un valor cambia con frecuencia y no quieres un re-render en cada actualización (p. ej., rastreadores del mouse, intervalos, flags transitorios), almacénalo en `useRef` en lugar de `useState`. Mantén el estado del componente para la UI; usa refs para valores temporales relacionados con el DOM. Actualizar una ref no dispara un re-render.

**Incorrecto: renderiza en cada actualización**

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

**Correcto: sin re-render para el rastreo**

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

---

## 6. Rendimiento del renderizado

**Impacto: MEDIUM**

Optimizar el proceso de renderizado reduce el trabajo que el navegador necesita hacer.

### 6.1 Anima el wrapper del SVG en lugar del elemento SVG

**Impacto: LOW (habilita la aceleración por hardware)**

Muchos navegadores no tienen aceleración por hardware para las animaciones CSS3 en elementos SVG. Envuelve el SVG en un `<div>` y anima el wrapper en su lugar.

**Incorrecto: animar el SVG directamente - sin aceleración por hardware**

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

**Correcto: animar el div wrapper - acelerado por hardware**

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

### 6.2 content-visibility de CSS para listas largas

**Impacto: HIGH (render inicial más rápido)**

Aplica `content-visibility: auto` para diferir el renderizado de lo que está fuera de la pantalla.

**CSS:**

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

**Ejemplo:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="overflow-y-auto h-screen">
      {messages.map(msg => (
        <div key={msg.id} className="message-item">
          <Avatar user={msg.author} />
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  )
}
```

Para 1000 mensajes, el navegador omite el layout/paint de ~990 elementos fuera de la pantalla (render inicial 10× más rápido).

### 6.3 Haz hoisting de los elementos JSX estáticos

**Impacto: LOW (evita la recreación)**

Extrae el JSX estático fuera de los componentes para evitar su recreación.

**Incorrecto: recrea el elemento en cada render**

```tsx
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />
}

function Container() {
  return (
    <div>
      {loading && <LoadingSkeleton />}
    </div>
  )
}
```

**Correcto: reutiliza el mismo elemento**

```tsx
const loadingSkeleton = (
  <div className="animate-pulse h-20 bg-gray-200" />
)

function Container() {
  return (
    <div>
      {loading && loadingSkeleton}
    </div>
  )
}
```

Esto es especialmente útil para nodos SVG grandes y estáticos, que pueden ser costosos de recrear en cada render.

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, el compiler hace hoisting automáticamente de los elementos JSX estáticos y optimiza los re-renders de los componentes, lo que hace innecesario el hoisting manual.

### 6.4 Optimiza la precisión de los SVG

**Impacto: LOW (reduce el tamaño del archivo)**

Reduce la precisión de las coordenadas de los SVG para disminuir el tamaño del archivo. La precisión óptima depende del tamaño del viewBox, pero en general se debe considerar reducir la precisión.

**Incorrecto: precisión excesiva**

```svg
<path d="M 10.293847 20.847362 L 30.938472 40.192837" />
```

**Correcto: 1 decimal**

```svg
<path d="M 10.3 20.8 L 30.9 40.2" />
```

**Automatízalo con SVGO:**

```bash
npx svgo --precision=1 --multipass icon.svg
```

### 6.5 Evita el hydration mismatch sin parpadeos

**Impacto: MEDIUM (evita el parpadeo visual y los errores de hydration)**

Al renderizar contenido que depende del almacenamiento del lado del cliente (localStorage, cookies), evita tanto la ruptura del SSR como el parpadeo posterior a la hydration inyectando un script síncrono que actualice el DOM antes de que React haga la hydration.

**Incorrecto: rompe el SSR**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  // localStorage no está disponible en el servidor - lanza un error
  const theme = localStorage.getItem('theme') || 'light'
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}
```

El server-side rendering fallará porque `localStorage` es undefined.

**Incorrecto: parpadeo visual**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    // Se ejecuta después de la hydration - provoca un destello visible
    const stored = localStorage.getItem('theme')
    if (stored) {
      setTheme(stored)
    }
  }, [])
  
  return (
    <div className={theme}>
      {children}
    </div>
  )
}
```

El componente primero se renderiza con el valor por defecto (`light`) y luego se actualiza después de la hydration, lo que provoca un destello visible de contenido incorrecto.

**Correcto: sin parpadeo, sin hydration mismatch**

```tsx
function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <div id="theme-wrapper">
        {children}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'light';
                var el = document.getElementById('theme-wrapper');
                if (el) el.className = theme;
              } catch (e) {}
            })();
          `,
        }}
      />
    </>
  )
}
```

El script inline se ejecuta de forma síncrona antes de mostrar el elemento, lo que asegura que el DOM ya tenga el valor correcto. Sin parpadeo, sin hydration mismatch.

Este patrón es especialmente útil para los toggles de tema, las preferencias del usuario, los estados de autenticación y cualquier dato solo del cliente que deba renderizarse de inmediato sin mostrar destellos de valores por defecto.

### 6.6 Suprime los hydration mismatches esperados

**Impacto: LOW-MEDIUM (evita advertencias de hydration ruidosas para diferencias conocidas)**

En los frameworks con SSR (p. ej., Next.js), algunos valores son intencionalmente diferentes en el servidor y en el cliente (IDs aleatorios, fechas, formato de locale/zona horaria). Para estos mismatches *esperados*, envuelve el texto dinámico en un elemento con `suppressHydrationWarning` para evitar advertencias ruidosas. No uses esto para ocultar bugs reales. No abuses de ello.

**Incorrecto: advertencias de mismatches conocidos**

```tsx
function Timestamp() {
  return <span>{new Date().toLocaleString()}</span>
}
```

**Correcto: suprime solo el mismatch esperado**

```tsx
function Timestamp() {
  return (
    <span suppressHydrationWarning>
      {new Date().toLocaleString()}
    </span>
  )
}
```

### 6.7 Usa el componente Activity para mostrar/ocultar

**Impacto: MEDIUM (preserva el estado/DOM)**

Usa el `<Activity>` de React para preservar el estado/DOM de los componentes costosos que alternan su visibilidad con frecuencia.

**Uso:**

```tsx
import { Activity } from 'react'

function Dropdown({ isOpen }: Props) {
  return (
    <Activity mode={isOpen ? 'visible' : 'hidden'}>
      <ExpensiveMenu />
    </Activity>
  )
}
```

Evita re-renders costosos y la pérdida del estado.

### 6.8 Usa defer o async en las etiquetas script

**Impacto: HIGH (elimina el bloqueo del renderizado)**

Las etiquetas script sin `defer` ni `async` bloquean el parseo del HTML mientras el script se descarga y se ejecuta. Esto retrasa el First Contentful Paint y el Time to Interactive.

- **`defer`**: Se descarga en paralelo, se ejecuta después de que termina el parseo del HTML y mantiene el orden de ejecución

- **`async`**: Se descarga en paralelo, se ejecuta inmediatamente cuando está listo, sin orden garantizado

Usa `defer` para los scripts que dependen del DOM o de otros scripts. Usa `async` para scripts independientes como las analíticas.

**Incorrecto: bloquea el renderizado**

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

**Correcto: no bloqueante**

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

**Nota:** En Next.js, prefiere el componente `next/script` con la prop `strategy` en lugar de etiquetas script directas:

Referencia: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer)

### 6.9 Usa renderizado condicional explícito

**Impacto: LOW (evita renderizar 0 o NaN)**

Usa operadores ternarios explícitos (`? :`) en lugar de `&&` para el renderizado condicional cuando la condición pueda ser `0`, `NaN` u otros valores falsy que se renderizan.

**Incorrecto: renderiza "0" cuando count es 0**

```tsx
function Badge({ count }: { count: number }) {
  return (
    <div>
      {count && <span className="badge">{count}</span>}
    </div>
  )
}

// Cuando count = 0, renderiza: <div>0</div>
// Cuando count = 5, renderiza: <div><span class="badge">5</span></div>
```

**Correcto: no renderiza nada cuando count es 0**

```tsx
function Badge({ count }: { count: number }) {
  return (
    <div>
      {count > 0 ? <span className="badge">{count}</span> : null}
    </div>
  )
}

// Cuando count = 0, renderiza: <div></div>
// Cuando count = 5, renderiza: <div><span class="badge">5</span></div>
```

### 6.10 Usa los resource hints de React DOM

**Impacto: HIGH (reduce el tiempo de carga de los recursos críticos)**

React DOM proporciona APIs para indicarle al navegador los recursos que va a necesitar. Son especialmente útiles en los server components para empezar a cargar recursos antes de que el cliente siquiera reciba el HTML.

- **`prefetchDNS(href)`**: Resuelve el DNS de un dominio al que esperas conectarte

- **`preconnect(href)`**: Establece la conexión (DNS + TCP + TLS) con un servidor

- **`preload(href, options)`**: Obtiene un recurso (stylesheet, fuente, script, imagen) que usarás pronto

- **`preloadModule(href)`**: Obtiene un módulo ES que usarás pronto

- **`preinit(href, options)`**: Obtiene y evalúa un stylesheet o script

- **`preinitModule(href)`**: Obtiene y evalúa un módulo ES

**Ejemplo: preconnect a APIs de terceros**

```tsx
import { preconnect, prefetchDNS } from 'react-dom'

export default function App() {
  prefetchDNS('https://analytics.example.com')
  preconnect('https://api.example.com')

  return <main>{/* contenido */}</main>
}
```

**Ejemplo: preload de fuentes y estilos críticos**

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

**Ejemplo: preload de módulos para rutas con code splitting**

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

Referencia: [https://react.dev/reference/react-dom#resource-preloading-apis](https://react.dev/reference/react-dom#resource-preloading-apis)

### 6.11 Usa useTransition en lugar de estados de carga manuales

**Impacto: LOW (reduce los re-renders y mejora la claridad del código)**

Usa `useTransition` en lugar de `useState` manual para los estados de carga. Proporciona un estado `isPending` integrado y gestiona las transiciones automáticamente.

**Incorrecto: estado de carga manual**

```tsx
function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setIsLoading(true)
    setQuery(value)
    const data = await fetchResults(value)
    setResults(data)
    setIsLoading(false)
  }

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isLoading && <Spinner />}
      <ResultsList results={results} />
    </>
  )
}
```

**Correcto: useTransition con estado pending integrado**

```tsx
import { useTransition, useState } from 'react'

function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setQuery(value) // Actualiza el input de inmediato
    
    startTransition(async () => {
      // Obtiene y actualiza los resultados
      const data = await fetchResults(value)
      setResults(data)
    })
  }

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  )
}
```

**Beneficios:**

- **Estado pending automático**: No es necesario gestionar manualmente `setIsLoading(true/false)`

- **Resiliencia ante errores**: El estado pending se restablece correctamente incluso si la transición lanza un error

- **Mejor capacidad de respuesta**: Mantiene la UI responsiva durante las actualizaciones

- **Manejo de interrupciones**: Las nuevas transiciones cancelan automáticamente las pendientes

Referencia: [https://react.dev/reference/react/useTransition](https://react.dev/reference/react/useTransition)

---

## 7. Rendimiento de JavaScript

**Impacto: LOW-MEDIUM**

Las micro-optimizaciones en los hot paths pueden sumar mejoras significativas.

### 7.1 Evita el layout thrashing

**Impacto: MEDIUM (evita layouts síncronos forzados y reduce los cuellos de botella de rendimiento)**

Evita intercalar escrituras de estilos con lecturas de layout. Cuando lees una propiedad de layout (como `offsetWidth`, `getBoundingClientRect()` o `getComputedStyle()`) entre cambios de estilo, el navegador se ve obligado a disparar un reflow síncrono.

**Esto está bien: el navegador agrupa los cambios de estilo**

```typescript
function updateElementStyles(element: HTMLElement) {
  // Cada línea invalida el estilo, pero el navegador agrupa el recálculo
  element.style.width = '100px'
  element.style.height = '200px'
  element.style.backgroundColor = 'blue'
  element.style.border = '1px solid black'
}
```

**Incorrecto: las lecturas y escrituras intercaladas fuerzan reflows**

```typescript
function layoutThrashing(element: HTMLElement) {
  element.style.width = '100px'
  const width = element.offsetWidth  // Fuerza un reflow
  element.style.height = '200px'
  const height = element.offsetHeight  // Fuerza otro reflow
}
```

**Correcto: agrupa las escrituras y luego lee una sola vez**

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

**Correcto: agrupa las lecturas y luego las escrituras**

```typescript
function updateElementStyles(element: HTMLElement) {
  element.classList.add('highlighted-box')
  
  const { width, height } = element.getBoundingClientRect()
}
```

**Mejor: usa clases CSS**

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

### 7.2 Construye index maps para búsquedas repetidas

**Impacto: LOW-MEDIUM (de 1M operaciones a 2K operaciones)**

Múltiples llamadas a `.find()` por la misma key deben usar un Map.

**Incorrecto (O(n) por búsqueda):**

```typescript
function processOrders(orders: Order[], users: User[]) {
  return orders.map(order => ({
    ...order,
    user: users.find(u => u.id === order.userId)
  }))
}
```

**Correcto (O(1) por búsqueda):**

```typescript
function processOrders(orders: Order[], users: User[]) {
  const userById = new Map(users.map(u => [u.id, u]))

  return orders.map(order => ({
    ...order,
    user: userById.get(order.userId)
  }))
}
```

Construye el map una vez (O(n)), y luego todas las búsquedas son O(1).

Para 1000 órdenes × 1000 usuarios: 1M operaciones → 2K operaciones.

### 7.3 Cachea el acceso a propiedades en los bucles

**Impacto: LOW-MEDIUM (reduce las búsquedas)**

Cachea las búsquedas de propiedades de objetos en los hot paths.

**Incorrecto: 3 búsquedas × N iteraciones**

```typescript
for (let i = 0; i < arr.length; i++) {
  process(obj.config.settings.value)
}
```

**Correcto: 1 búsqueda en total**

```typescript
const value = obj.config.settings.value
const len = arr.length
for (let i = 0; i < len; i++) {
  process(value)
}
```

### 7.4 Cachea las llamadas repetidas a funciones

**Impacto: MEDIUM (evita cómputos redundantes)**

Usa un Map a nivel de módulo para cachear los resultados de una función cuando la misma función se llama repetidamente con los mismos inputs durante el render.

**Incorrecto: cómputo redundante**

```typescript
function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        // slugify() se llama más de 100 veces para los mismos nombres de proyecto
        const slug = slugify(project.name)
        
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

**Correcto: resultados cacheados**

```typescript
// Caché a nivel de módulo
const slugifyCache = new Map<string, string>()

function cachedSlugify(text: string): string {
  if (slugifyCache.has(text)) {
    return slugifyCache.get(text)!
  }
  const result = slugify(text)
  slugifyCache.set(text, result)
  return result
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        // Se calcula solo una vez por cada nombre de proyecto único
        const slug = cachedSlugify(project.name)
        
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

**Patrón más simple para funciones de un solo valor:**

```typescript
let isLoggedInCache: boolean | null = null

function isLoggedIn(): boolean {
  if (isLoggedInCache !== null) {
    return isLoggedInCache
  }
  
  isLoggedInCache = document.cookie.includes('auth=')
  return isLoggedInCache
}

// Limpia la caché cuando cambia la autenticación
function onAuthChange() {
  isLoggedInCache = null
}
```

Usa un Map (no un hook) para que funcione en todas partes: utilidades, event handlers, no solo en componentes de React.

Referencia: [https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)

### 7.5 Cachea las llamadas a la Storage API

**Impacto: LOW-MEDIUM (reduce la I/O costosa)**

`localStorage`, `sessionStorage` y `document.cookie` son síncronos y costosos. Cachea las lecturas en memoria.

**Incorrecto: lee el storage en cada llamada**

```typescript
function getTheme() {
  return localStorage.getItem('theme') ?? 'light'
}
// Llamada 10 veces = 10 lecturas del storage
```

**Correcto: caché con Map**

```typescript
const storageCache = new Map<string, string | null>()

function getLocalStorage(key: string) {
  if (!storageCache.has(key)) {
    storageCache.set(key, localStorage.getItem(key))
  }
  return storageCache.get(key)
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
  storageCache.set(key, value)  // mantén la caché sincronizada
}
```

Usa un Map (no un hook) para que funcione en todas partes: utilidades, event handlers, no solo en componentes de React.

**Caching de cookies:**

```typescript
let cookieCache: Record<string, string> | null = null

function getCookie(name: string) {
  if (!cookieCache) {
    cookieCache = Object.fromEntries(
      document.cookie.split('; ').map(c => c.split('='))
    )
  }
  return cookieCache[name]
}
```

**Importante: invalida ante cambios externos**

```typescript
window.addEventListener('storage', (e) => {
  if (e.key) storageCache.delete(e.key)
})

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    storageCache.clear()
  }
})
```

Si el storage puede cambiar externamente (otra pestaña, cookies establecidas por el servidor), invalida la caché:

### 7.6 Combina múltiples iteraciones de arrays

**Impacto: LOW-MEDIUM (reduce las iteraciones)**

Múltiples llamadas a `.filter()` o `.map()` iteran el array varias veces. Combínalas en un solo bucle.

**Incorrecto: 3 iteraciones**

```typescript
const admins = users.filter(u => u.isAdmin)
const testers = users.filter(u => u.isTester)
const inactive = users.filter(u => !u.isActive)
```

**Correcto: 1 iteración**

```typescript
const admins: User[] = []
const testers: User[] = []
const inactive: User[] = []

for (const user of users) {
  if (user.isAdmin) admins.push(user)
  if (user.isTester) testers.push(user)
  if (!user.isActive) inactive.push(user)
}
```

### 7.7 Difiere el trabajo no crítico con requestIdleCallback

**Impacto: MEDIUM (mantiene la UI responsiva durante las tareas en segundo plano)**

Usa `requestIdleCallback()` para programar el trabajo no crítico durante los periodos ociosos del navegador. Esto mantiene el main thread libre para las interacciones del usuario y las animaciones, reduciendo el jank y mejorando el rendimiento percibido.

**Incorrecto: bloquea el main thread durante la interacción del usuario**

```typescript
function handleSearch(query: string) {
  const results = searchItems(query)
  setResults(results)

  // Esto bloquea el main thread de inmediato
  analytics.track('search', { query })
  saveToRecentSearches(query)
  prefetchTopResults(results.slice(0, 3))
}
```

**Correcto: difiere el trabajo no crítico al tiempo ocioso**

```typescript
function handleSearch(query: string) {
  const results = searchItems(query)
  setResults(results)

  // Difiere el trabajo no crítico a los periodos ociosos
  requestIdleCallback(() => {
    analytics.track('search', { query })
  })

  requestIdleCallback(() => {
    saveToRecentSearches(query)
  })

  requestIdleCallback(() => {
    prefetchTopResults(results.slice(0, 3))
  })
}
```

**Con timeout para el trabajo obligatorio:**

```typescript
// Asegura que las analíticas se disparen en 2 segundos aunque el navegador siga ocupado
requestIdleCallback(
  () => analytics.track('page_view', { path: location.pathname }),
  { timeout: 2000 }
)
```

**Dividir tareas grandes en chunks:**

```typescript
function processLargeDataset(items: Item[]) {
  let index = 0

  function processChunk(deadline: IdleDeadline) {
    // Procesa elementos mientras haya tiempo ocioso (apunta a chunks de <50ms)
    while (index < items.length && deadline.timeRemaining() > 0) {
      processItem(items[index])
      index++
    }

    // Programa el siguiente chunk si quedan más elementos
    if (index < items.length) {
      requestIdleCallback(processChunk)
    }
  }

  requestIdleCallback(processChunk)
}
```

**Con fallback para navegadores sin soporte:**

```typescript
const scheduleIdleWork = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1))

scheduleIdleWork(() => {
  // Trabajo no crítico
})
```

**Cuándo usarlo:**

- Analíticas y telemetría

- Guardar el estado en localStorage/IndexedDB

- Hacer prefetch de recursos para las siguientes acciones probables

- Procesar transformaciones de datos no urgentes

- Inicialización lazy de funcionalidades no críticas

**Cuándo NO usarlo:**

- Acciones iniciadas por el usuario que necesitan feedback inmediato

- Actualizaciones de renderizado que el usuario está esperando

- Operaciones sensibles al tiempo

### 7.8 Verificación temprana de la longitud en las comparaciones de arrays

**Impacto: MEDIUM-HIGH (evita operaciones costosas cuando las longitudes difieren)**

Al comparar arrays con operaciones costosas (ordenamiento, igualdad profunda, serialización), verifica primero las longitudes. Si las longitudes difieren, los arrays no pueden ser iguales.

En aplicaciones del mundo real, esta optimización es especialmente valiosa cuando la comparación se ejecuta en hot paths (event handlers, bucles de render).

**Incorrecto: siempre ejecuta la comparación costosa**

```typescript
function hasChanges(current: string[], original: string[]) {
  // Siempre ordena y une, incluso cuando las longitudes difieren
  return current.sort().join() !== original.sort().join()
}
```

Se ejecutan dos ordenamientos O(n log n) incluso cuando `current.length` es 5 y `original.length` es 100. También existe el overhead de unir los arrays y comparar los strings.

**Correcto (primero la verificación O(1) de la longitud):**

```typescript
function hasChanges(current: string[], original: string[]) {
  // Early return si las longitudes difieren
  if (current.length !== original.length) {
    return true
  }
  // Solo ordena cuando las longitudes coinciden
  const currentSorted = current.toSorted()
  const originalSorted = original.toSorted()
  for (let i = 0; i < currentSorted.length; i++) {
    if (currentSorted[i] !== originalSorted[i]) {
      return true
    }
  }
  return false
}
```

Este nuevo enfoque es más eficiente porque:

- Evita el overhead de ordenar y unir los arrays cuando las longitudes difieren

- Evita consumir memoria para los strings unidos (especialmente importante para arrays grandes)

- Evita mutar los arrays originales

- Retorna temprano cuando se encuentra una diferencia

### 7.9 Early return en las funciones

**Impacto: LOW-MEDIUM (evita cómputos innecesarios)**

Retorna temprano cuando el resultado ya está determinado para omitir el procesamiento innecesario.

**Incorrecto: procesa todos los elementos incluso después de encontrar la respuesta**

```typescript
function validateUsers(users: User[]) {
  let hasError = false
  let errorMessage = ''
  
  for (const user of users) {
    if (!user.email) {
      hasError = true
      errorMessage = 'Email required'
    }
    if (!user.name) {
      hasError = true
      errorMessage = 'Name required'
    }
    // Sigue verificando todos los usuarios incluso después de encontrar un error
  }
  
  return hasError ? { valid: false, error: errorMessage } : { valid: true }
}
```

**Correcto: retorna de inmediato en el primer error**

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    if (!user.email) {
      return { valid: false, error: 'Email required' }
    }
    if (!user.name) {
      return { valid: false, error: 'Name required' }
    }
  }

  return { valid: true }
}
```

### 7.10 Haz hoisting de la creación de RegExp

**Impacto: LOW-MEDIUM (evita la recreación)**

No crees RegExp dentro del render. Haz hoisting al scope del módulo o memoízala con `useMemo()`.

**Incorrecto: nueva RegExp en cada render**

```tsx
function Highlighter({ text, query }: Props) {
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

**Correcto: memoiza o haz hoisting**

```tsx
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Highlighter({ text, query }: Props) {
  const regex = useMemo(
    () => new RegExp(`(${escapeRegex(query)})`, 'gi'),
    [query]
  )
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

**Advertencia: una regex global tiene estado mutable**

```typescript
const regex = /foo/g
regex.test('foo')  // true, lastIndex = 3
regex.test('foo')  // false, lastIndex = 0
```

Una regex global (`/g`) tiene un estado `lastIndex` mutable:

### 7.11 Usa flatMap para hacer map y filter en una sola pasada

**Impacto: LOW-MEDIUM (elimina el array intermedio)**

Encadenar `.map().filter(Boolean)` crea un array intermedio e itera dos veces. Usa `.flatMap()` para transformar y filtrar en una sola pasada.

**Incorrecto: 2 iteraciones, array intermedio**

```typescript
const userNames = users
  .map(user => user.isActive ? user.name : null)
  .filter(Boolean)
```

**Correcto: 1 iteración, sin array intermedio**

```typescript
const userNames = users.flatMap(user =>
  user.isActive ? [user.name] : []
)
```

**Más ejemplos:**

```typescript
// Extrae los emails válidos de las respuestas
// Antes
const emails = responses
  .map(r => r.success ? r.data.email : null)
  .filter(Boolean)

// Después
const emails = responses.flatMap(r =>
  r.success ? [r.data.email] : []
)

// Parsea y filtra los números válidos
// Antes
const numbers = strings
  .map(s => parseInt(s, 10))
  .filter(n => !isNaN(n))

// Después
const numbers = strings.flatMap(s => {
  const n = parseInt(s, 10)
  return isNaN(n) ? [] : [n]
})
```

**Cuándo usarlo:**

- Al transformar elementos mientras se filtran algunos

- En mapeos condicionales donde algunos inputs no producen ningún output

- Al parsear/validar donde los inputs inválidos deben omitirse

### 7.12 Usa un bucle para min/max en lugar de sort

**Impacto: LOW (O(n) en lugar de O(n log n))**

Encontrar el elemento más pequeño o más grande solo requiere una pasada por el array. Ordenar es un desperdicio y es más lento.

**Incorrecto (O(n log n) - ordenar para encontrar el más reciente):**

```typescript
interface Project {
  id: string
  name: string
  updatedAt: number
}

function getLatestProject(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => b.updatedAt - a.updatedAt)
  return sorted[0]
}
```

Ordena todo el array solo para encontrar el valor máximo.

**Incorrecto (O(n log n) - ordenar para el más antiguo y el más reciente):**

```typescript
function getOldestAndNewest(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => a.updatedAt - b.updatedAt)
  return { oldest: sorted[0], newest: sorted[sorted.length - 1] }
}
```

Sigue ordenando innecesariamente cuando solo se necesitan el mínimo y el máximo.

**Correcto (O(n) - un solo bucle):**

```typescript
function getLatestProject(projects: Project[]) {
  if (projects.length === 0) return null
  
  let latest = projects[0]
  
  for (let i = 1; i < projects.length; i++) {
    if (projects[i].updatedAt > latest.updatedAt) {
      latest = projects[i]
    }
  }
  
  return latest
}

function getOldestAndNewest(projects: Project[]) {
  if (projects.length === 0) return { oldest: null, newest: null }
  
  let oldest = projects[0]
  let newest = projects[0]
  
  for (let i = 1; i < projects.length; i++) {
    if (projects[i].updatedAt < oldest.updatedAt) oldest = projects[i]
    if (projects[i].updatedAt > newest.updatedAt) newest = projects[i]
  }
  
  return { oldest, newest }
}
```

Una sola pasada por el array, sin copias, sin ordenamiento.

**Alternativa: Math.min/Math.max para arrays pequeños**

```typescript
const numbers = [5, 2, 8, 1, 9]
const min = Math.min(...numbers)
const max = Math.max(...numbers)
```

Esto funciona para arrays pequeños, pero puede ser más lento o directamente lanzar un error para arrays muy grandes debido a las limitaciones del spread operator. La longitud máxima del array es aproximadamente 124000 en Chrome 143 y 638000 en Safari 18; los números exactos pueden variar - consulta [el fiddle](https://jsfiddle.net/qw1jabsx/4/). Usa el enfoque del bucle para mayor confiabilidad.

### 7.13 Usa Set/Map para búsquedas O(1)

**Impacto: LOW-MEDIUM (de O(n) a O(1))**

Convierte los arrays en Set/Map para las verificaciones de pertenencia repetidas.

**Incorrecto (O(n) por verificación):**

```typescript
const allowedIds = ['a', 'b', 'c', ...]
items.filter(item => allowedIds.includes(item.id))
```

**Correcto (O(1) por verificación):**

```typescript
const allowedIds = new Set(['a', 'b', 'c', ...])
items.filter(item => allowedIds.has(item.id))
```

### 7.14 Usa toSorted() en lugar de sort() para la inmutabilidad

**Impacto: MEDIUM-HIGH (evita bugs de mutación en el estado de React)**

`.sort()` muta el array in-place, lo que puede provocar bugs con el estado y las props de React. Usa `.toSorted()` para crear un nuevo array ordenado sin mutación.

**Incorrecto: muta el array original**

```typescript
function UserList({ users }: { users: User[] }) {
  // ¡Muta el array de la prop users!
  const sorted = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
```

**Correcto: crea un nuevo array**

```typescript
function UserList({ users }: { users: User[] }) {
  // Crea un nuevo array ordenado, el original no cambia
  const sorted = useMemo(
    () => users.toSorted((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
```

**Por qué es importante en React:**

1. Las mutaciones de props/estado rompen el modelo de inmutabilidad de React: React espera que las props y el estado se traten como de solo lectura

2. Provoca bugs de stale closures: mutar arrays dentro de closures (callbacks, effects) puede llevar a un comportamiento inesperado

**Soporte de navegadores: fallback para navegadores antiguos**

```typescript
// Fallback para navegadores antiguos
const sorted = [...items].sort((a, b) => a.value - b.value)
```

`.toSorted()` está disponible en todos los navegadores modernos (Chrome 110+, Safari 16+, Firefox 115+, Node.js 20+). Para entornos más antiguos, usa el spread operator:

**Otros métodos inmutables de arrays:**

- `.toSorted()` - sort inmutable

- `.toReversed()` - reverse inmutable

- `.toSpliced()` - splice inmutable

- `.with()` - reemplazo inmutable de elementos

---

## 8. Patrones avanzados

**Impacto: LOW**

Patrones avanzados para casos específicos que requieren una implementación cuidadosa.

### 8.1 No pongas los Effect Events en los arrays de dependencias

**Impacto: LOW (evita re-ejecuciones innecesarias del effect y errores de lint)**

Las funciones Effect Event no tienen una identidad estable. Su identidad cambia intencionalmente en cada render. No incluyas la función devuelta por `useEffectEvent` en el array de dependencias de un `useEffect`. Mantén los valores reactivos reales como dependencias y llama al Effect Event desde dentro del cuerpo del effect o desde las suscripciones creadas por ese effect.

**Incorrecto: Effect Event agregado como dependencia**

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, onConnected }: {
  roomId: string
  onConnected: () => void
}) {
  const handleConnected = useEffectEvent(onConnected)

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', handleConnected)
    connection.connect()

    return () => connection.disconnect()
  }, [roomId, handleConnected])
}
```

Incluir el Effect Event en las dependencias hace que el effect se vuelva a ejecutar en cada render y dispara la regla de lint de React Hooks.

**Correcto: depende de los valores reactivos, no del Effect Event**

```tsx
import { useEffect, useEffectEvent } from 'react'

function ChatRoom({ roomId, onConnected }: {
  roomId: string
  onConnected: () => void
}) {
  const handleConnected = useEffectEvent(onConnected)

  useEffect(() => {
    const connection = createConnection(roomId)
    connection.on('connected', handleConnected)
    connection.connect()

    return () => connection.disconnect()
  }, [roomId])
}
```

Referencia: [https://react.dev/reference/react/useEffectEvent#effect-event-in-deps](https://react.dev/reference/react/useEffectEvent#effect-event-in-deps)

### 8.2 Inicializa la app una vez, no en cada montaje

**Impacto: LOW-MEDIUM (evita la inicialización duplicada en desarrollo)**

No pongas la inicialización de toda la app que debe ejecutarse una vez por carga de la app dentro del `useEffect([])` de un componente. Los componentes pueden volver a montarse y los effects se volverán a ejecutar. En su lugar, usa un guard a nivel de módulo o una inicialización de nivel superior en el módulo de entrada.

**Incorrecto: se ejecuta dos veces en dev, se vuelve a ejecutar al volver a montarse**

```tsx
function Comp() {
  useEffect(() => {
    loadFromStorage()
    checkAuthToken()
  }, [])

  // ...
}
```

**Correcto: una vez por carga de la app**

```tsx
let didInit = false

function Comp() {
  useEffect(() => {
    if (didInit) return
    didInit = true
    loadFromStorage()
    checkAuthToken()
  }, [])

  // ...
}
```

Referencia: [https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application](https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application)

### 8.3 Almacena los event handlers en refs

**Impacto: LOW (suscripciones estables)**

Almacena los callbacks en refs cuando se usen en effects que no deban volver a suscribirse cuando el callback cambie.

**Incorrecto: se vuelve a suscribir en cada render**

```tsx
function useWindowEvent(event: string, handler: (e) => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    return () => window.removeEventListener(event, handler)
  }, [event, handler])
}
```

**Correcto: suscripción estable**

```tsx
import { useEffectEvent } from 'react'

function useWindowEvent(event: string, handler: (e) => void) {
  const onEvent = useEffectEvent(handler)

  useEffect(() => {
    window.addEventListener(event, onEvent)
    return () => window.removeEventListener(event, onEvent)
  }, [event])
}
```

**Alternativa: usa `useEffectEvent` si estás en la última versión de React:**

`useEffectEvent` proporciona una API más limpia para el mismo patrón: crea una referencia de función estable que siempre llama a la última versión del handler.

### 8.4 useEffectEvent para refs de callbacks estables

**Impacto: LOW (evita re-ejecuciones del effect)**

Accede a los valores más recientes en los callbacks sin agregarlos a los arrays de dependencias. Evita re-ejecuciones del effect y, al mismo tiempo, evita stale closures.

**Incorrecto: el effect se vuelve a ejecutar en cada cambio del callback**

```tsx
function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(query), 300)
    return () => clearTimeout(timeout)
  }, [query, onSearch])
}
```

**Correcto: usando useEffectEvent de React**

```tsx
import { useEffectEvent } from 'react';

function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('')
  const onSearchEvent = useEffectEvent(onSearch)

  useEffect(() => {
    const timeout = setTimeout(() => onSearchEvent(query), 300)
    return () => clearTimeout(timeout)
  }, [query])
}
```

---

## Referencias

1. [https://react.dev](https://react.dev)
2. [https://nextjs.org](https://nextjs.org)
3. [https://swr.vercel.app](https://swr.vercel.app)
4. [https://github.com/shuding/better-all](https://github.com/shuding/better-all)
5. [https://github.com/isaacs/node-lru-cache](https://github.com/isaacs/node-lru-cache)
6. [https://vercel.com/blog/how-we-optimized-package-imports-in-next-js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
7. [https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
