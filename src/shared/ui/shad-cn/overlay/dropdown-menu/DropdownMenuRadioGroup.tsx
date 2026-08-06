"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

export { DropdownMenuRadioGroup }
