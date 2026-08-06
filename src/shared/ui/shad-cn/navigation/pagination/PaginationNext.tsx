import * as React from "react"

import { cn } from "@shad-cn/helpers"
import { PaginationLink } from "@shad-cn/PaginationLink"
import { LuChevronRight } from "react-icons/lu"

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <LuChevronRight data-icon="inline-end" />
    </PaginationLink>
  )
}

export { PaginationNext }
