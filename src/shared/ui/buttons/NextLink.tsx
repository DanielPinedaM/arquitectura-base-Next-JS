import React, { forwardRef } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';

import {
  type SharedStandardButtonProps,
  type SharedLinkButtonProps,
  type ButtonVisualProps,
} from '@/shared/ui/buttons/data-types/interfaces/buttons.interface';
import composableButtonClass from '@/shared/ui/buttons/utils/composableButtonClass.utils';

type NextLinkButtonProps = ButtonVisualProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>;

/**
 * Props internas de la implementación.
 *
 * `className` NO forma parte de la API pública (`NextLinkComponent` la excluye), pero Base UI
 * la inyecta en tiempo de ejecución cuando este botón se pasa por la prop `render`.
 * Se recibe aquí para fusionarla con las clases composables en vez de dejar que las pise.
 */
type InternalNextLinkProps = NextLinkButtonProps & { className?: string };

type StandardNextLinkProps = SharedStandardButtonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> & {
    ref?: React.Ref<HTMLAnchorElement>;
  };

type LinkNextLinkProps = SharedLinkButtonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> & {
    ref?: React.Ref<HTMLAnchorElement>;
  };

type NextLinkComponent = {
  (props: StandardNextLinkProps): ReactElement | null;
  (props: LinkNextLinkProps): ReactElement | null;
  displayName?: string;
};

/**
 * `NextLink` — botón composable construido sobre el componente `Link` de Next.js.
 *
 * Comparte exactamente la misma API visual que `Button` (theme, variant, size,
 * modifier, effect), pero renderiza un `<Link>` de Next.js en lugar de un `<button>`.
 *
 * Ideal para navegación interna de la aplicación con prefetch automático de Next.js
 * y apariencia de botón o enlace.
 *
 * Los estilos se aplican completamente mediante la arquitectura Sass global
 * ubicada en `src/styles/global/buttons/`.
 *
 * @example
 * // Link primario con fondo
 * <NextLink theme="primary" variant="background" href="/dashboard">
 *   Ir al Dashboard
 * </NextLink>
 *
 * @example
 * // Link tipo enlace (no requiere theme)
 * <NextLink variant="link" href="/home">
 *   Ir a Home
 * </NextLink>
 *
 * @example
 * // Link con icono y tamaño grande
 * <NextLink theme="info" variant="outline" size="lg" href="/profile">
 *   <MdPerson />
 *   <span>Mi Perfil</span>
 * </NextLink>
 *
 * @example
 * // Link circular solo icono
 * <NextLink
 *   theme="success"
 *   variant="background"
 *   modifiers={['icon-only', 'rounded-full']}
 *   href="/notifications"
 * >
 *   <MdNotifications />
 * </NextLink>
 */
const NextLink = forwardRef<HTMLAnchorElement, InternalNextLinkProps>(
  ({ theme, variant, size = 'base', modifiers, effects, children, className, ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        {...rest}
        // className va después de {...rest} para que las clases composables nunca sean pisadas
        className={composableButtonClass({ theme, variant, size, modifiers, effects, className })}
      >
        {children}
      </Link>
    );
  },
) as unknown as NextLinkComponent;

NextLink.displayName = 'NextLink';

export default NextLink;
