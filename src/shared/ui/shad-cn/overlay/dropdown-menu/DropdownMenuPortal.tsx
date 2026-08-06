"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

export { DropdownMenuPortal }
