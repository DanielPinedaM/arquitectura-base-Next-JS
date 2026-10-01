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

## Agradecimientos

Creado originalmente por [@shuding](https://x.com/shuding) en [Vercel](https://vercel.com).
