"use client"

import type { ComponentProps } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@shad-cn/helpers"
import { LuChevronDown } from "react-icons/lu"

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <LuChevronDown
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export { SelectScrollDownButton }
