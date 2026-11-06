---
name: answer-me
description: 'Responde explicando primero la teoría (concepto y causa, sin código) y después la evidencia: citas textuales con ruta:línea. Úsala siempre que el usuario pregunte por qué pasa algo o pida explicar un código, error, comportamiento o resultado, aunque no pida citas. Ejemplos: «¿por qué no se ve el botón?», «explícame este error», «qué hace esta función», «responder sin modificar».'
---

# Responder preguntas del usuario

Ante una pregunta (por qué pasa algo, explícame esto, qué hace este código), responder en este orden:

1. **Teoría:** explicar concepto y causa con palabras, sin código.
2. **Evidencia:** cita textual del código o texto con `ruta:línea` (sin parafrasear; líneas exactas con grep -n) y, si hace falta, una frase que la conecte con la teoría.

Estructura de cada paso (el ejemplo es ilustrativo): título con la idea → cita `ruta:líneas` → explicación que la conecta → siguiente cita si hace falta.

Ejemplo («¿por qué no se ve el botón?»):

````
## 1. El botón solo se pinta si hay usuario
`src/app/header.component.html:4`:
```html
@if (user) { <button>Salir</button> }
```
Si `user` está vacío, Angular no pinta el botón. `src/app/header.component.ts:8`:
```ts
user = null
```
````
