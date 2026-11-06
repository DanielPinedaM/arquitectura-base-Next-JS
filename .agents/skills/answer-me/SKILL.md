---
name: answer-me
description: 'Responde explicando primero la teoría (concepto y causa, sin código) y después la evidencia: citas textuales con ruta:línea. Úsala siempre que el usuario pregunte por qué pasa algo o pida explicar un código, error, comportamiento o resultado. Ejemplos: «¿por qué no se ve el botón?», «explícame este error», «qué hace esta función», «responder sin modificar».'
---

# Responder preguntas del usuario

Ante una pregunta (por qué pasa algo, explícame esto, qué hace este código), responder en este orden:

1. **Teoría:** explicar concepto y causa con palabras, sin código.
2. **Evidencia:** cita textual del código o texto con `ruta:línea` (sin parafrasear; líneas exactas con grep -n) y, si hace falta, una frase que la conecte con la teoría.

Estructura de cada paso (el ejemplo es ilustrativo): título con la idea → cita `ruta:líneas` → explicación que la conecta → siguiente cita si hace falta.

**Ejemplo:**
¿Por qué no aparece el mensaje de bienvenida?

````
# 1. El mensaje de bienvenida solo se muestra cuando el usuario esta autenticado

`src/app/header.ts:4`:
```ts
const isAuthenticated = false;

let message = "";

if (isAuthenticated) {
  message = "Bienvenido";
}
```
````
