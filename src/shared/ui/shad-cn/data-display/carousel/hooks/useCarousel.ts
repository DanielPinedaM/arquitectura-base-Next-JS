"use client"

import { createContext, useContext } from "react"

import type { CarouselContextProps } from "@shad-cn/carousel-type"

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

export { CarouselContext, useCarousel }
