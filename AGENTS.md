# Descripción del Proyecto
Arquitectura base agnóstica a las features para iniciar un nuevo proyecto en Next.js, configurada para trabajar con IA

# Ejecución de Proyecto

* Runtime: Node.js 24
* Administrador de versiones: fnm
* Manejador de paquetes: pnpm
* Archivo de bloqueo: pnpm-lock.yaml

# Reglas **OBLIGATORIAS** de Next.js

## Fuentes de consulta
Antes de editar código y responder, consulta solo las fuentes cuya columna **¿Cuándo leerlo?** coincida con la tarea, y aplica a la vez las reglas y la documentación consultadas.

Cuando las fuentes se contradicen, gana la de número menor en la columna **Prioridad**:

| Prioridad | Fuente | ¿Qué es? | ¿Cuándo leerlo? |
| --- | --- | --- | --- |
| 1 | [Skill `next-conventions`](.agents/skills/next-conventions/SKILL.md) | Reglas propias del proyecto | Al decidir dónde va un archivo o carpeta, cómo se nombra, qué librería o componente del proyecto usar y cómo se estiliza, y al responder cómo se hace algo en este proyecto. |
| 2 | [Skill `vercel-react-best-practices`](.agents/skills/vercel-react-best-practices/SKILL.md) | Reglas de terceros de Vercel sobre rendimiento de React y Next.js | Al crear, modificar o revisar componentes, páginas u obtención de datos, y al optimizar el rendimiento o el bundle. |
| 3 | [Skill `vercel-composition-patterns`](.agents/skills/vercel-composition-patterns/SKILL.md) | Reglas de terceros de Vercel sobre composición de componentes de React | Al crear, modificar o revisar la API de un componente reutilizable: props booleanas, compound components, render props, context providers o `forwardRef`. |
| 4 | [Skill `next-docs`](.agents/skills/next-docs/SKILL.md) | [Documentación oficial completa de Next.js](https://nextjs.org/docs) | Al responder y usar APIs de Next.js (aunque creas conocerla) y ante errores. Respeta sus avisos de deprecación. |
| 5 | Datos de entrenamiento | Tu conocimiento previo | Puedes usarlo, pero las fuentes anteriores tienen prioridad: este proyecto usa Next.js 16, cuyos breaking changes pueden haberlo dejado desactualizado. Que esté desactualizado no significa que esté mal; solo que puede no aplicar a esta versión. |

## Preguntar
Si detectas un error, una inconsistencia o una ambigüedad, o tienes alguna duda, detente y pregúntame antes de escribir o modificar código. No supongas cómo debe implementarse algo.

**Razón:** preguntar cuesta menos que revisar y deshacer código basado en una suposición incorrecta.

# Resumen de la Skill `next-conventions`

## Formularios
* Usar React Hook Form junto con `import { zodResolver } from '@hookform/resolvers/zod'` para validar formularios y los componentes UI de formularios de Shad cn ubicados en `src\shared\ui\shad-cn\react-hook-form`

* Para botones y enlaces, usar los componentes que estan en `src/shared/ui/buttons`. **PROHIBIDO** usar directamente las etiquetas nativas de HTML `<a>` y `<button>`, o `next/link`, sin estos componentes.

* **PROHIBIDO**  usar alternativas a React Hook Form: formularios controlados manualmente con `useState`/`useReducer`, Formik, o manejo de `onChange`/`onSubmit` sin pasar por `useForm`

* **PROHIBIDO** usar alternativas a `zodResolver`/Zod para validar formularios: reglas de validación nativas del navegador (`required`, `pattern` en el TSX), lógica de validación manual/imperativa dentro de handlers, `yupResolver`, `joiResolver`, class-validator, o validator functions custom sin Zod

* Los Zod schema tienen que estar dentro de un archivo `.schema.ts` dentro de la carpeta padre del componente al que pertenece cada validación de formulario

## Gestión de Estado
* Mantén las transformaciones de estado puras y predecibles

* Para estados globales usar Zustand, **PROHIBIDO** usar alternativas como Redux, `useContext`, etc.
