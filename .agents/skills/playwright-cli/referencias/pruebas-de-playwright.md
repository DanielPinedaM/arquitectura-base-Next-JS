# Ejecutar pruebas de Playwright

Para ejecutar pruebas de Playwright, usa el comando `pnpm exec playwright test`, o un script del gestor de paquetes. Para evitar que se abra el reporte html interactivo, usa la variable de entorno `PLAYWRIGHT_HTML_OPEN=never`.

```bash
# Ejecutar todas las pruebas
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test

# Ejecutar todas las pruebas mediante un script pnpm personalizado
PLAYWRIGHT_HTML_OPEN=never pnpm run special-test-command
```

# Depurar pruebas de Playwright

Para depurar una prueba de Playwright que falla, ejecútala con la opción `--debug=cli`. Este comando pausará la prueba al inicio e imprimirá las instrucciones de depuración.

**IMPORTANTE**: ejecuta el comando en segundo plano y revisa la salida hasta que se imprima "Debugging Instructions". Asegúrate de detener el comando cuando hayas terminado.

Una vez que se impriman las instrucciones que contienen el nombre de una sesión, usa `playwright-cli` para adjuntar la sesión y explorar la página.

```bash
# Ejecutar la prueba
PLAYWRIGHT_HTML_OPEN=never pnpm exec playwright test --debug=cli
# ...
# ... instrucciones de depuración para la sesión "tw-abcdef" ...
# ...

# Adjuntar a la prueba
pnpm exec playwright-cli attach tw-abcdef
```

Mantén la prueba ejecutándose en segundo plano mientras exploras y buscas una solución.
La prueba está pausada al inicio, por lo que debes avanzar paso a paso (step over) o pausar en una ubicación particular
donde sea más probable que esté el problema.

Cada acción que realices con `playwright-cli` genera el código TypeScript de Playwright correspondiente.
Este código aparece en la salida y se puede copiar directamente a la prueba. La mayoría de las veces hay que actualizar un locator específico o una expectativa, pero también podría ser un bug en la aplicación. Usa tu criterio.

Después de corregir la prueba, detén la ejecución de la prueba en segundo plano. Vuelve a ejecutarla para comprobar que la prueba pasa.
