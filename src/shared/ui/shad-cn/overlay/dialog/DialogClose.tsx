"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

export { DialogClose }
