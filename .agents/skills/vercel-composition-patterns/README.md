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
