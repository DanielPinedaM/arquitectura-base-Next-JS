# Adjuntar capturas de pantalla y videos a pull requests

`gh` 2.99+ sube imágenes y videos locales con el flag repetible `--attach` en `gh pr create`, `gh pr comment`, `gh pr edit`, `gh issue create`, `gh issue comment` y `gh issue edit`. Se aceptan PNG, JPEG, GIF, WebP, SVG, MP4, MOV y WebM, por lo que la salida de `pnpm exec playwright-cli screenshot` y de `video-start` se puede adjuntar tal cual.

## Cuándo adjuntar

Adjunta evidencia visual cuando le ahorre al revisor hacer un checkout: una captura de pantalla de una corrección de UI, un par antes/después, un video corto de un flujo nuevo de cara al usuario, o el estado de fallo al reportar un bug. Omítela en refactors, cambios solo de backend y todo lo que el diff ya muestre.

## Desde una sesión local

```bash
# capturar la evidencia
pnpm exec playwright-cli open http://localhost:3000/settings
pnpm exec playwright-cli screenshot --filename=settings-after.png
pnpm exec playwright-cli video-start settings-flow.webm
pnpm exec playwright-cli click e5
pnpm exec playwright-cli fill e7 "New name" --submit
pnpm exec playwright-cli video-stop

# adjuntar al crear el PR; el texto alternativo va después de "#" (solo imágenes)
gh pr create --title "fix(settings): keep name after save" --body-file body.md \
  --attach './settings-after.png#Settings page after saving' --attach ./settings-flow.webm

# o comentar en un PR / issue existente
gh pr comment 123 --body "Recorded the new flow end to end." --attach ./settings-flow.webm
gh issue comment 456 --body "Failure state after submitting the form." --attach ./failure.png
```

Referencia el archivo en el cuerpo como `![alt](./settings-after.png)` para colocarlo en línea y `gh` reescribe la ruta con la URL subida. Los adjuntos sin referenciar se agregan al final en el orden de los flags.

## Límites

- Imágenes de hasta 10 MB, videos de hasta 10 MB en los planes gratuitos y 100 MB en los planes de pago, así que mantén las grabaciones cortas.
- El texto alternativo no es compatible con los videos.
- Las subidas requieren acceso de push al repositorio.
- Disponible solo en GitHub.com y GitHub Enterprise Cloud.

## Desde CI

Adjunta las capturas de pantalla y los videos que Playwright Test ya guarda en `test-results` (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`) con el mismo comando:

```yaml
permissions:
  pull-requests: write
steps:
  - run: pnpm exec playwright test
  - name: Adjuntar al PR las capturas de pantalla y los videos de los fallos
    if: failure() && github.event_name == 'pull_request'
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    run: |
      files=$(find test-results -name '*.png' -o -name '*.webm' | head -20)
      if [ -n "$files" ]; then
        gh pr comment ${{ github.event.pull_request.number }} \
          --body "Failure screenshots and videos from run ${{ github.run_id }}." \
          $(printf -- '--attach %s ' $files)
      fi
```

Para un recorrido pulido de una funcionalidad nueva, graba un hero script como se describe en [grabacion-de-video.md](grabacion-de-video.md) y adjunta el WebM resultante de la misma manera.
