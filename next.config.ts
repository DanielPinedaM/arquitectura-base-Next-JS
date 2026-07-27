import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NextConfig } from 'next';

/** prefijo obligatorio de toda variable de entorno declarada en environments/ */
const ENV_PREFIX: string = 'NEXT_PUBLIC_';

/** carpeta donde estan los archivos .env de todos los ambientes */
const ENV_FOLDER: string = join(process.cwd(), 'environments');

/**
 * Lee un archivo .env de environments/ y devuelve unicamente sus keys */
function readEnvFileKeys(fileName: string): string[] {
  return readFileSync(join(ENV_FOLDER, fileName), 'utf8')
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0 && !line.startsWith('#')) // Se ignoran las lineas vacias y los comentarios (#)
    .map((line: string) => line.slice(0, line.indexOf('=')).trim()) // y se toma como key todo lo que aparece antes del primer signo igual
    .filter((key: string) => key.length > 0);
}

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
 *
 * Antes de devolverlas se valida que TODAS las keys declaradas en los archivos de
 * environments/ empiecen por NEXT_PUBLIC_. Una key sin ese prefijo nunca llegaria al
 * navegador y quedaria undefined en tiempo de ejecucion, por eso se lanza un error que
 * detiene el build en lugar de dejar pasar el fallo silenciosamente */
function getEnv(): Record<string, string> {
  const invalidKeys: string[] = [];

  readdirSync(ENV_FOLDER)
    .filter((fileName: string) => fileName.startsWith('.env'))
    .forEach((fileName: string) => {
      const keys: string[] = readEnvFileKeys(fileName);

      // todas las keys del archivo tienen que empezar por NEXT_PUBLIC_
      const isValidEnv: boolean = keys.every((key: string) => key.startsWith(ENV_PREFIX));

      if (!isValidEnv) {
        keys
          .filter((key: string) => !key.startsWith(ENV_PREFIX))
          .forEach((key: string) => invalidKeys.push(`environments/${fileName} ➡️ ${key}`));
      }
    });

  if (invalidKeys.length > 0) {
    throw new Error(
      `❌ [next.config.ts] error - toda variable de entorno de environments/ tiene que empezar por "${ENV_PREFIX}".\n\n` +
        `Variables invalidas:\n${invalidKeys.join('\n')}\n\n` +
        `Sin ese prefijo Next.js NO reemplaza la variable en el bundle y su valor queda undefined.`,
    );
  }

  return Object.fromEntries(
    Object.entries(process.env).filter(
      ([key, value]) => key.startsWith(ENV_PREFIX) && typeof value === 'string',
    ),
  ) as Record<string, string>;
}

const env: Record<string, string> = getEnv();

const nextConfig: NextConfig = {
  env,
  reactStrictMode: false /** desactivar el doble montaje y ejecución de componentes que React hace en desarrollo */,

  reactCompiler: true /** activar optimización automática de re-renders sin necesidad de escribir codigo con memo, useMemo, useCallback */,

  productionBrowserSourceMaps: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
};

export default nextConfig;
