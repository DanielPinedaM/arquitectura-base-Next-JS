"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"
import { Button } from "@shad-cn/Button"
import { useCarousel } from "@shad-cn/useCarousel"
import { LuChevronRight } from "react-icons/lu"

function CarouselNext({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -right-12 my-auto"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <LuChevronRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export { CarouselNext }
