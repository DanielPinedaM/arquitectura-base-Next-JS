"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

export { DialogTrigger }
