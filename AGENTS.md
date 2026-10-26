# Descripción del Proyecto
Arquitectura base agnóstica a las features para iniciar un nuevo proyecto en Next.js, configurada para trabajar con IA

# Ejecución del Proyecto

* **Runtime:** Node.js 24
* **Administrador de versiones:** pnpm, a partir de pnpm 12 no es necesario fnm ni nvm
* **Manejador de paquetes:** pnpm
* **Archivo de bloqueo:** pnpm-lock.yaml

# Reglas **OBLIGATORIAS** de Next.js

## Preguntar
Las modificaciones triviales se implementan directamente; las de complejidad media o alta, solo después de utilizar la [skill `question-me`](.agents/skills/question-me/SKILL.md)

**Razón:** preguntar cuesta menos que revisar y deshacer código basado en una suposición incorrecta.

## Fuentes de consulta
Antes de editar código y responder, consulta solo las fuentes cuya columna **¿Cuándo leerlo?** coincida con la tarea, y aplica a la vez las reglas y la documentación consultadas.

Cuando las fuentes se contradicen, gana la de número menor en la columna **Prioridad**:

| Prioridad | Fuente | ¿Qué es? | ¿Cuándo leerlo? |
| --- | --- | --- | --- |
| 1 | [Skill `next-conventions`](.agents/skills/next-conventions/SKILL.md) | Reglas propias del proyecto | Al decidir dónde va un archivo o carpeta, cómo se nombra, qué librería o componente del proyecto usar y cómo se estiliza, y al responder cómo se hace algo en este proyecto. |
| 2 | [Skill `vercel-react-best-practices`](.agents/skills/vercel-react-best-practices/SKILL.md) | Reglas de terceros de Vercel sobre rendimiento de React y Next.js | Al crear, modificar o revisar componentes, páginas u obtención de datos, y al optimizar el rendimiento o el bundle. |
| 3 | [Skill `vercel-composition-patterns`](.agents/skills/vercel-composition-patterns/SKILL.md) | Reglas de terceros de Vercel sobre composición de componentes de React | Al crear, modificar o revisar la API de un componente reutilizable: props booleanas, compound components, render props, context providers o `forwardRef`. |
| 4 | [Skill `next-16.4.3-docs`](.agents/skills/next-16.4.3-docs/SKILL.md) | [Documentación oficial de Next.js](https://nextjs.org/docs/llms.txt) | Al responder y usar APIs de **Next.js** (aunque creas conocerla). Respeta sus avisos de deprecación. |
| 5 | [Skill `react-19.3.1-docs`](.agents/skills/react-19.3.1-docs/SKILL.md) | [Documentación oficial de React.js](https://react.dev/llms.txt) | Al responder y usar APIs de **React.js** (aunque creas conocerla) |
| 6 | [Skill `zod-4`](.agents/skills/zod-4/SKILL.md) | Breaking changes de Zod 4 | Al responder preguntas y editar codigo de Zod |
| 7 | Datos de entrenamiento | Tu conocimiento previo | Puedes usarlo, pero las fuentes anteriores tienen prioridad: este proyecto usa Next.js 16, React 19 y Zod 4, cuyos breaking changes pueden dejar tus datos de entrenamiento desactualizados. Que esté desactualizado no significa que esté mal; solo que puede no aplicar a esta versión. |

# Resumen de la Skill `next-conventions`

## Formularios
* Usar React Hook Form junto con `import { zodResolver } from '@hookform/resolvers/zod'` para validar formularios y los componentes UI de formularios de Shad cn ubicados en `src\shared\ui\shad-cn\react-hook-form`

* Para botones y enlaces, usar los componentes que estan en `src/shared/ui/buttons`. **PROHIBIDO** usar directamente las etiquetas nativas de HTML `<a>` y `<button>`, o `next/link`, sin estos componentes.

* **PROHIBIDO**  usar alternativas a React Hook Form: formularios controlados manualmente con `useState`/`useReducer`, Formik, o manejo de `onChange`/`onSubmit` sin pasar por `useForm`

* **PROHIBIDO** usar alternativas a `zodResolver`/Zod para validar formularios: reglas de validación nativas del navegador (`required`, `pattern` en el TSX), lógica de validación manual/imperativa dentro de handlers, `yupResolver`, `joiResolver`, class-validator, o validator functions custom sin Zod

* Los Zod schema tienen que estar dentro de un archivo `.schema.ts` dentro de la carpeta padre del componente al que pertenece cada validación de formulario

## Gestión de Estado
* Mantén las transformaciones de estado puras y predecibles

* Para estado global usar Zustand, **PROHIBIDO** usar alternativas como Redux, `useContext`, etc.
