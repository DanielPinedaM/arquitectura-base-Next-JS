"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

export { DropdownMenu }
