# Secciones

Este archivo define todas las secciones, su orden, niveles de impacto y descripciones.
El ID de la sección (entre paréntesis) es el prefijo del nombre de archivo que se usa para agrupar las reglas.

---

## 1. Eliminar waterfalls (async)

**Impacto:** CRITICAL  
**Descripción:** Los waterfalls son el asesino número 1 del rendimiento. Cada await secuencial agrega la latencia de red completa. Eliminarlos produce las mayores mejoras.

## 2. Optimización del tamaño del bundle (bundle)

**Impacto:** CRITICAL  
**Descripción:** Reducir el tamaño del bundle inicial mejora el Time to Interactive y el Largest Contentful Paint.

## 3. Rendimiento del lado del servidor (server)

**Impacto:** HIGH  
**Descripción:** Optimizar el server-side rendering y la obtención de datos elimina los waterfalls del lado del servidor y reduce los tiempos de respuesta.

## 4. Obtención de datos del lado del cliente (client)

**Impacto:** MEDIUM-HIGH  
**Descripción:** La deduplicación automática y los patrones eficientes de obtención de datos reducen las peticiones de red redundantes.

## 5. Optimización de re-renders (rerender)

**Impacto:** MEDIUM  
**Descripción:** Reducir los re-renders innecesarios minimiza el cómputo desperdiciado y mejora la capacidad de respuesta de la UI.

## 6. Rendimiento del renderizado (rendering)

**Impacto:** MEDIUM  
**Descripción:** Optimizar el proceso de renderizado reduce el trabajo que el navegador necesita hacer.

## 7. Rendimiento de JavaScript (js)

**Impacto:** LOW-MEDIUM  
**Descripción:** Las micro-optimizaciones en los hot paths pueden sumar mejoras significativas.

## 8. Patrones avanzados (advanced)

**Impacto:** LOW  
**Descripción:** Patrones avanzados para casos específicos que requieren una implementación cuidadosa.
