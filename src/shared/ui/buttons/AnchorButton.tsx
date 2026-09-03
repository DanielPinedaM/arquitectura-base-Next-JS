import { forwardRef, type AnchorHTMLAttributes, type Ref } from 'react';
import type { ReactElement } from 'react';

import {
  type SharedStandardButtonProps,
  type SharedLinkButtonProps,
  type ButtonVisualProps,
} from '@/shared/ui/buttons/data-types/interfaces/buttons.interface';
import composableButtonClass from '@/shared/ui/buttons/utils/composableButtonClass.utils';

/**
 * Atributos nativos del elemento `<a>` que acepta el componente.
 *
 * - `className` se excluye porque NO forma parte de la API pública: los estilos
 *   se componen exclusivamente con las clases `.btn-*`.
 * - `children` se excluye porque `SharedVisualProps` ya lo declara como obligatorio.
 */
type NativeAnchorAttributes = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'className' | 'children'
>;

/**
 * `className` inyectada en tiempo de ejecución.
 *
 * NO forma parte de la API pública (`AnchorButtonComponent` la excluye), pero Base UI
 * la inyecta cuando este botón se pasa por la prop `render`.
 * Se recibe aquí para fusionarla con las clases composables en vez de dejar que las pise.
 */
interface InjectedClassNameProps {
  className?: string;
}

/**
 * Props internas de la implementación.
 *
 * No incluye `ref` porque `forwardRef` lo entrega como segundo parámetro.
 */
type InternalAnchorButtonProps = ButtonVisualProps &
  NativeAnchorAttributes &
  InjectedClassNameProps;

/** Props públicas con `variant` background | outline | ghost → `theme` obligatorio. */
interface StandardAnchorButtonProps extends SharedStandardButtonProps, NativeAnchorAttributes {
  ref?: Ref<HTMLAnchorElement>;
}

/** Props públicas con `variant="link"` → `theme` prohibido. */
interface LinkAnchorButtonProps extends SharedLinkButtonProps, NativeAnchorAttributes {
  ref?: Ref<HTMLAnchorElement>;
}

interface AnchorButtonComponent {
  (props: StandardAnchorButtonProps): ReactElement | null;
  (props: LinkAnchorButtonProps): ReactElement | null;
  displayName?: string;
}

/**
 * `AnchorButton` — botón composable construido sobre el elemento nativo `<a>`.
 *
 * Comparte exactamente la misma API visual que `Button`
 * (theme, variant, size, modifier, effect), pero renderiza un `<a>` en lugar de un `<button>`.
 *
 * Ideal para enlaces externos, descargas o cualquier caso donde se necesite
 * semántica de enlace con apariencia de botón.
 *
 * Al usar `variant="link"`, no es necesario especificar `theme`.
 *
 * Cuando se especifica `target="_blank"`, el componente añade automáticamente
 * `rel="noopener noreferrer"` para prevenir ataques de `window.opener`,
 * fusionándolo con cualquier valor de `rel` que el consumidor haya pasado.
 *
 * Los estilos se aplican completamente mediante la arquitectura Sass global
 * ubicada en `src/styles/global/scss/buttons/`.
 *
 * @example
 * // Enlace primario con fondo
 * <AnchorButton theme="primary" variant="background" href="https://example.com">
 *   Ir a Example
 * </AnchorButton>
 *
 * @example
 * // Enlace de descarga con estilo danger
 * <AnchorButton theme="danger" variant="outline" href="/report.pdf" download>
 *   <MdDownload />
 *   <span>Descargar reporte</span>
 * </AnchorButton>
 *
 * @example
 * // Enlace tipo link (no requiere theme)
 * <AnchorButton variant="link" href="/terms">
 *   Ver términos
 * </AnchorButton>
 *
 * @example
 * // Enlace que se abre en una nueva pestaña — rel="noopener noreferrer" se añade automáticamente
 * <AnchorButton
 *   theme="info"
 *   variant="outline"
 *   href="https://docs.example.com"
 *   target="_blank"
 * >
 *   Ver documentación
 * </AnchorButton>
 */
const AnchorButton = forwardRef<HTMLAnchorElement, InternalAnchorButtonProps>(
  (
    {
      theme,
      variant,
      size = 'base',
      modifiers,
      effects,
      children,
      target,
      rel,
      className,
      ...rest
    },

    ref,
  ) => {
    const safeRel: string | undefined =
      target === '_blank'
        ? [...new Set(['noopener', 'noreferrer', ...(rel?.split(' ') ?? [])])].join(' ')
        : rel;

    return (
      <a
        ref={ref}
        {...rest}
        target={target}
        rel={safeRel}
        // className va después de {...rest} para que las clases composables nunca sean pisadas
        className={composableButtonClass({ theme, variant, size, modifiers, effects, className })}
      >
        {children}
      </a>
    );
  },
) as unknown as AnchorButtonComponent;

AnchorButton.displayName = 'AnchorButton';

export default AnchorButton;
