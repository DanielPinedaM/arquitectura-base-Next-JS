import clsx from 'clsx';

import {
  type ButtonEffect,
  type ButtonModifier,
  type ButtonSize,
  type ButtonTheme,
  type ButtonVariant,
} from '@/shared/ui/buttons/data-types/interfaces/buttons.interface';

type ComposableButtonClassParams = {
  theme?: ButtonTheme;
  variant: ButtonVariant;
  size?: ButtonSize;
  modifiers?: ButtonModifier[];
  effects?: ButtonEffect[];

  /**
   * Clases externas inyectadas en tiempo de ejecución.
   *
   * NO forma parte de la API pública de los botones: el consumidor tiene prohibido
   * pasar `className` (por eso los tres componentes lo excluyen de su tipo con `Omit`).
   *
   * Existe porque Base UI, al usar la prop `render`, fusiona sus propias clases y se
   * las pasa al elemento recibido. Si no se fusionaran aquí, esas clases pisarían las
   * clases composables `.btn-*` y el botón quedaría sin estilos.
   */
  className?: string;
};

export default function composableButtonClass({
  theme,
  variant,
  size = 'base',
  modifiers,
  effects,
  className,
}: ComposableButtonClassParams): string {
  return clsx(
    // ── Reset CSS para botón - requerido siempre ──────────────────────────────────────
    'btn',

    // ── Tema de color: .btn-primary, .btn-secondary, … ──────────────────────
    theme && `btn-${theme}`,

    // ── Variantes visuales: .btn-background, .btn-outline, .btn-ghost, .btn-link
    variant && `btn-${variant}`,

    // ── Tamaño: .btn-xs, .btn-sm, .btn-base (default), .btn-lg, … ──────────
    size && `btn-${size}`,

    // ── Modificadores de forma y diseño ──────────────────────────────────────────
    modifiers?.map((modifier) => `btn-${modifier}`),

    // ── Modificadores de efectos visuales ──────────────────────────────────────────────────
    effects?.map((effect) => `btn-${effect}`),

    // ── Clases inyectadas por Base UI a través de la prop `render` ─────────────
    className,
  );
}
