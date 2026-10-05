---
title: No definas componentes dentro de componentes
impact: HIGH
impactDescription: evita el remontaje en cada render
tags: rerender, components, remount, performance
---

## No definas componentes dentro de componentes

**Impacto: HIGH (evita el remontaje en cada render)**

Definir un componente dentro de otro componente crea un nuevo tipo de componente en cada render. React ve un componente diferente cada vez y lo vuelve a montar por completo, destruyendo todo el estado y el DOM.

Una razón común por la que los desarrolladores hacen esto es para acceder a las variables del padre sin pasar props. En su lugar, pasa siempre props.

**Incorrecto (se vuelve a montar en cada render):**

```tsx
function UserProfile({ user, theme }) {
  // Definido dentro para acceder a `theme` - MAL
  const Avatar = () => (
    <img
      src={user.avatarUrl}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )

  // Definido dentro para acceder a `user` - MAL
  const Stats = () => (
    <div>
      <span>{user.followers} followers</span>
      <span>{user.posts} posts</span>
    </div>
  )

  return (
    <div>
      <Avatar />
      <Stats />
    </div>
  )
}
```

Cada vez que `UserProfile` se renderiza, `Avatar` y `Stats` son nuevos tipos de componentes. React desmonta las instancias anteriores y monta nuevas, perdiendo cualquier estado interno, volviendo a ejecutar los effects y recreando los nodos del DOM.

**Correcto (en su lugar, pasa props):**

```tsx
function Avatar({ src, theme }: { src: string; theme: string }) {
  return (
    <img
      src={src}
      className={theme === 'dark' ? 'avatar-dark' : 'avatar-light'}
    />
  )
}

function Stats({ followers, posts }: { followers: number; posts: number }) {
  return (
    <div>
      <span>{followers} followers</span>
      <span>{posts} posts</span>
    </div>
  )
}

function UserProfile({ user, theme }) {
  return (
    <div>
      <Avatar src={user.avatarUrl} theme={theme} />
      <Stats followers={user.followers} posts={user.posts} />
    </div>
  )
}
```

**Síntomas de este bug:**
- Los campos de input pierden el foco en cada pulsación de tecla
- Las animaciones se reinician inesperadamente
- El cleanup/setup de `useEffect` se ejecuta en cada render del padre
- La posición del scroll se restablece dentro del componente
