"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@shad-cn/helpers"

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export { PopoverDescription }
