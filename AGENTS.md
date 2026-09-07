# Ejecución de Proyecto

* Runtime: Node.js 24
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

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

* Preferir la inferencia de tipos cuando el tipo sea obvio

* Prohibido el tipo `any`; usa `unknown` cuando el tipo sea incierto.

* Preferir `interface` para tipos de objeto (`Producto`) y para el tipo de los elementos en arrays de objetos (`Producto[]`).

* Usar `Record<Clave, Valor>` para objetos con claves dinámicas.

* Usar `type` para tipos primitivos, literales y uniones.

# Reglas **OBLIGATORIAS** de Next.js
Este proyecto usa Next.js 16. Sus breaking changes pueden diferir de tus datos de entrenamiento:

Antes de escribir código o responder, es **obligatorio** consultar las siguientes fuentes, cada una según su propósito:

1. Guía en `node_modules/next/dist/docs/`: Respetar los avisos de deprecación.

2. Skill `vercel-react-best-practices` (`.claude/skills/vercel-react-best-practices/SKILL.md` y `.claude/skills/vercel-react-best-practices/rules`)

Estas fuentes son la **única fuente de verdad** frente a tus datos de entrenamiento y su cumplimiento es **obligatorio**.

Precedencia, de mayor a menor importancia:

1. Este `AGENTS.md`
2. Skill `vercel-react-best-practices`
3. Guía en `node_modules/next/dist/docs/`
4. Tus datos de entrenamiento

## Formularios
* Usar React Hook Form junto con `import { zodResolver } from '@hookform/resolvers/zod'` para validar formularios y los componentes UI de formularios de Shad cn ubicados en `src\shared\ui\shad-cn\react-hook-form`

* Para botones y enlaces, usar los componentes que estan en `src/shared/ui/buttons`. **PROHIBIDO** usar directamente las etiquetas nativas de HTML `<a>` y `<button>`, o `next/link`, sin estos componentes.

* **PROHIBIDO**  usar alternativas a React Hook Form: formularios controlados manualmente con `useState`/`useReducer`, Formik, o manejo de `onChange`/`onSubmit` sin pasar por `useForm`

* **PROHIBIDO** usar alternativas a `zodResolver`/Zod para validar formularios: reglas de validación nativas del navegador (`required`, `pattern` en el JSX), lógica de validación manual/imperativa dentro de handlers, `yupResolver`, `joiResolver`, class-validator, o validator functions custom sin Zod

* Los Zod schema tienen que estar dentro de un archivo `.schema.ts` dentro de la carpeta padre del componente al que pertenece cada validación de formulario

## Gestión de Estado
* Mantén las transformaciones de estado puras y predecibles

* Para estados globales usar Zustand, **PROHIBIDO** usar alternativas como Redux, `useContext`, etc.
