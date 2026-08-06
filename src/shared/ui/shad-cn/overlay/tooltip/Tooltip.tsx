"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

export { Tooltip }
