# Inspeccionar los atributos de un elemento

Cuando el snapshot no muestra el `id`, la `class`, los atributos `data-*` u otras propiedades del DOM de un elemento, usa `eval` para inspeccionarlos.

## Ejemplos

```bash
pnpm exec playwright-cli snapshot
# el snapshot muestra un botón como e7 pero no revela su id ni sus atributos data

# obtener el id del elemento
pnpm exec playwright-cli eval "el => el.id" e7

# obtener todas las clases CSS
pnpm exec playwright-cli eval "el => el.className" e7

# obtener un atributo específico
pnpm exec playwright-cli eval "el => el.getAttribute('data-testid')" e7
pnpm exec playwright-cli eval "el => el.getAttribute('aria-label')" e7

# obtener una propiedad de estilo computado
pnpm exec playwright-cli eval "el => getComputedStyle(el).display" e7
```
