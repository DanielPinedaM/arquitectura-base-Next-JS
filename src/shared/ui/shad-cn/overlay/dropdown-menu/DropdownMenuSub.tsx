"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

export { DropdownMenuSub }
