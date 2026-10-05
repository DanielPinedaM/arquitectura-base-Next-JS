---
title: Cachea las llamadas repetidas a funciones
impact: MEDIUM
impactDescription: evita cómputos redundantes
tags: javascript, cache, memoization, performance
---

## Cachea las llamadas repetidas a funciones

Usa un Map a nivel de módulo para cachear los resultados de una función cuando la misma función se llama repetidamente con los mismos inputs durante el render.

**Incorrecto (cómputo redundante):**

```typescript
function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        // slugify() se llama más de 100 veces para los mismos nombres de proyecto
        const slug = slugify(project.name)
        
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

**Correcto (resultados cacheados):**

```typescript
// Caché a nivel de módulo
const slugifyCache = new Map<string, string>()

function cachedSlugify(text: string): string {
  if (slugifyCache.has(text)) {
    return slugifyCache.get(text)!
  }
  const result = slugify(text)
  slugifyCache.set(text, result)
  return result
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        // Se calcula solo una vez por cada nombre de proyecto único
        const slug = cachedSlugify(project.name)
        
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

**Patrón más simple para funciones de un solo valor:**

```typescript
let isLoggedInCache: boolean | null = null

function isLoggedIn(): boolean {
  if (isLoggedInCache !== null) {
    return isLoggedInCache
  }
  
  isLoggedInCache = document.cookie.includes('auth=')
  return isLoggedInCache
}

// Limpia la caché cuando cambia la autenticación
function onAuthChange() {
  isLoggedInCache = null
}
```

Usa un Map (no un hook) para que funcione en todas partes: utilidades, event handlers, no solo en componentes de React.

Referencia: [Cómo hicimos el Dashboard de Vercel dos veces más rápido](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
