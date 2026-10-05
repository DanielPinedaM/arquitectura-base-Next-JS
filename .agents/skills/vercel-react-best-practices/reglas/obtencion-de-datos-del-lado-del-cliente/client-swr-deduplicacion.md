---
title: Usa SWR para la deduplicación automática
impact: MEDIUM-HIGH
impactDescription: deduplicación automática
tags: client, swr, deduplication, data-fetching
---

## Usa SWR para la deduplicación automática

SWR permite la deduplicación de peticiones, el caching y la revalidación entre las instancias de un componente.

**Incorrecto (sin deduplicación, cada instancia hace fetch):**

```tsx
function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers)
  }, [])
}
```

**Correcto (múltiples instancias comparten una sola petición):**

```tsx
import useSWR from 'swr'

function UserList() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

**Para datos inmutables:**

```tsx
import { useImmutableSWR } from '@/lib/swr'

function StaticContent() {
  const { data } = useImmutableSWR('/api/config', fetcher)
}
```

**Para mutaciones:**

```tsx
import { useSWRMutation } from 'swr/mutation'

function UpdateButton() {
  const { trigger } = useSWRMutation('/api/user', updateUser)
  return <button onClick={() => trigger()}>Update</button>
}
```

Referencia: [https://swr.vercel.app](https://swr.vercel.app)
