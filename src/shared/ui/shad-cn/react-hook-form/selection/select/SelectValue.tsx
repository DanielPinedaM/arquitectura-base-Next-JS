"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@shad-cn/helpers"

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

export { SelectValue }
