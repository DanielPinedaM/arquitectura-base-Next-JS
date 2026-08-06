"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@shad-cn/helpers"
import { tabsListVariants } from "@shad-cn/tabs-const"

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

export { TabsList }
