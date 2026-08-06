"use client"

import * as React from "react"

import { cn } from "@shad-cn/helpers"

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

export { TableHeader }
