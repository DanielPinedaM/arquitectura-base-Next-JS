"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@shad-cn/helpers"
import { InputGroupButton } from "@shad-cn/InputGroupButton"
import { LuX } from "react-icons/lu"

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <LuX className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

export { ComboboxClear }
