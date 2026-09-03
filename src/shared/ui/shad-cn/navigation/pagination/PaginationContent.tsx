import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"

function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

export { PaginationContent }
