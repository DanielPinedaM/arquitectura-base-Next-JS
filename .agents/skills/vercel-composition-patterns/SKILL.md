---
name: vercel-composition-patterns
description:
  Patrones de composición de React que escalan. Úsala al refactorizar componentes con
  proliferación de props booleanas, al construir librerías de componentes flexibles o al
  diseñar APIs reutilizables. Se activa en tareas que involucran compound components,
  render props, context providers o arquitectura de componentes. Incluye los cambios de API
  de React 19.
---

# Patrones de composición de React

## Resumen

Patrones de composición para construir componentes de React flexibles y mantenibles. Evita la proliferación de props booleanas usando compound components, levantando el estado y componiendo los elementos internos. Estos patrones hacen que los codebases sean más fáciles de trabajar, tanto para humanos como para agentes de IA, a medida que escalan.

## ¿Cuándo aplicar la skill?

Consulta estas reglas cuando:

- Refactorices componentes con muchas props booleanas
- Construyas librerías de componentes reutilizables
- Diseñes APIs de componentes flexibles
- Revises la arquitectura de componentes
- Trabajes con compound components o context providers

## Reglas fundamentales

1. **Composición sobre configuración** — En lugar de agregar props, deja que los consumidores
   compongan
2. **Levanta tu estado** — El estado en providers, no atrapado en componentes
3. **Compón tus elementos internos** — Los subcomponentes acceden al context, no a props
4. **Variantes explícitas** — Crea ThreadComposer, EditComposer, no un Composer
   con isThread

## ¿Cómo Leer la Skill?

