"use client"

import type { ComponentProps } from "react"

import { cn } from "@shad-cn/helpers"
import { useCarousel } from "@shad-cn/useCarousel"

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

export { CarouselItem }
