# Cómo crear una nueva regla

Un repositorio estructurado de patrones de composición de React que escalan. Estos
patrones ayudan a evitar la proliferación de props booleanas usando compound components,
levantando el estado y componiendo los elementos internos.

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
   - `architecture-` para Arquitectura de componentes → `reglas/arquitectura-de-componentes/`
   - `state-` para Gestión del estado → `reglas/gestion-del-estado/`
   - `patterns-` para Patrones de implementación → `reglas/patrones-de-implementacion/`
   - `react19-` para APIs de React 19 → `reglas/apis-de-react-19/`

   Si ninguna categoría corresponde a la regla, primero sigue los pasos de [Si la regla necesita una categoría nueva](#si-la-regla-necesita-una-categoría-nueva).
3. Completa el frontmatter y el contenido
4. Asegúrate de tener ejemplos claros con explicaciones
5. Agrega la nueva regla a la Tabla de Contenido del SKILL.md, bajo el subtítulo de su categoría, con su ¿Cuándo leerlo?

## Si la regla necesita una categoría nueva

Si ninguna categoría existente corresponde a la regla, crea primero la categoría:

1. Agrega la sección a `reglas/crear-nueva-regla/_secciones.md`, con su número, su nombre, su prefijo entre paréntesis, su impacto y su descripción, en la posición que le corresponde según su prioridad (si cambia la numeración, renumera las secciones siguientes).
2. Crea la subcarpeta `reglas/<subcarpeta-de-la-categoría>/`. Su nombre se deriva del nombre de la categoría: en kebab-case y sin tildes ni ñ (por ejemplo, «Gestión del estado» → `gestion-del-estado`).
3. Agrega el prefijo y su subcarpeta a la lista de prefijos de [Crear una nueva regla](#crear-una-nueva-regla).
4. En el SKILL.md:
   - agrega una fila a «Categorías de reglas por prioridad», con la prioridad, la categoría (enlazada a su subtítulo de la Tabla de Contenido), el impacto y el prefijo;
   - agrega en la «Tabla de Contenido» el subtítulo `### N. <Categoría> (<IMPACTO>)`, con su línea «Carpeta:» y su tabla «Título y ruta archivo | ¿Cuándo leerlo?», en la posición que le corresponde según su prioridad; si cambia la numeración, actualiza los números y los enlaces de ancla de las categorías siguientes.
5. Después, sigue los pasos de [Crear una nueva regla](#crear-una-nueva-regla) para crear la regla dentro de la categoría nueva.

## Niveles de impacto

- `CRITICAL` - Patrones fundamentales, evita código inmantenible
- `HIGH` - Mejoras significativas de mantenibilidad
- `MEDIUM` - Buenas prácticas para un código más limpio
