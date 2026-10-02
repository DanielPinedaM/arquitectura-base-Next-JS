---
name: vercel-react-best-practices
description: Lineamientos de optimización del rendimiento de React y Next.js de Vercel Engineering. Esta skill debe usarse al escribir, revisar o refactorizar código de React/Next.js para asegurar patrones de rendimiento óptimos. Se activa en tareas que involucran componentes de React, páginas de Next.js, obtención de datos, optimización del bundle o mejoras de rendimiento.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Buenas prácticas de React de Vercel

Guía completa de optimización del rendimiento para aplicaciones de React y Next.js, mantenida por Vercel. Contiene 70 reglas en 8 categorías, priorizadas por impacto para guiar la refactorización y la generación de código automatizadas.

# Resumen

Guía completa de optimización del rendimiento para aplicaciones de React y Next.js, diseñada para agentes de IA y LLMs. Contiene más de 40 reglas en 8 categorías, priorizadas por impacto, desde críticas (eliminar waterfalls, reducir el tamaño del bundle) hasta incrementales (patrones avanzados). Cada regla incluye explicaciones detalladas, ejemplos del mundo real que comparan implementaciones incorrectas vs. correctas y métricas de impacto específicas para guiar la refactorización y la generación de código automatizadas.

# Buenas prácticas de React

Un repositorio estructurado para crear y mantener buenas prácticas de React optimizadas para agentes y LLMs.

## Estructura

- `rules/` - Archivos de reglas individuales (uno por regla)
  - `_sections.md` - Metadata de las secciones (títulos, impactos, descripciones)
  - `_template.md` - Plantilla para crear nuevas reglas
  - `area-description.md` - Archivos de reglas individuales
- `src/` - Scripts de build y utilidades
- `metadata.json` - Metadata del documento (versión, organización, resumen)
- __`AGENTS.md`__ - Salida compilada (generada)
- __`test-cases.json`__ - Casos de prueba para la evaluación de LLMs (generado)

## Primeros pasos

1. Instala las dependencias:
   ```bash
   pnpm install
   ```

2. Haz build de AGENTS.md a partir de las reglas:
   ```bash
   pnpm build
   ```

3. Valida los archivos de reglas:
   ```bash
   pnpm validate
   ```

4. Extrae los casos de prueba:
   ```bash
   pnpm extract-tests
   ```

## Crear una nueva regla

1. Copia `rules/_template.md` a `rules/area-description.md`
2. Elige el prefijo de área apropiado:
   - `async-` para Eliminar waterfalls (Sección 1)
   - `bundle-` para Optimización del tamaño del bundle (Sección 2)
   - `server-` para Rendimiento del lado del servidor (Sección 3)
   - `client-` para Obtención de datos del lado del cliente (Sección 4)
   - `rerender-` para Optimización de re-renders (Sección 5)
   - `rendering-` para Rendimiento del renderizado (Sección 6)
   - `js-` para Rendimiento de JavaScript (Sección 7)
   - `advanced-` para Patrones avanzados (Sección 8)
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones
5. Ejecuta `pnpm build` para regenerar AGENTS.md y test-cases.json

## Estructura de los archivos de reglas

Cada archivo de regla debe seguir esta estructura:

