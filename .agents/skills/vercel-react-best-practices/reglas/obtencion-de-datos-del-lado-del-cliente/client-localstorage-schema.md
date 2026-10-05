---
title: Versiona y minimiza los datos de localStorage
impact: MEDIUM
impactDescription: evita conflictos de schema, reduce el tamaño del almacenamiento
tags: client, localStorage, storage, versioning, data-minimization
---

## Versiona y minimiza los datos de localStorage

Agrega un prefijo de versión a las keys y almacena solo los campos necesarios. Evita conflictos de schema y el almacenamiento accidental de datos sensibles.

**Incorrecto:**

```typescript
// Sin versión, almacena todo, sin manejo de errores
localStorage.setItem('userConfig', JSON.stringify(fullUserObject))
const data = localStorage.getItem('userConfig')
```

**Correcto:**

```typescript
const VERSION = 'v2'

function saveConfig(config: { theme: string; language: string }) {
  try {
    localStorage.setItem(`userConfig:${VERSION}`, JSON.stringify(config))
  } catch {
    // Lanza una excepción en navegación incógnito/privada, al exceder la cuota o si está deshabilitado
  }
}

function loadConfig() {
  try {
    const data = localStorage.getItem(`userConfig:${VERSION}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// Migración de v1 a v2
function migrate() {
  try {
    const v1 = localStorage.getItem('userConfig:v1')
    if (v1) {
      const old = JSON.parse(v1)
      saveConfig({ theme: old.darkMode ? 'dark' : 'light', language: old.lang })
      localStorage.removeItem('userConfig:v1')
    }
  } catch {}
}
```

**Almacena los campos mínimos de las respuestas del servidor:**

```typescript
// El objeto User tiene más de 20 campos, almacena solo lo que la UI necesita
function cachePrefs(user: FullUser) {
  try {
    localStorage.setItem('prefs:v1', JSON.stringify({
      theme: user.preferences.theme,
      notifications: user.preferences.notifications
    }))
  } catch {}
}
```

**Envuelve siempre en try-catch:** `getItem()` y `setItem()` lanzan excepciones en la navegación incógnito/privada (Safari, Firefox), cuando se excede la cuota o cuando están deshabilitados.

**Beneficios:** Evolución del schema mediante el versionado, menor tamaño de almacenamiento, evita almacenar tokens/PII/flags internos.
