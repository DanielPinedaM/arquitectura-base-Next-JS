"use client"

import type { ComponentProps } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@shad-cn/helpers"
import { LuChevronUp } from "react-icons/lu"

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <LuChevronUp
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

export { SelectScrollUpButton }
