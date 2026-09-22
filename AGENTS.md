# Ejecución de Proyecto

* Runtime: Node.js 24
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

# Reglas **OBLIGATORIAS** de Next.js
Este proyecto usa Next.js 16. Sus breaking changes pueden diferir de tus datos de entrenamiento.

Antes de escribir código o responder, consultar estas fuentes, listadas de mayor a menor precedencia:

1. [Skill `next-conventions`](.claude/skills/next-conventions/SKILL.md): Reglas propias del proyecto que definen su arquitectura.

2. [Skill `vercel-react-best-practices`](.claude/skills/vercel-react-best-practices/): El cómo, con ejemplos de código.

3. [Guía](node_modules/next/dist/docs/): Documentación oficial de Next.js; respetar sus avisos de deprecación.

4. Tus datos de entrenamiento: Permitidos, no están prohibidos, pero ceden ante cualquier fuente anterior.

# Resumen de la Skill `next-conventions`

## Tipado en TypeScript
* Usar strict type checking

* Preferir la inferencia de tipos cuando el tipo sea obvio

* Prohibido el tipo `any`; usa `unknown` cuando el tipo sea incierto.

* Preferir `interface` para tipos de objeto (`Task`) y para el tipo de los elementos en arrays de objetos (`Task[]`).

* Usar `Record<Clave, Valor>` para objetos con claves dinámicas.

* Usar `type` para tipos primitivos, literales y uniones.

## Formularios
* Usar React Hook Form junto con `import { zodResolver } from '@hookform/resolvers/zod'` para validar formularios y los componentes UI de formularios de Shad cn ubicados en `src\shared\ui\shad-cn\react-hook-form`

* Para botones y enlaces, usar los componentes que estan en `src/shared/ui/buttons`. **PROHIBIDO** usar directamente las etiquetas nativas de HTML `<a>` y `<button>`, o `next/link`, sin estos componentes.

* **PROHIBIDO**  usar alternativas a React Hook Form: formularios controlados manualmente con `useState`/`useReducer`, Formik, o manejo de `onChange`/`onSubmit` sin pasar por `useForm`

* **PROHIBIDO** usar alternativas a `zodResolver`/Zod para validar formularios: reglas de validación nativas del navegador (`required`, `pattern` en el JSX), lógica de validación manual/imperativa dentro de handlers, `yupResolver`, `joiResolver`, class-validator, o validator functions custom sin Zod

* Los Zod schema tienen que estar dentro de un archivo `.schema.ts` dentro de la carpeta padre del componente al que pertenece cada validación de formulario

## Gestión de Estado
* Mantén las transformaciones de estado puras y predecibles

* Para estados globales usar Zustand, **PROHIBIDO** usar alternativas como Redux, `useContext`, etc.
