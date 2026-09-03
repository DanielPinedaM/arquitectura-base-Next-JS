import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"
import { LuEllipsis } from "react-icons/lu"

function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <LuEllipsis
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export { PaginationEllipsis }
