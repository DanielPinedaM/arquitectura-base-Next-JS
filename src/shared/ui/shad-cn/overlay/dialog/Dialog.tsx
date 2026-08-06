"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

export { Dialog }
