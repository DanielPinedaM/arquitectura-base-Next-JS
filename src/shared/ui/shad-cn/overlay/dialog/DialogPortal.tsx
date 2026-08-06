"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

export { DialogPortal }
