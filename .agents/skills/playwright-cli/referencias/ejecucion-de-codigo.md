# Ejecutar código personalizado de Playwright

Usa `run-code` para ejecutar código arbitrario de Playwright en escenarios avanzados que los comandos CLI no cubren.

## Sintaxis

```bash
pnpm exec playwright-cli run-code "async page => {
  // Tu código de Playwright aquí
  // Accede a page.context() para las operaciones del contexto del navegador
}"
```

También puedes cargar la función desde un archivo:

```bash
pnpm exec playwright-cli run-code --filename=./my-script.js
```


El código debe ser una única expresión de función, se envuelve en `(...)` y se evalúa.
La sintaxis import/export/require no es compatible.

El código se ejecuta en un contexto aislado, no en un entorno completo de Node.js. `require`, `process` y los módulos de Node no están
disponibles. Los timers (`setTimeout`, `setInterval`), `fetch`, `URL`, `Buffer`, `crypto`, `AbortController`, `TextEncoder`
y `TextDecoder` sí están disponibles.

## Geolocalización

```bash
# Conceder el permiso de geolocalización y establecer la ubicación
pnpm exec playwright-cli run-code "async page => {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: 37.7749, longitude: -122.4194 });
}"

# Establecer la ubicación en Londres
pnpm exec playwright-cli run-code "async page => {
  await page.context().grantPermissions(['geolocation']);
  await page.context().setGeolocation({ latitude: 51.5074, longitude: -0.1278 });
}"

# Limpiar la anulación (override) de la geolocalización
pnpm exec playwright-cli run-code "async page => {
  await page.context().clearPermissions();
}"
```

## Permisos

```bash
# Conceder varios permisos
pnpm exec playwright-cli run-code "async page => {
  await page.context().grantPermissions([
    'geolocation',
    'notifications',
    'camera',
    'microphone'
  ]);
}"

# Conceder permisos para un origen específico
pnpm exec playwright-cli run-code "async page => {
  await page.context().grantPermissions(['clipboard-read'], {
    origin: 'https://example.com'
  });
}"
```

## Emulación de medios

```bash
# Emular el esquema de color oscuro
pnpm exec playwright-cli run-code "async page => {
  await page.emulateMedia({ colorScheme: 'dark' });
}"

# Emular el esquema de color claro
pnpm exec playwright-cli run-code "async page => {
  await page.emulateMedia({ colorScheme: 'light' });
}"

# Emular movimiento reducido
pnpm exec playwright-cli run-code "async page => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
}"

# Emular el medio de impresión
pnpm exec playwright-cli run-code "async page => {
  await page.emulateMedia({ media: 'print' });
}"
```

## Estrategias de espera

```bash
# Esperar a que la red esté inactiva
pnpm exec playwright-cli run-code "async page => {
  await page.waitForLoadState('networkidle');
}"

# Esperar a un elemento específico
pnpm exec playwright-cli run-code "async page => {
  await page.locator('.loading').waitFor({ state: 'hidden' });
}"

# Esperar a que una función devuelva true
pnpm exec playwright-cli run-code "async page => {
  await page.waitForFunction(() => window.appReady === true);
}"

# Esperar con timeout
pnpm exec playwright-cli run-code "async page => {
  await page.locator('.result').waitFor({ timeout: 10000 });
}"
```

## Frames e iframes

```bash
# Trabajar con un iframe
pnpm exec playwright-cli run-code "async page => {
  const frame = page.locator('iframe#my-iframe').contentFrame();
  await frame.locator('button').click();
}"

# Obtener todos los frames
pnpm exec playwright-cli run-code "async page => {
  const frames = page.frames();
  return frames.map(f => f.url());
}"
```

## Descargas de archivos

```bash
# Manejar la descarga de un archivo
pnpm exec playwright-cli run-code "async page => {
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download' }).click();
  const download = await downloadPromise;
  await download.saveAs('./downloaded-file.pdf');
  return download.suggestedFilename();
}"
```

## Portapapeles

```bash
# Leer el portapapeles (requiere permiso)
pnpm exec playwright-cli run-code "async page => {
  await page.context().grantPermissions(['clipboard-read']);
  return await page.evaluate(() => navigator.clipboard.readText());
}"

# Escribir en el portapapeles
pnpm exec playwright-cli run-code "async page => {
  await page.evaluate(text => navigator.clipboard.writeText(text), 'Hello clipboard!');
}"
```

## Información de la página

```bash
# Obtener el título de la página
pnpm exec playwright-cli run-code "async page => {
  return await page.title();
}"

# Obtener la URL actual
pnpm exec playwright-cli run-code "async page => {
  return page.url();
}"

# Obtener el contenido de la página
pnpm exec playwright-cli run-code "async page => {
  return await page.content();
}"

# Obtener el tamaño del viewport
pnpm exec playwright-cli run-code "async page => {
  return page.viewportSize();
}"
```

## Ejecución de JavaScript

```bash
# Ejecutar JavaScript y devolver el resultado
pnpm exec playwright-cli run-code "async page => {
  return await page.evaluate(() => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled
    };
  });
}"

# Pasar argumentos a evaluate
pnpm exec playwright-cli run-code "async page => {
  const multiplier = 5;
  return await page.evaluate(m => document.querySelectorAll('li').length * m, multiplier);
}"
```

## Manejo de errores

```bash
# Try-catch en run-code
pnpm exec playwright-cli run-code "async page => {
  try {
    await page.getByRole('button', { name: 'Submit' }).click({ timeout: 1000 });
    return 'clicked';
  } catch (e) {
    return 'element not found';
  }
}"
```

## Flujos de trabajo complejos

```bash
# Iniciar sesión y guardar el estado
pnpm exec playwright-cli run-code "async page => {
  await page.goto('https://example.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });
  return 'Login successful';
}"

# Extraer datos (scraping) de varias páginas
pnpm exec playwright-cli run-code "async page => {
  const results = [];
  for (let i = 1; i <= 3; i++) {
    await page.goto(\`https://example.com/page/\${i}\`);
    const items = await page.locator('.item').allTextContents();
    results.push(...items);
  }
  return results;
}"
```
