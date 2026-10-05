# Cómo crear una nueva regla

Un repositorio estructurado para crear y mantener buenas prácticas de React optimizadas para agentes y LLMs.

## Estructura

- `reglas/` - Archivos de reglas individuales (uno por regla)
  - `crear-nueva-regla/`
    - `_secciones.md` - Metadata de las secciones (títulos, impactos, descripciones)
    - `_plantilla.md` - Plantilla para crear nuevas reglas
    - `como-crear-una-nueva-regla.md` - Esta guía
  - `<subcarpeta-de-la-categoría>/`
    - `area-descripcion.md` - Archivos de reglas individuales

## Crear una nueva regla

1. Copia `reglas/crear-nueva-regla/_plantilla.md` a `reglas/<subcarpeta-de-la-categoría>/area-descripcion.md`
2. Elige el prefijo de área apropiado:
   - `async-` para Eliminar waterfalls (Sección 1) → `reglas/eliminar-waterfalls/`
   - `bundle-` para Optimización del tamaño del bundle (Sección 2) → `reglas/optimizacion-del-tamano-del-bundle/`
   - `server-` para Rendimiento del lado del servidor (Sección 3) → `reglas/rendimiento-del-lado-del-servidor/`
   - `client-` para Obtención de datos del lado del cliente (Sección 4) → `reglas/obtencion-de-datos-del-lado-del-cliente/`
   - `rerender-` para Optimización de re-renders (Sección 5) → `reglas/optimizacion-de-re-renders/`
   - `rendering-` para Rendimiento del renderizado (Sección 6) → `reglas/rendimiento-del-renderizado/`
   - `js-` para Rendimiento de JavaScript (Sección 7) → `reglas/rendimiento-de-javascript/`
   - `advanced-` para Patrones avanzados (Sección 8) → `reglas/patrones-avanzados/`

   Si ninguna categoría corresponde a la regla, primero sigue los pasos de [Si la regla necesita una categoría nueva](#si-la-regla-necesita-una-categoría-nueva).
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones
5. Agrega la nueva regla a la Tabla de Contenido del SKILL.md, bajo el subtítulo de su categoría, con su ¿Cuándo leerlo?
6. Actualiza el conteo «N reglas en M categorías» del Resumen del SKILL.md.

## Si la regla necesita una categoría nueva

Si ninguna categoría existente corresponde a la regla, crea primero la categoría:

1. Agrega la sección a `reglas/crear-nueva-regla/_secciones.md`, con su número, su nombre, su prefijo entre paréntesis, su impacto y su descripción, en la posición que le corresponde según su prioridad (si cambia la numeración, renumera las secciones siguientes).
2. Crea la subcarpeta `reglas/<subcarpeta-de-la-categoría>/`. Su nombre se deriva del nombre de la categoría: en kebab-case y sin tildes ni ñ (por ejemplo, «Optimización del tamaño del bundle» → `optimizacion-del-tamano-del-bundle`).
3. Agrega el prefijo y su subcarpeta a la lista de prefijos de [Crear una nueva regla](#crear-una-nueva-regla).
4. En el SKILL.md:
   - agrega una fila a «Categorías de reglas por prioridad», con la prioridad, la categoría (enlazada a su subtítulo de la Tabla de Contenido), el impacto y el prefijo;
   - agrega en la «Tabla de Contenido» el subtítulo `### N. <Categoría> (<IMPACTO>)`, con su línea «Carpeta:» y su tabla «Título y ruta archivo | ¿Cuándo leerlo?», en la posición que le corresponde según su prioridad; si cambia la numeración, actualiza los números y los enlaces de ancla de las categorías siguientes;
   - actualiza el conteo «N reglas en M categorías» del Resumen.
5. Después, sigue los pasos de [Crear una nueva regla](#crear-una-nueva-regla) para crear la regla dentro de la categoría nueva.

## Estructura de los archivos de reglas

Cada archivo de regla debe seguir esta estructura, que es el contenido de la plantilla `reglas/crear-nueva-regla/_plantilla.md`:

````markdown
---
title: Título de la regla aquí
impact: MEDIUM
impactDescription: Descripción opcional del impacto (p. ej., "20-50% de mejora")
tags: tag1, tag2
---

## Título de la regla aquí

**Impacto: MEDIUM (descripción opcional del impacto)**

Breve explicación de la regla y de por qué es importante. Debe ser clara y concisa, y explicar las implicaciones en el rendimiento.

**Incorrecto (descripción de lo que está mal):**

```typescript
// Ejemplo de código malo aquí
const bad = example()
```

**Correcto (descripción de lo que está bien):**

```typescript
// Ejemplo de código bueno aquí
const good = example()
```

Referencia: [Enlace a la documentación o recurso](https://example.com)
````

Después de los ejemplos puedes agregar texto explicativo opcional, antes de la línea `Referencia:`.

## Convención de nombres de archivos

- Los archivos que empiezan con `_` son especiales
- Archivos de reglas: `area-descripcion.md` (p. ej., `async-paralelo.md`)
- Guarda la regla en la subcarpeta de su categoría: cada subcarpeta contiene solo las reglas de esa categoría (por ejemplo, `reglas/eliminar-waterfalls/` solo tiene reglas de Eliminar waterfalls).

## Niveles de impacto

- `CRITICAL` - Máxima prioridad, grandes mejoras de rendimiento
- `HIGH` - Mejoras de rendimiento significativas
- `MEDIUM-HIGH` - Mejoras moderadas-altas
- `MEDIUM` - Mejoras de rendimiento moderadas
- `LOW-MEDIUM` - Mejoras bajas-medias
- `LOW` - Mejoras incrementales

## Contribuir

Al agregar o modificar reglas:

1. Usa el prefijo de nombre de archivo correcto para tu sección
2. Sigue la estructura de `_plantilla.md`
3. Incluye ejemplos malos/buenos claros con explicaciones
4. Agrega los tags apropiados
5. Agrega la nueva regla a la Tabla de Contenido del SKILL.md, bajo el subtítulo de su categoría, con su ¿Cuándo leerlo?
6. Guarda la regla en la subcarpeta de su categoría: cada subcarpeta contiene solo las reglas de esa categoría (por ejemplo, `reglas/eliminar-waterfalls/` solo tiene reglas de Eliminar waterfalls).
7. Si agregaste una regla, actualiza el conteo «N reglas en M categorías» del Resumen del SKILL.md.
