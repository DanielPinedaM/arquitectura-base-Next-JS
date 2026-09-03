import { type ReactNode } from 'react';

/** Colores con temas de botón — se asigna con .btn-{theme} dependiendo de _themes.scss */
export type ButtonTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

/** Variantes visuales — se asigna con .btn-{variant} dependiendo de _variants.scss */
export type ButtonVariant = 'background' | 'outline' | 'ghost' | 'link';

/** Tamaño — se asigna con .btn-{size} dependiendo de _sizes.scss */
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/** Modificadores de diseño/forma — se asigna con .btn-{modifier} dependiendo de _modifiers.scss */
export type ButtonModifier = 'full-width' | 'rounded-full' | 'icon-only';

/** Modificadores de efectos visuales — se asigna con .btn-{effect} dependiendo de _effects.scss */
export type ButtonEffect = 'shadow';

// ---------------------------------------------------------------------------
// Shared visual base props (without native HTML element attributes)
// ---------------------------------------------------------------------------

export interface SharedVisualProps {
  /**
   * Tamaño del botón.
   * Por defecto es `'base'` cuando no se especifica (equivalente a `.btn-base`).
   * Se asigna con `.btn-{size}` dependiendo de `_sizes.scss`.
   */
  size?: ButtonSize;

  /**
   * Modificadores de forma / layout.
   * - `'rounded-full'` → esquinas completamente redondeadas / forma circular
   * - `'full-width'`   → botón se expande para ocupar todo el ancho del contenedor
   * - `'icon-only'`    → relación de aspecto cuadrada para botones que solo contienen icono;
   *                      es obligatorio cuando el botón únicamente contiene un icono
   *
   * Corresponde a `.btn-rounded-full`, `.btn-full-width`, `.btn-icon-only`
   * en `_modifiers.scss`.
   *
   * Se pueden combinar múltiples modificadores: `['rounded-full', 'icon-only']`.
   */
  modifiers?: ButtonModifier[];

  /**
   * Modificadores de efectos visuales.
   * - `'shadow'` → agrega una sombra tipo elevación (Material Design)
   *
   * Corresponde a `.btn-shadow` en `_effects.scss`.
   *
   * Se pueden combinar múltiples efectos: `['shadow']`.
   */
  effects?: ButtonEffect[];

  /**
   * Contenido del botón.
   * Todo el contenido visual — texto, iconos o combinaciones — debe pasarse
   * a través de `children`.
   * NO se deben usar las props `label` o `icon` (patrón de PrimeReact
   * explícitamente excluido por los requisitos del proyecto).
   *
   * @example
   * <Button theme="primary" variant="background">Guardar</Button>
   * <Button theme="danger" variant="outline"><MdDelete /><span>Eliminar</span></Button>
   * <Button theme="info" variant="background" modifiers={['icon-only']}><MdInfo /></Button>
   */
  children: ReactNode;
}

/**
 * Botón de acción estándar del sistema.
 *
 * Se utiliza para todos los botones que representan una acción del sistema:
 * confirmar, cancelar, acciones CRUD, etc.
 *
 * Requiere siempre dos props de diseño:
 * - `theme`   → significado semántico del color (`primary`, `danger`, `success`, …)
 * - `variant` → apariencia visual (`background`, `outline`, `ghost`)
 *
 * IMPORTANTE: `theme` es obligatorio porque el color forma parte del
 * significado de la acción. No se puede omitir.
 *
 * @example
 * import { MdCheckCircle } from "react-icons/md";
 *
 * <Button theme="success" variant="background">
 *   <MdCheckCircle />
 *   <span>Confirmar</span>
 * </Button>
 */
export interface SharedStandardButtonProps extends SharedVisualProps {
  /**
   * Variante visual del botón.
   * - `'background'` → relleno con `--btn-color`
   * - `'outline'`    → fondo transparente, borde con color
   * - `'ghost'`      → sin fondo ni borde, relleno sutil en hover
   *
   * Corresponde a `.btn-background`, `.btn-outline`, `.btn-ghost`
   * en `_variants.scss`.
   */
  variant: Exclude<ButtonVariant, 'link'>;

  /**
   * Tema de color del botón.
   * Define el significado semántico del botón (primary, danger, success, etc.).
   *
   * Corresponde al bloque de custom properties CSS `.btn-{theme}` en `_themes.scss`.
   *
   * IMPORTANTE: obligatorio en botones de acción estándar (`SharedStandardButtonProps`);
   * prohibido en `variant="link"` (`SharedLinkButtonProps`).
   */
  theme: ButtonTheme;
}

/**
 * Botón de navegación con estilo de enlace (`variant="link"`).
 *
 * Diferente al botón de acción estándar (`SharedStandardButtonProps`). Se usa para:
 * - Navegación interna (`Next.js Link`, `AnchorButton`)
 * - Acciones discretas con apariencia de texto clickeable
 *
 * NO requiere `theme`: no representa una acción del sistema, por lo que
 * no tiene semántica de color. El estilo `"link"` define completamente
 * su comportamiento visual.
 *
 * @example
 * "use client";
 *
 * import { useRouter } from "next/navigation";
 *
 * export function MyComponent() {
 *   const router = useRouter();
 *
 *   return (
 *     <Button
 *       variant="link"
 *       onClick={() => router.push("/home")}
 *     >
 *       Ir a Home
 *     </Button>
 *   );
 * }
 */
export interface SharedLinkButtonProps extends SharedVisualProps {
  variant: 'link';
  theme?: never;
}

// --------------------------------------------------------------
// Unión final — compartida entre Button, AnchorButton y NextLink
// --------------------------------------------------------------

export type ButtonVisualProps = SharedStandardButtonProps | SharedLinkButtonProps;
