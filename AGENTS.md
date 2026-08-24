# Ejecución de Proyecto

* Runtime: Node.js
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

| Comando            | Ambiente    | Variable de Entorno            |
| ------------------ | ----------- | ------------------------------ |
| `pnpm start:local` | Local host  | `environments/.env.localhost`  |
| `pnpm start:test`  | Pruebas     | `environments/.env.test`       |
| `pnpm start:prod`  | Producción  | `environments/.env.production` |

# Generar Carpeta `.next` (`build`) para Desplegar

| Comando           | Ambiente    | Variable de Entorno            |
| ----------------- | ----------- | ------------------------------ |
| `pnpm build:test` | Pruebas     | `environments/.env.test`       |
| `pnpm build:prod` | Producción  | `environments/.env.production` |

# Ejecutar Carpeta `.next` con Archivos de Compilación
`pnpm start` ejecuta en `http://localhost:2000` los archivos ya compilados dentro de la carpeta `.next`. NO recibe ni lee variables de entorno.

## Regla
El ambiente queda **hardcodeado dentro de la carpeta `.next`** durante el `build`, NO se define al ejecutar `pnpm start`.

Motivo: Next.js reemplaza cada `process.env.NEXT_PUBLIC_*` por su valor literal mientras compila. Por eso el ambiente ya viene incrustado en los archivos que generaron `pnpm build:test` o `pnpm build:prod`, y `pnpm start` únicamente los sirve.

## Pasos
1. Generar la carpeta `.next` con el ambiente deseado, usando uno de los comandos de la sección "Generar Carpeta `.next` (`build`) para Desplegar"

2. Ejecutar la carpeta `.next`

```bash
pnpm start
```

## Cambiar de Ambiente
Volver a ejecutar `pnpm start` NO cambia el ambiente. Para cambiarlo, generar de nuevo la carpeta `.next` con `pnpm build:test` o `pnpm build:prod` según el ambiente requerido, y después ejecutar `pnpm start`.

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

# Buenas Practicas de TypeScript
* Usar strict type checking

* Prefiere la inferencia de tipos cuando el tipo sea obvio

* Prohibido el tipo `any`; usa `unknown` cuando el tipo sea incierto

# Regla **OBLIGATORIA** para Next.js
Este proyecto usa Next.js 16. Sus breaking changes pueden diferir de tus datos de entrenamiento. La guía en `node_modules/next/dist/docs/` y la skill en `claude/skills/vercel-react-best-practices/SKILL.md` (resuelta desde el directorio de este archivo) son la **fuente de la verdad**: consultarlas antes de escribir código o responder. Respeta los avisos de deprecación.
