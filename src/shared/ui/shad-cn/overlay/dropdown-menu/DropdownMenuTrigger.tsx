"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

export { DropdownMenuTrigger }
