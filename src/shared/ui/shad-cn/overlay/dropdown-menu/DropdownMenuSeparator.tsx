"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@shad-cn/helpers"

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export { DropdownMenuSeparator }
