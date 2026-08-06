"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@shad-cn/helpers"
import { ComboboxClear } from "@shad-cn/ComboboxClear"
import { ComboboxTrigger } from "@shad-cn/ComboboxTrigger"
import { InputGroup } from "@shad-cn/InputGroup"
import { InputGroupAddon } from "@shad-cn/InputGroupAddon"
import { InputGroupButton } from "@shad-cn/InputGroupButton"
import { InputGroupInput } from "@shad-cn/InputGroupInput"

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

export { ComboboxInput }
