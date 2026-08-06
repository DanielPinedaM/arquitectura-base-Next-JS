"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export { TooltipTrigger }
