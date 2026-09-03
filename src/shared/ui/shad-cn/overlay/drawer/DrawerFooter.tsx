"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0", className)}
      {...props}
    />
  )
}

export { DrawerFooter }
