---
title: Usa actualizaciones funcionales de setState
impact: MEDIUM
impactDescription: evita stale closures y recreaciones innecesarias de callbacks
tags: react, hooks, useState, useCallback, callbacks, closures
---

## Usa actualizaciones funcionales de setState

Al actualizar el estado en función del valor actual del estado, usa la forma de actualización funcional de setState en lugar de referenciar directamente la variable de estado. Esto evita stale closures, elimina dependencias innecesarias y crea referencias de callbacks estables.

**Incorrecto (requiere el estado como dependencia):**

```tsx
function TodoList() {
  const [items, setItems] = useState(initialItems)
  
  // El callback debe depender de items, se recrea en cada cambio de items
  const addItems = useCallback((newItems: Item[]) => {
    setItems([...items, ...newItems])
  }, [items])  // ❌ la dependencia items provoca recreaciones
  
  // Riesgo de stale closure si se olvida la dependencia
  const removeItem = useCallback((id: string) => {
    setItems(items.filter(item => item.id !== id))
  }, [])  // ❌ Falta la dependencia items - ¡usará items desactualizados!
  
  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

El primer callback se recrea cada vez que cambia `items`, lo que puede provocar que los componentes hijos hagan re-render innecesariamente. El segundo callback tiene un bug de stale closure: siempre referenciará el valor inicial de `items`.

**Correcto (callbacks estables, sin stale closures):**

```tsx
function TodoList() {
  const [items, setItems] = useState(initialItems)
  
  // Callback estable, nunca se recrea
  const addItems = useCallback((newItems: Item[]) => {
    setItems(curr => [...curr, ...newItems])
  }, [])  // ✅ No se necesitan dependencias
  
  // Siempre usa el estado más reciente, sin riesgo de stale closure
  const removeItem = useCallback((id: string) => {
    setItems(curr => curr.filter(item => item.id !== id))
  }, [])  // ✅ Seguro y estable
  
  return <ItemsEditor items={items} onAdd={addItems} onRemove={removeItem} />
}
```

**Beneficios:**

1. **Referencias de callbacks estables** - Los callbacks no necesitan recrearse cuando cambia el estado
2. **Sin stale closures** - Siempre opera sobre el valor más reciente del estado
3. **Menos dependencias** - Simplifica los arrays de dependencias y reduce las fugas de memoria
4. **Evita bugs** - Elimina la fuente más común de bugs de closures en React

**Cuándo usar actualizaciones funcionales:**

- Cualquier setState que dependa del valor actual del estado
- Dentro de useCallback/useMemo cuando se necesita el estado
- Event handlers que referencian el estado
- Operaciones asíncronas que actualizan el estado

**Cuándo están bien las actualizaciones directas:**

- Establecer el estado a un valor estático: `setCount(0)`
- Establecer el estado solo a partir de props/argumentos: `setName(newName)`
- El estado no depende del valor anterior

**Nota:** Si tu proyecto tiene [React Compiler](https://react.dev/learn/react-compiler) habilitado, el compiler puede optimizar automáticamente algunos casos, pero las actualizaciones funcionales siguen siendo recomendables por corrección y para evitar bugs de stale closures.
