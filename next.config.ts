import type { NextConfig } from 'next';

/**
 * https://nextjs.org/docs/app/api-reference/config/next-config-js/env
 *
 * env-cmd inyecta las variables de environments/.env.* en process.env antes de que
 * Next.js ejecute este archivo. Aqui se reenvian a la opcion `env` para que Next.js las
 * reemplace por su valor literal en tiempo de build, tanto en el bundle del navegador
 * ('use client') como en el del servidor (Node.js).
 *
 * Se hace asi porque:
 * - Los archivos .env de este proyecto viven en environments/ y NO en la
 * raiz, que es el unico lugar donde Next.js los carga de forma automatica.
 *
 * - env-cmd permite tener diferentes archivos .env con ambientes personalizados
 *
 * Resultado: la carpeta .next queda auto-contenida y `next start` NO necesita env-cmd.
 *
 * el reemplazo solo funciona escribiendo el acceso completo y literal
 * (process.env.NEXT_PUBLIC_API). Des-estructurar process.env o usar una clave dinamica
 * rompe el reemplazo y devuelve undefined.
 */
const env: Record<string, string> = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key, value]) => key.startsWith('NEXT_PUBLIC_') && typeof value === 'string',
  ),
) as Record<string, string>;

const nextConfig: NextConfig = {
  env,
  reactStrictMode: false,
  /** activar optimización automática de re-renders sin necesidad de escribir codigo con memo, useMemo, useCallback */
  reactCompiler: true,
  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
};

export default nextConfig;
