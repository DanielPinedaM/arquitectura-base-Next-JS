"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { TableCaption }
