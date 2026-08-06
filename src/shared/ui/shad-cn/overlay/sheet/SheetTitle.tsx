"use client"

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { cn } from "@shad-cn/helpers"

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { SheetTitle }
