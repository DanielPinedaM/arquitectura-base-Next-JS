"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@shad-cn/helpers"
import { LuChevronDown } from "react-icons/lu"

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <LuChevronDown className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

export { ComboboxTrigger }
