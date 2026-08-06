import * as React from "react"

import { cn } from "@shad-cn/helpers"
import { PaginationLink } from "@shad-cn/PaginationLink"
import { LuChevronLeft } from "react-icons/lu"

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <LuChevronLeft data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

export { PaginationPrevious }
