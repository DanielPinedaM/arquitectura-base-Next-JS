# Gestión de sesiones del navegador

Ejecuta varias sesiones de navegador aisladas de forma concurrente, con persistencia de estado.

## Sesiones de navegador con nombre

Usa el flag `-s` para aislar los contextos del navegador:

```bash
# Navegador 1: flujo de autenticación
playwright-cli -s=auth open https://app.example.com/login

# Navegador 2: navegación pública (cookies y almacenamiento separados)
playwright-cli -s=public open https://example.com

# Los comandos están aislados por sesión de navegador
playwright-cli -s=auth fill e1 "user@example.com"
playwright-cli -s=public snapshot
```

## Propiedades de aislamiento de las sesiones del navegador

Cada sesión del navegador tiene de forma independiente:
- Cookies
- LocalStorage / SessionStorage
- IndexedDB
- Caché
- Historial de navegación
- Pestañas abiertas

## Comandos de sesiones del navegador

```bash
# Listar todas las sesiones del navegador
playwright-cli list

# Detener una sesión del navegador (cerrar el navegador)
playwright-cli close                # detener el navegador por defecto
playwright-cli -s=mysession close   # detener un navegador con nombre

# Detener todas las sesiones del navegador
playwright-cli close-all

# Matar a la fuerza todos los procesos daemon (para procesos obsoletos/zombie)
playwright-cli kill-all

# Eliminar los datos de usuario de una sesión del navegador (directorio del perfil)
playwright-cli delete-data                # eliminar los datos del navegador por defecto
playwright-cli -s=mysession delete-data   # eliminar los datos de un navegador con nombre
```

Una sesión headless se apaga sola después de una hora sin comandos; el siguiente comando entonces informa que el navegador no está abierto, así que ejecuta `open` de nuevo. Los navegadores con interfaz (headed) permanecen abiertos. Usa `open --idle-timeout=<ms>` para cambiar el timeout, o `0` para desactivarlo.

## Variable de entorno

Establece un nombre de sesión de navegador por defecto mediante una variable de entorno:

```bash
export PLAYWRIGHT_CLI_SESSION="mysession"
playwright-cli open example.com  # Usa "mysession" automáticamente
```

## Patrones comunes

### Scraping concurrente

```bash
#!/bin/bash
# Extraer datos (scraping) de varios sitios de forma concurrente

# Iniciar todos los navegadores
playwright-cli -s=site1 open https://site1.com &
playwright-cli -s=site2 open https://site2.com &
playwright-cli -s=site3 open https://site3.com &
wait

# Tomar snapshots de cada uno
playwright-cli -s=site1 snapshot
playwright-cli -s=site2 snapshot
playwright-cli -s=site3 snapshot

# Limpieza
playwright-cli close-all
```

### Sesiones de pruebas A/B

```bash
# Probar diferentes experiencias de usuario
playwright-cli -s=variant-a open "https://app.com?variant=a"
playwright-cli -s=variant-b open "https://app.com?variant=b"

# Comparar
playwright-cli -s=variant-a screenshot
playwright-cli -s=variant-b screenshot
```

### Perfil persistente

Por defecto, el perfil del navegador se mantiene solo en memoria. Usa el flag `--persistent` en `open` para persistir el perfil del navegador en disco:

```bash
# Usar un perfil persistente (ubicación autogenerada)
playwright-cli open https://example.com --persistent

# Usar un perfil persistente con un directorio personalizado
playwright-cli open https://example.com --profile=/path/to/profile
```

## Adjuntarse a un navegador en ejecución

Usa `attach` para conectarte a un navegador que ya está en ejecución, en lugar de lanzar uno nuevo.

### Adjuntarse por nombre de canal

Conéctate a una instancia en ejecución de Chrome o Edge por su nombre de canal. El navegador debe tener la depuración remota habilitada — navega a `chrome://inspect/#remote-debugging` en el navegador de destino y marca "Allow remote debugging for this browser instance".

```bash
# Adjuntarse a Chrome
playwright-cli attach --cdp=chrome

# Adjuntarse a Chrome Canary
playwright-cli attach --cdp=chrome-canary

# Adjuntarse a Microsoft Edge
playwright-cli attach --cdp=msedge

# Adjuntarse a Edge Dev
playwright-cli attach --cdp=msedge-dev
```

Canales compatibles: `chrome`, `chrome-beta`, `chrome-dev`, `chrome-canary`, `msedge`, `msedge-beta`, `msedge-dev`, `msedge-canary`.

Cuando no se proporciona `--session`, la sesión se nombra según el canal (por ejemplo, `--cdp=msedge` crea una sesión llamada `msedge`), de modo que los attach en paralelo a Chrome y Edge no colisionen en `default`. Pasa `--session=<name>` para sobrescribirlo.

### Adjuntarse mediante un endpoint CDP

Conéctate a un navegador que expone un endpoint de Chrome DevTools Protocol:

```bash
playwright-cli attach --cdp=http://localhost:9222
```

### Adjuntarse mediante la extensión del navegador

Conéctate a un navegador que tiene instalada la extensión de Playwright:

```bash
playwright-cli attach --extension
```

### Desconectarse (detach)

Desmonta una sesión adjunta sin afectar al navegador externo:

```bash
# Desconectar la sesión adjunta por defecto
playwright-cli detach

# Desconectar una sesión adjunta específica
playwright-cli -s=msedge detach
```

`detach` solo funciona en sesiones creadas mediante `attach`. Para las sesiones creadas mediante `open`, usa `close`.

## Sesión de navegador por defecto

Cuando se omite `-s`, los comandos usan la sesión de navegador por defecto:

```bash
# Estos usan la misma sesión de navegador por defecto
playwright-cli open https://example.com
playwright-cli snapshot
playwright-cli close  # Detiene el navegador por defecto
```

## Configuración de la sesión del navegador

Configura una sesión del navegador con ajustes específicos al abrirla:

```bash
# Abrir con un archivo de configuración
playwright-cli open https://example.com --config=.playwright/my-cli.json

# Abrir con un navegador específico
playwright-cli open https://example.com --browser=firefox

# Abrir en modo headed
playwright-cli open https://example.com --headed

# Abrir con un perfil persistente
playwright-cli open https://example.com --persistent
```

## Mejores prácticas

### 1. Nombra las sesiones del navegador de forma semántica

```bash
# BUENO: propósito claro
playwright-cli -s=github-auth open https://github.com
playwright-cli -s=docs-scrape open https://docs.example.com

# EVITAR: nombres genéricos
playwright-cli -s=s1 open https://github.com
```

### 2. Limpia siempre

```bash
# Detener los navegadores al terminar
playwright-cli -s=auth close
playwright-cli -s=scrape close

# O detener todos a la vez
playwright-cli close-all

# Si los navegadores dejan de responder o quedan procesos zombie
playwright-cli kill-all
```

### 3. Elimina los datos obsoletos del navegador

```bash
# Eliminar datos antiguos del navegador para liberar espacio en disco
playwright-cli -s=oldsession delete-data
```
