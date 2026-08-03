import { forwardRef, type ButtonHTMLAttributes, type Ref } from 'react';
import type { ReactElement } from 'react';

import {
  type SharedStandardButtonProps,
  type SharedLinkButtonProps,
  type ButtonVisualProps,
} from '@/shared/ui/buttons/data-types/interfaces/buttons.interface';
import composableButtonClass from '@/shared/ui/buttons/utils/composableButtonClass.utils';

type ButtonProps = ButtonVisualProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

/**
 * Props internas de la implementación.
 *
 * `className` NO forma parte de la API pública (`ButtonComponent` la excluye), pero Base UI
 * la inyecta en tiempo de ejecución cuando este botón se pasa por la prop `render`.
 * Se recibe aquí para fusionarla con las clases composables en vez de dejar que las pise.
 */
type InternalButtonProps = ButtonProps & { className?: string };

type StandardButtonProps = SharedStandardButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { ref?: Ref<HTMLButtonElement> };

type LinkButtonProps = SharedLinkButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { ref?: Ref<HTMLButtonElement> };

type ButtonComponent = {
  (props: StandardButtonProps): ReactElement | null; // variant: background|outline|ghost → theme: ButtonTheme (obligatorio)
  (props: LinkButtonProps): ReactElement | null; // variant: "link" → theme?: never (prohibido)
  displayName?: string;
};

/**
 * `Button` — componente base composable para botones.
 *
 * Construido sobre el elemento nativo `<button>`,
 * Los estilos se aplican completamente mediante la arquitectura Sass global
 * ubicada en `src/styles/global/buttons/`.
 *
 * La API está inspirada en el componente Button de PrimeReact:
 * https://primereact.org/button/
 *
 * @example
 * // Botón primario con fondo
 * <Button theme="primary" variant="background">
 *   Guardar
 * </Button>
 *
 * @example
 * // Botón danger con borde, tamaño grande y sombra
 * <Button theme="danger" variant="outline" size="lg" effects={['shadow']}>
 *   <MdDelete />
 *   <span>Eliminar</span>
 * </Button>
 *
 * @example
 * // Botón circular solo icono
 * <Button
 *   theme="success"
 *   variant="background"
 *   modifiers={['icon-only', 'rounded-full']}
 * >
 *   <MdCheckCircle />
 * </Button>
 *
 * @example
 * // Botón ghost de ancho completo
 * <Button
 *   theme="secondary"
 *   variant="ghost"
 *   modifiers={['full-width']}
 * >
 *   Cancelar
 * </Button>
 *
 * @example
 * // Botón tipo enlace (no requiere theme)
 * <Button variant="link">
 *   Ir al inicio
 * </Button>
 *
 * @example
 * // Estado deshabilitado usando el atributo HTML nativo
 * <Button
 *   theme="primary"
 *   variant="background"
 *   disabled
 * >
 *   Procesando...
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, InternalButtonProps>(
  (
    {
      theme,
      variant,
      size = 'base',
      modifiers,
      effects,
      children,
      type = 'button',
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        {...rest}
        // variant="link" fuerza type="button" para no enviar formularios accidentalmente
        type={variant === 'link' ? 'button' : type}
        // className va después de {...rest} para que las clases composables nunca sean pisadas
        className={composableButtonClass({ theme, variant, size, modifiers, effects, className })}
      >
        {children}
      </button>
    );
  },
) as unknown as ButtonComponent;

Button.displayName = 'Button';

export default Button;
