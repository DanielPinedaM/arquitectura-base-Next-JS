<!-- BEGIN:nextjs-agent-rules -->

# Next.js: SIEMPRE lee la documentación antes de programar

Antes de realizar cualquier trabajo con Next.js, busca y lee la documentación correspondiente en `node_modules/next/dist/docs/`. Tus datos de entrenamiento sobre Next.js están desactualizados; la documentación es la fuente de la verdad.

<!-- END:nextjs-agent-rules -->

# Ejecución de Proyecto

* Runtime: Node.js
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

| Comando            | Entorno     | Archivo de configuración       |
| ------------------ | ----------- | ------------------------------ |
| `pnpm start:local` | Local host  | `environments/.env.localhost`  |
| `pnpm start:test`  | Pruebas     | `environments/.env.test`       |
| `pnpm start:prod`  | Producción  | `environments/.env.production` |

# Builds para despliegue

| Comando           | Entorno     | Archivo de configuración       |
| ----------------- | ----------- | ------------------------------ |
| `pnpm build:test` | Pruebas     | `environments/.env.test`       |
| `pnpm build:prod` | Producción  | `environments/.env.production` |

# Reglas Obligatorias para la IA
* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.

# Reglas de Idioma

## Responder en Español
Responder en español siempre, excepto lo que esta en "Excepciones, Responder en Ingles"

Es decir, redactar en español todas las explicaciones, comentarios de codigo, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario. Con la excepcion de lo siguiente que tiene que estar en ingles:

## Excepciones, Responder en Ingles
* Términos técnicos de uso común en desarrollo de software: hook, stores, api, ui, utils, component, props, middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload, patrones de diseño, etc.

* Nombres de frameworks, librerías, paquetes, APIs

* Código fuente (todo, **excepto los comentarios de codigo**): Identificadores, nombres de archivos y carpetas, route group de Next.js, clases, interface, enum, métodos, funciones, parámetros, variables, nombres de archivos reservados de Next.js (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `proxy.ts`), route groups `(nombre)`, carpetas privadas `_nombre`, segmentos dinámicos `[param]`

## Excepciones dentro de las Excepciones, esto debe estar en Español
Aunque la sección anterior indica que los "nombres de archivos y carpetas" van en inglés, existe un caso puntual que queda **excluido de esa excepción** y por lo tanto debe estar en español:

1. Los nombres de las carpetas dentro de `src/app/(features)` que representen un **segmento de ruta (route segment) visible en la URL**
2. Las carpetas dentro de `src/features/<feature>` que representen una página/ruta y que estén asociadas a ese segmento de ruta en `src/app/`

### Explicación
En Next.js App Router no existe un archivo central de rutas: el nombre de la carpeta dentro de `app/` **es** el segmento de la URL. Por eso, toda carpeta dentro de `src/app/` que aparezca en la URL final debe estar en español. Quedan excluidos de esta regla (se mantienen en inglés): route groups `(nombre)`, carpetas privadas `_nombre`, segmentos dinámicos `[param]` y archivos reservados como `page.tsx`.

```console
src/app/
├── (features)/                     # route group, no aparece en la URL  -> ingles
│   ├── (auth)/                     # route group, no aparece en la URL  -> ingles
│   │   └── iniciar-sesion/         # segmento de ruta                   -> español
│   │       ├── components/         # carpeta de codigo, no es ruta      -> ingles
│   │       │   └── example.tsx     # nombre de archivo                  -> ingles
│   │       └── page.tsx            # archivo reservado de Next.js       -> ingles
│   └── asignar-nueva-clave/        # segmento de ruta                   -> español
│       └── [id]/                   # segmento dinamico                  -> ingles
│           └── page.tsx            # archivo reservado de Next.js       -> ingles
└── page.tsx                        # archivo reservado de Next.js       -> ingles
```

Resultado: URLs `/iniciar-sesion`, `/asignar-nueva-clave/123`

Es decir:
1. Dentro de `src/features/<feature>` existen carpetas que representan páginas/rutas y están en español.
2. Esas carpetas están asociadas a su respectivo segmento de ruta dentro de `src/app/`.
3. El nombre de la carpeta dentro de `src/app/` (el segmento de ruta) va en español.

Ejemplo: `src/features/auth/recuperar-clave/` asociada a `src/app/(auth)/recuperar-clave/page.tsx` — ambos en español. El resto del código dentro de esa carpeta (archivos `.tsx`, componentes, funciones, hooks, variables) sigue en inglés según la sección anterior.
