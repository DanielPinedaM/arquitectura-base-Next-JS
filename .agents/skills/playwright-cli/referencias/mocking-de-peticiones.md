# Mocking de peticiones

Intercepta, simula (mock), modifica y bloquea peticiones de red.

## Comandos CLI de route

```bash
# Simular con un status personalizado
pnpm exec playwright-cli route "**/*.jpg" --status=404

# Simular con un body JSON
pnpm exec playwright-cli route "**/api/users" --body='[{"id":1,"name":"Alice"}]' --content-type=application/json

# Simular con headers personalizados
pnpm exec playwright-cli route "**/api/data" --body='{"ok":true}' --header="X-Custom: value"

# Quitar headers de las peticiones
pnpm exec playwright-cli route "**/*" --remove-header=cookie,authorization

# Listar las rutas activas
pnpm exec playwright-cli route-list

# Eliminar una ruta o todas las rutas
pnpm exec playwright-cli unroute "**/*.jpg"
pnpm exec playwright-cli unroute
```

## Patrones de URL

```
**/api/users           - Coincidencia exacta de la ruta
**/api/*/details       - Comodín en la ruta
**/*.{png,jpg,jpeg}    - Coincidir con extensiones de archivo
**/search?q=*          - Coincidir con parámetros de consulta
```

## Mocking avanzado con run-code

Para respuestas condicionales, inspección del body de la petición, modificación de la respuesta o retrasos:

### Respuesta condicional según la petición

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.route('**/api/login', route => {
    const body = route.request().postDataJSON();
    if (body.username === 'admin') {
      route.fulfill({ body: JSON.stringify({ token: 'mock-token' }) });
    } else {
      route.fulfill({ status: 401, body: JSON.stringify({ error: 'Invalid' }) });
    }
  });
}"
```

### Modificar la respuesta real

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.route('**/api/user', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.isPremium = true;
    await route.fulfill({ response, json });
  });
}"
```

### Simular fallos de red

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.route('**/api/offline', route => route.abort('internetdisconnected'));
}"
# Opciones: connectionrefused, timedout, connectionreset, internetdisconnected
```

### Respuesta retrasada

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.route('**/api/slow', async route => {
    await new Promise(r => setTimeout(r, 3000));
    route.fulfill({ body: JSON.stringify({ data: 'loaded' }) });
  });
}"
```