Lee **bajo demanda** los archivos `.md` ubicados en [`.agents/skills/vercel-composition-patterns/reglas/`](reglas/): usa la [Tabla de Contenido](#tabla-de-contenido) como referencia para inferir cuáles archivos son necesarios para la tarea que estás resolviendo, y accede únicamente a esos archivos.

**Razón**: leer todos los archivos consume contexto y tokens innecesariamente.

Hay dos criterios para leer un archivo:

1. La columna **¿Cuándo leerlo?**: abre el archivo cuando tu tarea coincida con la situación que describe.

2. [El **impacto**](#niveles-de-impacto) (CRITICAL → HIGH → MEDIUM-HIGH → MEDIUM → LOW-MEDIUM → LOW) que aparece entre paréntesis en el subtítulo de cada categoría de la [Tabla de Contenido](#tabla-de-contenido). Consulta las [Categorías de reglas por prioridad](#categorías-de-reglas-por-prioridad).

Cada archivo de regla contiene: una breve explicación de por qué es importante, un ejemplo de código incorrecto, un ejemplo de código correcto y contexto adicional con referencias.

## Niveles de impacto

| Nivel | Significado |
| ----- | ----------- |
| `CRITICAL` | Patrones fundamentales; evita código difícil de mantener |
| `HIGH` | Mejoras significativas en la mantenibilidad |
| `MEDIUM` | Buenas prácticas para un código más limpio |

## Categorías de reglas por prioridad

| Prioridad | Categoría | Impacto | Prefijo |
| --------- | --------- | ------- | ------- |
| 1 | [Arquitectura de componentes](#1-arquitectura-de-componentes-high) | HIGH | `architecture-` |
| 2 | [Gestión del estado](#2-gestión-del-estado-medium) | MEDIUM | `state-` |
| 3 | [Patrones de implementación](#3-patrones-de-implementación-medium) | MEDIUM | `patterns-` |
| 4 | [APIs de React 19](#4-apis-de-react-19-medium) | MEDIUM | `react19-` |

## Tabla de Contenido

### [1. Arquitectura de componentes (HIGH)](reglas/arquitectura-de-componentes/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Evita la proliferación de props booleanas](reglas/arquitectura-de-componentes/architecture-evitar-props-booleanas.md) | Al crear o refactorizar un componente que acumula props booleanas para cambiar su comportamiento (`isThread`, `isEditing`, `isDMThread`, `isForwarding`) y ternarios anidados en el JSX, o cuando te piden agregarle «un flag más» a un componente, aunque no se mencione la composición: explica por qué cada booleano duplica los estados posibles y cómo reemplazarlos componiendo piezas compartidas (`Composer.Frame`, `Composer.Input`, `Composer.Footer`). |
| [Usa compound components](reglas/arquitectura-de-componentes/architecture-compound-components.md) | Al diseñar o refactorizar un componente complejo con partes opcionales (`renderHeader`, `renderFooter`, `showAttachments`, `showEmojis`) para estructurarlo como compound components (`Composer.Provider`, `Composer.Frame`, `Composer.Input`, `Composer.Submit`) que comparten el estado mediante `createContext` y `use()` en lugar de prop drilling. Trata la estructura del compound component, no el tipado del context ni dónde vive el estado. |

### [2. Gestión del estado (MEDIUM)](reglas/gestion-del-estado/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Desacopla la gestión del estado de la UI](reglas/gestion-del-estado/state-desacoplar-implementacion.md) | Cuando un componente de UI llama directamente a hooks de estado global o de sincronización (`useGlobalChannelState`, `useChannelSync`, un store de Zustand), o cuando la misma UI debe funcionar con otra fuente de estado (`useState` local, Zustand o sincronización con el servidor): solo el provider debe conocer la implementación del estado y la UI consume únicamente la interfaz del context. |
| [Define interfaces de context genéricas para la inyección de dependencias](reglas/gestion-del-estado/state-interfaz-de-context.md) | Al definir el tipo del context de un compound component o de un provider (`createContext<ComposerContextValue \| null>`): una interfaz genérica con tres partes, `state`, `actions` y `meta` (`ComposerState`, `ComposerActions`, `ComposerMeta`), que funciona como contrato de inyección de dependencias para que varios providers distintos sirvan a los mismos componentes de UI. |
| [Levanta el estado a componentes provider](reglas/gestion-del-estado/state-levantar-estado.md) | Cuando un estado vive dentro de un componente (`useState` dentro de `ForwardMessageComposer`) pero lo necesitan componentes hermanos que están fuera de él, como una vista previa o un botón de submit en un diálogo, o cuando ves un `useEffect` que sincroniza el estado hacia el padre (`onInputChange`) o una ref que se lee al hacer submit: mueve ese estado a un componente provider dedicado. |

### [3. Patrones de implementación (MEDIUM)](reglas/patrones-de-implementacion/)

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Crea variantes explícitas de componentes](reglas/patrones-de-implementacion/patterns-variantes-explicitas.md) | Al decidir cómo se usan los distintos casos de un componente desde afuera: en lugar de un `<Composer isThread isEditing={false} showAttachments />` configurado por modos, crea componentes con nombre propio (`ThreadComposer`, `EditMessageComposer`, `ForwardMessageComposer`), cada uno con su provider y sus piezas compartidas, aunque no se mencione la palabra «variante». |
| [Prefiere componer children en lugar de render props](reglas/patrones-de-implementacion/patterns-children-en-lugar-de-render-props.md) | Al diseñar la API de un componente que recibe props `renderHeader`, `renderFooter`, `renderActions` u otras `renderX` para inyectar UI, o al dudar entre `children` y render props: prefiere componer con `children` para estructuras estáticas y reserva las render props (como `renderItem`) para cuando el padre necesita pasarle datos al hijo. |

### [4. APIs de React 19 (MEDIUM)](reglas/apis-de-react-19/)

> **⚠️ Solo React 19+.** Omite esta sección si usas React 18 o una versión anterior.

| Título y ruta archivo | ¿Cuándo leerlo? |
| --- | --- |
| [Cambios en la API de React 19](reglas/apis-de-react-19/react19-no-forwardref.md) | Al escribir o migrar componentes de un proyecto con React 19 o superior que usan `forwardRef` para recibir una `ref`, o `useContext()` para leer un context: en React 19, `ref` es una prop normal y `use()` reemplaza a `useContext()` (y se puede llamar de forma condicional). No aplica a React 18 ni a versiones anteriores. |
