---
name: vercel-composition-patterns
description:
  Patrones de composición de React que escalan. Úsala al refactorizar componentes con
  proliferación de props booleanas, al construir librerías de componentes flexibles o al
  diseñar APIs reutilizables. Se activa en tareas que involucran compound components,
  render props, context providers o arquitectura de componentes. Incluye los cambios de API
  de React 19.
license: MIT
metadata:
  author: vercel
  version: '1.0.0'
---

# Patrones de composición de React

Patrones de composición para construir componentes de React flexibles y mantenibles. Evita
la proliferación de props booleanas usando compound components, levantando el estado y
componiendo los elementos internos. Estos patrones hacen que los codebases sean más fáciles
de trabajar, tanto para humanos como para agentes de IA, a medida que escalan.

# Resumen

Patrones de composición para construir componentes de React flexibles y mantenibles. Evita la proliferación de props booleanas usando compound components, levantando el estado y componiendo los elementos internos. Estos patrones hacen que los codebases sean más fáciles de trabajar, tanto para humanos como para agentes de IA, a medida que escalan.

# Patrones de composición de React

Un repositorio estructurado de patrones de composición de React que escalan. Estos
patrones ayudan a evitar la proliferación de props booleanas usando compound components,
levantando el estado y componiendo los elementos internos.

## Estructura

- `rules/` - Archivos de reglas individuales (uno por regla)
  - `_sections.md` - Metadata de las secciones (títulos, impactos, descripciones)
  - `_template.md` - Plantilla para crear nuevas reglas
  - `area-description.md` - Archivos de reglas individuales
- `metadata.json` - Metadata del documento (versión, organización, resumen)
- **`AGENTS.md`** - Salida compilada (generada)

## Reglas

### Arquitectura de componentes (CRITICAL)

- `architecture-avoid-boolean-props.md` - No agregues props booleanas para personalizar
  el comportamiento
- `architecture-compound-components.md` - Estructura como compound components con
  context compartido

### Gestión del estado (HIGH)

- `state-lift-state.md` - Levanta el estado a componentes provider
- `state-context-interface.md` - Define interfaces de context claras
  (state/actions/meta)
- `state-decouple-implementation.md` - Desacopla la gestión del estado de la UI

### Patrones de implementación (MEDIUM)

- `patterns-children-over-render-props.md` - Prefiere children en lugar de props renderX
- `patterns-explicit-variants.md` - Crea variantes explícitas de componentes

## Principios fundamentales

1. **Composición sobre configuración** — En lugar de agregar props, deja que los consumidores
   compongan
2. **Levanta tu estado** — El estado en providers, no atrapado en componentes
3. **Compón tus elementos internos** — Los subcomponentes acceden al context, no a props
4. **Variantes explícitas** — Crea ThreadComposer, EditComposer, no un Composer
   con isThread

## Crear una nueva regla

1. Copia `rules/_template.md` a `rules/area-description.md`
2. Elige el prefijo de área apropiado:
   - `architecture-` para Arquitectura de componentes
   - `state-` para Gestión del estado
   - `patterns-` para Patrones de implementación
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones

## Niveles de impacto

- `CRITICAL` - Patrones fundamentales, evita código inmantenible
- `HIGH` - Mejoras significativas de mantenibilidad
- `MEDIUM` - Buenas prácticas para un código más limpio

## Cuándo aplicarla

Consulta estos lineamientos cuando:

- Refactorices componentes con muchas props booleanas
- Construyas librerías de componentes reutilizables
- Diseñes APIs de componentes flexibles
- Revises la arquitectura de componentes
- Trabajes con compound components o context providers

## Categorías de reglas por prioridad

| Prioridad | Categoría                    | Impacto | Prefijo         |
| --------- | ---------------------------- | ------- | --------------- |
| 1         | Arquitectura de componentes  | HIGH    | `architecture-` |
| 2         | Gestión del estado           | MEDIUM  | `state-`        |
| 3         | Patrones de implementación   | MEDIUM  | `patterns-`     |
| 4         | APIs de React 19             | MEDIUM  | `react19-`      |

## Referencia rápida

### 1. Arquitectura de componentes (HIGH)

- `architecture-avoid-boolean-props` - No agregues props booleanas para personalizar
  el comportamiento; usa composición
- `architecture-compound-components` - Estructura los componentes complejos con un
  context compartido

### 2. Gestión del estado (MEDIUM)

- `state-decouple-implementation` - El provider es el único lugar que sabe cómo
  se gestiona el estado
- `state-context-interface` - Define una interfaz genérica con state, actions, meta
  para la inyección de dependencias
- `state-lift-state` - Mueve el estado a componentes provider para que los hermanos puedan acceder a él

### 3. Patrones de implementación (MEDIUM)

- `patterns-explicit-variants` - Crea componentes de variantes explícitas en lugar de
  modos booleanos
- `patterns-children-over-render-props` - Usa children para la composición en lugar
  de props renderX

### 4. APIs de React 19 (MEDIUM)

> **⚠️ Solo React 19+.** Omite esta sección si usas React 18 o una versión anterior.

- `react19-no-forwardref` - No uses `forwardRef`; usa `use()` en lugar de `useContext()`

## Cómo usarla

Lee los archivos de reglas individuales para ver explicaciones detalladas y ejemplos de código:

```
rules/architecture-avoid-boolean-props.md
rules/state-context-interface.md
```

Cada archivo de regla contiene:

- Una breve explicación de por qué es importante
- Un ejemplo de código incorrecto con su explicación
- Un ejemplo de código correcto con su explicación
- Contexto adicional y referencias

## Documento compilado completo

Para la guía completa con todas las reglas desarrolladas: `AGENTS.md`
