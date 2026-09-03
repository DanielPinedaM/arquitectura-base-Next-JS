"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

export { SheetHeader }
