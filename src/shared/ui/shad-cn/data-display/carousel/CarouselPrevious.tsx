"use client"

import * as React from "react"

import { cn } from "@shad-cn/helpers"
import { Button } from "@shad-cn/Button"
import { useCarousel } from "@shad-cn/useCarousel"
import { LuChevronLeft } from "react-icons/lu"

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation rounded-full",
        orientation === "horizontal"
          ? "inset-y-0 -left-12 my-auto"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <LuChevronLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

export { CarouselPrevious }
