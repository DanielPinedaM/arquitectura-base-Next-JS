"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"
import { Button } from "@shad-cn/Button"

function AlertDialogAction({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  )
}

export { AlertDialogAction }
