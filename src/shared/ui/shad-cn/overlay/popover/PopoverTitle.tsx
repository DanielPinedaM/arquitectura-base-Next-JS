"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@shad-cn/helpers"

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

export { PopoverTitle }
