"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

export { TableBody }
