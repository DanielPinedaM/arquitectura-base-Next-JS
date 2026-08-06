"use client"

import { Combobox as ComboboxPrimitive } from "@base-ui/react"

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

export { ComboboxCollection }
