# Secciones

Este archivo define todas las secciones, su orden, niveles de impacto y descripciones.
El ID de la sección (entre paréntesis) es el prefijo del nombre de archivo que se usa para agrupar las reglas.

---

## 1. Arquitectura de componentes (architecture)

**Impacto:** HIGH  
**Descripción:** Patrones fundamentales para estructurar componentes, evitar la proliferación
de props y permitir una composición flexible.

## 2. Gestión del estado (state)

**Impacto:** MEDIUM  
**Descripción:** Patrones para levantar el estado y gestionar el context compartido entre
componentes compuestos.

## 3. Patrones de implementación (patterns)

**Impacto:** MEDIUM  
**Descripción:** Técnicas específicas para implementar compound components y
context providers.

## 4. APIs de React 19 (react19)

**Impacto:** MEDIUM  
**Descripción:** Solo React 19+. No uses `forwardRef`; usa `use()` en lugar de `useContext()`.
