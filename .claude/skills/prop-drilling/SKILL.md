---
name: prop-drilling
description: Prohíbe el prop drilling en componentes React/Next.js. Obliga el patrón data down (props) / events up (callback props) y define las alternativas permitidas cuando un dato debe cruzar componentes intermedios.
when_to_use: Aplicar SIEMPRE que se diseñe, cree, divida, modifique o refactorice un componente, o que se defina cómo se comunican dos componentes. Triggers — "crea un componente", "nuevo componente", "refactoriza este componente", "divide este componente", "extrae un componente", "agrega una prop", "pasa este dato al hijo", "el hijo debe avisar al padre", "comunicar componentes", "mover el estado", "levantar el estado", "crea un wrapper", "crea un layout", "revisa este componente".
---

# Data Down, Events Up

## Regla
PROHIBIDO el prop drilling. Toda comunicación entre componentes usa **data down, events up**.

## Definiciones
* **Data down:** el padre pasa el dato al hijo **directo** por props. El hijo lo consume; nunca lo muta.

* **Events up:** el hijo notifica al padre **directo** con una callback prop (`onAlgo`). El padre es dueño del estado y el único que lo actualiza.

* **Prop drilling (PROHIBIDO):** una prop (de datos o callback) que atraviesa **1 o más componentes intermedios que no la consumen** y que solo la reenvían hacia abajo o la re-emiten hacia arriba.

Una prop que el hijo directo sí consume NO es prop drilling. Lo prohibido es el componente de paso.

## Alternativas, en este Orden
1. **Composición, reestructurar el árbol de componentes:** eliminar o reubicar el componente intermedio para que el que produce el dato y el que lo consume queden padre/hijo directos. No usa ninguna API extra, cambia la forma del árbol. Es la opción por defecto.

2. **Composición con `children` o slots:** cuando el componente intermedio debe existir, que reciba el contenido ya construido en lugar de reenviar props. Así el padre queda conectado directamente con el componente que consume el dato.

3. **Store de zustand:** solo si lo anterior no aplica. El estado vive en un store y cada componente lo consume con su hook donde lo necesita.

React Context queda reservado a los compound components de UI. PROHIBIDO usarlo como store de estado de feature para evitar el drilling.

## Checklist Antes de Escribir el Componente
```
- [ ] 1. Por cada prop nueva: verificar que el componente que la declara consume el valor.
- [ ] 2. Si solo la reenvía o la re-emite, es prop drilling: no escribirla.
- [ ] 3. Resolverlo reestructurando el árbol; si el intermedio debe existir, pasarle children/slots; si nada de eso aplica, mover el estado a un store de zustand.
- [ ] 4. Confirmar que el hijo no muta la prop: notifica con la callback y el padre decide.
```

## Prohibiciones
* Declarar una prop cuyo único uso sea pasarla a otro componente en el JSX.

* Declarar una callback prop cuyo único uso sea re-emitir la callback de un hijo.

* Mutar dentro del hijo el valor recibido por props.

## Al Refactorizar
Antes de modificar un componente, recorrer la cadena de props de arriba abajo y listar las que atraviesan componentes intermedios. Cada una es una violación y debe eliminarse aplicando las alternativas.
