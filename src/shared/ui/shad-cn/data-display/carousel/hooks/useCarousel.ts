"use client"

import * as React from "react"

import type { CarouselContextProps } from "@shad-cn/carousel-type"

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

export { CarouselContext, useCarousel }
