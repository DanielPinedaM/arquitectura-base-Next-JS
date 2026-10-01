---
title: Optimiza la precisión de los SVG
impact: LOW
impactDescription: reduce el tamaño del archivo
tags: rendering, svg, optimization, svgo
---

## Optimiza la precisión de los SVG

Reduce la precisión de las coordenadas de los SVG para disminuir el tamaño del archivo. La precisión óptima depende del tamaño del viewBox, pero en general se debe considerar reducir la precisión.

**Incorrecto (precisión excesiva):**

```svg
<path d="M 10.293847 20.847362 L 30.938472 40.192837" />
```

**Correcto (1 decimal):**

```svg
<path d="M 10.3 20.8 L 30.9 40.2" />
```

**Automatízalo con SVGO:**

```bash
npx svgo --precision=1 --multipass icon.svg
```
