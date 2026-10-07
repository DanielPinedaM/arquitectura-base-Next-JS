# Gestión del almacenamiento

Gestiona las cookies, localStorage, sessionStorage y el estado de almacenamiento del navegador.

## Estado de almacenamiento

Guarda y restaura el estado completo del navegador, incluidas las cookies y el almacenamiento.

### Guardar el estado de almacenamiento

```bash
# Guardar con un nombre de archivo autogenerado (storage-state-{timestamp}.json)
pnpm exec playwright-cli state-save

# Guardar con un nombre de archivo específico
pnpm exec playwright-cli state-save my-auth-state.json
```

### Restaurar el estado de almacenamiento

```bash
# Cargar el estado de almacenamiento desde un archivo
pnpm exec playwright-cli state-load my-auth-state.json

# Recargar la página para aplicar las cookies
pnpm exec playwright-cli open https://example.com
```

### Formato del archivo de estado de almacenamiento

El archivo guardado contiene:

```json
{
  "cookies": [
    {
      "name": "session_id",
      "value": "abc123",
      "domain": "example.com",
      "path": "/",
      "expires": 1893456000,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "https://example.com",
      "localStorage": [
        { "name": "theme", "value": "dark" },
        { "name": "user_id", "value": "12345" }
      ]
    }
  ]
}
```

## Cookies

### Listar todas las cookies

```bash
pnpm exec playwright-cli cookie-list
```

### Filtrar las cookies por dominio

```bash
pnpm exec playwright-cli cookie-list --domain=example.com
```

### Filtrar las cookies por ruta

```bash
pnpm exec playwright-cli cookie-list --path=/api
```

### Obtener una cookie específica

```bash
pnpm exec playwright-cli cookie-get session_id
```

### Establecer una cookie

```bash
# Cookie básica
pnpm exec playwright-cli cookie-set session abc123

# Cookie con opciones
pnpm exec playwright-cli cookie-set session abc123 --domain=example.com --path=/ --httpOnly --secure --sameSite=Lax

# Cookie con expiración (timestamp Unix)
pnpm exec playwright-cli cookie-set remember_me token123 --expires=1893456000
```

### Eliminar una cookie

```bash
pnpm exec playwright-cli cookie-delete session_id
```

### Limpiar todas las cookies

```bash
pnpm exec playwright-cli cookie-clear
```

### Avanzado: varias cookies u opciones personalizadas

Para escenarios complejos, como agregar varias cookies a la vez, usa `run-code`:

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.context().addCookies([
    { name: 'session_id', value: 'sess_abc123', domain: 'example.com', path: '/', httpOnly: true },
    { name: 'preferences', value: JSON.stringify({ theme: 'dark' }), domain: 'example.com', path: '/' }
  ]);
}"
```

## Local Storage

### Listar todos los elementos de localStorage

```bash
pnpm exec playwright-cli localstorage-list
```

### Obtener un solo valor

```bash
pnpm exec playwright-cli localstorage-get token
```

### Establecer un valor

```bash
pnpm exec playwright-cli localstorage-set theme dark
```

### Establecer un valor JSON

```bash
pnpm exec playwright-cli localstorage-set user_settings '{"theme":"dark","language":"en"}'
```

### Eliminar un solo elemento

```bash
pnpm exec playwright-cli localstorage-delete token
```

### Limpiar todo localStorage

```bash
pnpm exec playwright-cli localstorage-clear
```

### Avanzado: varias operaciones

Para escenarios complejos, como establecer varios valores a la vez, usa `run-code`:

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.evaluate(() => {
    localStorage.setItem('token', 'jwt_abc123');
    localStorage.setItem('user_id', '12345');
    localStorage.setItem('expires_at', Date.now() + 3600000);
  });
}"
```

## Session Storage

### Listar todos los elementos de sessionStorage

```bash
pnpm exec playwright-cli sessionstorage-list
```

### Obtener un solo valor

```bash
pnpm exec playwright-cli sessionstorage-get form_data
```

### Establecer un valor

```bash
pnpm exec playwright-cli sessionstorage-set step 3
```

### Eliminar un solo elemento

```bash
pnpm exec playwright-cli sessionstorage-delete step
```

### Limpiar sessionStorage

```bash
pnpm exec playwright-cli sessionstorage-clear
```

## IndexedDB

### Listar las bases de datos

```bash
pnpm exec playwright-cli run-code "async page => {
  return await page.evaluate(async () => {
    const databases = await indexedDB.databases();
    return databases;
  });
}"
```

### Eliminar una base de datos

```bash
pnpm exec playwright-cli run-code "async page => {
  await page.evaluate(() => {
    indexedDB.deleteDatabase('myDatabase');
  });
}"
```

## Patrones comunes

### Reutilización del estado de autenticación

```bash
# Paso 1: iniciar sesión y guardar el estado
pnpm exec playwright-cli open https://app.example.com/login
pnpm exec playwright-cli snapshot
pnpm exec playwright-cli fill e1 "user@example.com"
pnpm exec playwright-cli fill e2 "password123"
pnpm exec playwright-cli click e3

# Guardar el estado autenticado
pnpm exec playwright-cli state-save auth.json

# Paso 2: más tarde, restaurar el estado y omitir el inicio de sesión
pnpm exec playwright-cli state-load auth.json
pnpm exec playwright-cli open https://app.example.com/dashboard
# ¡Ya con la sesión iniciada!
```

### Ciclo de guardado y restauración

```bash
# Configurar el estado de autenticación
pnpm exec playwright-cli open https://example.com
pnpm exec playwright-cli eval "() => { document.cookie = 'session=abc123'; localStorage.setItem('user', 'john'); }"

# Guardar el estado en un archivo
pnpm exec playwright-cli state-save my-session.json

# ... más tarde, en una sesión nueva ...

# Restaurar el estado
pnpm exec playwright-cli state-load my-session.json
pnpm exec playwright-cli open https://example.com
# ¡Las cookies y localStorage se restauran!
```

## Notas de seguridad

- Nunca hagas commit de archivos de estado de almacenamiento que contengan tokens de autenticación
- Agrega `*.auth-state.json` a `.gitignore`
- Elimina los archivos de estado cuando termine la automatización
- Usa variables de entorno para los datos sensibles
- Por defecto, las sesiones se ejecutan en modo en memoria, que es más seguro para operaciones sensibles