```markdown
---
title: Título de la regla aquí
impact: MEDIUM
impactDescription: Descripción opcional
tags: tag1, tag2, tag3
---

## Título de la regla aquí

Breve explicación de la regla y de por qué es importante.

**Incorrecto (descripción de lo que está mal):**

```typescript
// Ejemplo de código malo
```

**Correcto (descripción de lo que está bien):**

```typescript
// Ejemplo de código bueno
```

Texto explicativo opcional después de los ejemplos.

Referencia: [Enlace](https://example.com)

## Convención de nombres de archivos

- Los archivos que empiezan con `_` son especiales (excluidos del build)
- Archivos de reglas: `area-description.md` (p. ej., `async-parallel.md`)
- La sección se infiere automáticamente a partir del prefijo del nombre de archivo
- Las reglas se ordenan alfabéticamente por título dentro de cada sección
- Los IDs (p. ej., 1.1, 1.2) se generan automáticamente durante el build

## Niveles de impacto

- `CRITICAL` - Máxima prioridad, grandes mejoras de rendimiento
- `HIGH` - Mejoras de rendimiento significativas
- `MEDIUM-HIGH` - Mejoras moderadas-altas
- `MEDIUM` - Mejoras de rendimiento moderadas
- `LOW-MEDIUM` - Mejoras bajas-medias
- `LOW` - Mejoras incrementales

## Scripts

- `pnpm build` - Compila las reglas en AGENTS.md
- `pnpm validate` - Valida todos los archivos de reglas
- `pnpm extract-tests` - Extrae los casos de prueba para la evaluación de LLMs
- `pnpm dev` - Hace build y valida

## Contribuir

Al agregar o modificar reglas:

1. Usa el prefijo de nombre de archivo correcto para tu sección
2. Sigue la estructura de `_template.md`
3. Incluye ejemplos malos/buenos claros con explicaciones
4. Agrega los tags apropiados
5. Ejecuta `pnpm build` para regenerar AGENTS.md y test-cases.json
6. Las reglas se ordenan automáticamente por título: ¡no es necesario gestionar los números!

## Cuándo aplicar la skill

Consulta estos lineamientos cuando:
- Escribas nuevos componentes de React o páginas de Next.js
- Implementes la obtención de datos (del lado del cliente o del servidor)
- Revises código en busca de problemas de rendimiento
- Refactorices código existente de React/Next.js
- Optimices el tamaño del bundle o los tiempos de carga

## Categorías de reglas por prioridad

| Prioridad | Categoría | Impacto | Prefijo |
|----------|----------|--------|--------|
| 1 | Eliminar waterfalls | CRITICAL | `async-` |
| 2 | Optimización del tamaño del bundle | CRITICAL | `bundle-` |
| 3 | Rendimiento del lado del servidor | HIGH | `server-` |
| 4 | Obtención de datos del lado del cliente | MEDIUM-HIGH | `client-` |
| 5 | Optimización de re-renders | MEDIUM | `rerender-` |
| 6 | Rendimiento del renderizado | MEDIUM | `rendering-` |
| 7 | Rendimiento de JavaScript | LOW-MEDIUM | `js-` |
| 8 | Patrones avanzados | LOW | `advanced-` |

## Referencia rápida

### 1. Eliminar waterfalls (CRITICAL)

- `async-cheap-condition-before-await` - Verifica las condiciones síncronas baratas antes de hacer await de flags o valores remotos
- `async-defer-await` - Mueve el await a las ramas donde realmente se usa
- `async-parallel` - Usa Promise.all() para operaciones independientes
- `async-dependencies` - Usa better-all para dependencias parciales
- `async-api-routes` - Inicia las promises temprano y haz await tarde en las API routes
- `async-suspense-boundaries` - Usa Suspense para hacer streaming del contenido

### 2. Optimización del tamaño del bundle (CRITICAL)

- `bundle-barrel-imports` - Importa directamente, evita los barrel files
- `bundle-analyzable-paths` - Prefiere paths de import y del sistema de archivos analizables estáticamente para evitar bundles y traces amplios
- `bundle-dynamic-imports` - Usa next/dynamic para los componentes pesados
- `bundle-defer-third-party` - Carga analytics/logging después de la hydration
- `bundle-conditional` - Carga los módulos solo cuando la funcionalidad está activada
- `bundle-preload` - Haz preload en hover/focus para mejorar la velocidad percibida

### 3. Rendimiento del lado del servidor (HIGH)

- `server-auth-actions` - Autentica las server actions como las API routes
- `server-cache-react` - Usa React.cache() para la deduplicación por petición
- `server-cache-lru` - Usa una caché LRU para el caching entre peticiones
- `server-dedup-props` - Evita la serialización duplicada en las props de RSC
- `server-hoist-static-io` - Haz hoisting de la I/O estática (fuentes, logos) al nivel del módulo
- `server-no-shared-module-state` - Evita el estado de petición mutable a nivel de módulo en RSC/SSR
- `server-serialization` - Minimiza los datos que se pasan a los client components
- `server-parallel-fetching` - Reestructura los componentes para paralelizar los fetches
- `server-parallel-nested-fetching` - Encadena los fetches anidados por elemento en Promise.all
- `server-after-nonblocking` - Usa after() para operaciones no bloqueantes

### 4. Obtención de datos del lado del cliente (MEDIUM-HIGH)

- `client-swr-dedup` - Usa SWR para la deduplicación automática de peticiones
- `client-event-listeners` - Deduplica los event listeners globales
- `client-passive-event-listeners` - Usa listeners pasivos para el scroll
- `client-localstorage-schema` - Versiona y minimiza los datos de localStorage

### 5. Optimización de re-renders (MEDIUM)

- `rerender-defer-reads` - No te suscribas a un estado que solo se usa en callbacks
- `rerender-memo` - Extrae el trabajo costoso a componentes memoizados
- `rerender-memo-with-default-value` - Haz hoisting de las props por defecto no primitivas
- `rerender-dependencies` - Usa dependencias primitivas en los effects
- `rerender-derived-state` - Suscríbete a booleanos derivados, no a valores en bruto
- `rerender-derived-state-no-effect` - Deriva el estado durante el render, no en effects
- `rerender-functional-setstate` - Usa el setState funcional para callbacks estables
- `rerender-lazy-state-init` - Pasa una función a useState para valores costosos
- `rerender-simple-expression-in-memo` - Evita memo para primitivos simples
- `rerender-split-combined-hooks` - Divide los hooks con dependencias independientes
- `rerender-move-effect-to-event` - Pon la lógica de interacción en los event handlers
- `rerender-transitions` - Usa startTransition para las actualizaciones no urgentes
- `rerender-use-deferred-value` - Difiere los renders costosos para mantener el input responsivo
- `rerender-use-ref-transient-values` - Usa refs para valores transitorios frecuentes
- `rerender-no-inline-components` - No definas componentes dentro de componentes

### 6. Rendimiento del renderizado (MEDIUM)

- `rendering-animate-svg-wrapper` - Anima un div wrapper, no el elemento SVG
- `rendering-content-visibility` - Usa content-visibility para listas largas
- `rendering-hoist-jsx` - Extrae el JSX estático fuera de los componentes
- `rendering-svg-precision` - Reduce la precisión de las coordenadas SVG
- `rendering-hydration-no-flicker` - Usa un script inline para los datos solo del cliente
- `rendering-hydration-suppress-warning` - Suprime los mismatches esperados
- `rendering-activity` - Usa el componente Activity para mostrar/ocultar
- `rendering-conditional-render` - Usa el ternario, no &&, para los condicionales
- `rendering-usetransition-loading` - Prefiere useTransition para el estado de carga
- `rendering-resource-hints` - Usa los resource hints de React DOM para el preloading
- `rendering-script-defer-async` - Usa defer o async en las etiquetas script

### 7. Rendimiento de JavaScript (LOW-MEDIUM)

- `js-batch-dom-css` - Agrupa los cambios de CSS mediante clases o cssText
- `js-index-maps` - Construye un Map para búsquedas repetidas
- `js-cache-property-access` - Cachea las propiedades de los objetos en los bucles
- `js-cache-function-results` - Cachea los resultados de las funciones en un Map a nivel de módulo
- `js-cache-storage` - Cachea las lecturas de localStorage/sessionStorage
- `js-combine-iterations` - Combina múltiples filter/map en un solo bucle
- `js-length-check-first` - Verifica la longitud del array antes de una comparación costosa
- `js-early-exit` - Retorna temprano de las funciones
- `js-hoist-regexp` - Haz hoisting de la creación de RegExp fuera de los bucles
- `js-min-max-loop` - Usa un bucle para min/max en lugar de sort
- `js-set-map-lookups` - Usa Set/Map para búsquedas O(1)
- `js-tosorted-immutable` - Usa toSorted() para la inmutabilidad
- `js-flatmap-filter` - Usa flatMap para hacer map y filter en una sola pasada
- `js-request-idle-callback` - Difiere el trabajo no crítico al tiempo ocioso del navegador

### 8. Patrones avanzados (LOW)

- `advanced-effect-event-deps` - No pongas los resultados de `useEffectEvent` en las dependencias del effect
- `advanced-event-handler-refs` - Almacena los event handlers en refs
- `advanced-init-once` - Inicializa la app una vez por carga de la app
- `advanced-use-latest` - useLatest para refs de callbacks estables

## Cómo usarla

Lee los archivos de reglas individuales para ver explicaciones detalladas y ejemplos de código:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Cada archivo de regla contiene:
- Una breve explicación de por qué es importante
- Un ejemplo de código incorrecto con su explicación
- Un ejemplo de código correcto con su explicación
- Contexto adicional y referencias

## Documento compilado completo

Para la guía completa con todas las reglas desarrolladas: `AGENTS.md`
