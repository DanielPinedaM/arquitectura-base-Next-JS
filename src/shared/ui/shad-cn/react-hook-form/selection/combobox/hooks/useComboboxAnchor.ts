"use client"

import { useRef } from "react"

function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null)
}

export { useComboboxAnchor }
