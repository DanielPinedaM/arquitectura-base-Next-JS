"use client"

import * as React from "react"

import { cn } from "@shad-cn/helpers"

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

export { PopoverHeader }
