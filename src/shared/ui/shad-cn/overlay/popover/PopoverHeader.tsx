"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function PopoverHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

export { PopoverHeader }
