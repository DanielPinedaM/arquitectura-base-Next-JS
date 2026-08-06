"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

export { DropdownMenuGroup }
