# Tracing

Captura trazas de ejecución detalladas para depuración y análisis. Las trazas incluyen snapshots del DOM, capturas de pantalla, actividad de red y logs de la consola.

## Uso básico

```bash
# Iniciar la grabación de la traza
pnpm exec playwright-cli tracing-start

# Realizar acciones
pnpm exec playwright-cli open https://example.com
pnpm exec playwright-cli click e1
pnpm exec playwright-cli fill e2 "test"

# Detener la grabación de la traza
pnpm exec playwright-cli tracing-stop
```

## Archivos de salida de la traza

Cuando inicias el tracing, Playwright crea un directorio `.playwright-cli/traces/` con varios archivos:

### `trace-{timestamp}.trace`

**Log de acciones** - El archivo de traza principal que contiene:
- Cada acción realizada (clicks, rellenados, navegaciones)
- Snapshots del DOM antes y después de cada acción
- Capturas de pantalla en cada paso
- Información de tiempos
- Mensajes de la consola
- Ubicaciones en el código fuente

### `trace-{timestamp}.network`

**Log de red** - Actividad de red completa:
- Todas las peticiones y respuestas HTTP
- Headers y bodies de las peticiones
- Headers y bodies de las respuestas
- Tiempos (DNS, connect, TLS, TTFB, descarga)
- Tamaños de los recursos
- Peticiones fallidas y errores

### `resources/`

**Directorio de recursos** - Recursos en caché:
- Imágenes, fuentes, hojas de estilo, scripts
- Bodies de las respuestas para reproducción
- Assets necesarios para reconstruir el estado de la página

## Qué capturan las trazas

| Categoría | Detalles |
|----------|---------|
| **Acciones** | Clicks, rellenados, hovers, entrada de teclado, navegaciones |
| **DOM** | Snapshot completo del DOM antes/después de cada acción |
| **Capturas de pantalla** | Estado visual en cada paso |
| **Red** | Todas las peticiones, respuestas, headers, bodies, tiempos |
| **Consola** | Todos los mensajes console.log, warn, error |
| **Tiempos** | Tiempo preciso de cada operación |

## Casos de uso

### Depurar acciones fallidas

```bash
pnpm exec playwright-cli tracing-start
pnpm exec playwright-cli open https://app.example.com

# Este click falla - ¿por qué?
pnpm exec playwright-cli click e5

pnpm exec playwright-cli tracing-stop
# Abrir la traza para ver el estado del DOM cuando se intentó el click
```

### Analizar el rendimiento

```bash
pnpm exec playwright-cli tracing-start
pnpm exec playwright-cli open https://slow-site.com
pnpm exec playwright-cli tracing-stop

# Ver la cascada de red (waterfall) para identificar los recursos lentos
```

### Capturar evidencia

```bash
# Grabar un flujo de usuario completo para documentación
pnpm exec playwright-cli tracing-start

pnpm exec playwright-cli open https://app.example.com/checkout
pnpm exec playwright-cli fill e1 "4111111111111111"
pnpm exec playwright-cli fill e2 "12/25"
pnpm exec playwright-cli fill e3 "123"
pnpm exec playwright-cli click e4

pnpm exec playwright-cli tracing-stop
# La traza muestra la secuencia exacta de eventos
```

## Traza vs Video vs Captura de pantalla

| Característica | Traza | Video | Captura de pantalla |
|---------|-------|-------|------------|
| **Formato** | archivo .trace | video .webm | imagen .png/.jpeg |
| **Inspección del DOM** | Sí | No | No |
| **Detalles de red** | Sí | No | No |
| **Reproducción paso a paso** | Sí | Continua | Un solo fotograma |
| **Tamaño del archivo** | Medio | Grande | Pequeño |
| **Ideal para** | Depuración | Demos | Captura rápida |

## Mejores prácticas

### 1. Inicia el tracing antes del problema

```bash
# Traza todo el flujo, no solo el paso que falla
pnpm exec playwright-cli tracing-start
pnpm exec playwright-cli open https://example.com
# ... todos los pasos que llevan al problema ...
pnpm exec playwright-cli tracing-stop
```

### 2. Limpia las trazas antiguas

Las trazas pueden consumir un espacio considerable en disco:

```bash
# Eliminar las trazas con más de 7 días
find .playwright-cli/traces -mtime +7 -delete
```

## Limitaciones

- Las trazas agregan sobrecarga a la automatización
- Las trazas grandes pueden consumir un espacio considerable en disco
- Algo del contenido dinámico puede no reproducirse a la perfección
