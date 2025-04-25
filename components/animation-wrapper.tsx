"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface AnimationWrapperProps {
  children: React.ReactNode
  animation?: "fade-in" | "slide-in-left" | "slide-in-right"
  delay?: number
  threshold?: number
  className?: string
}

const AnimationWrapper = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  className = "",
}: AnimationWrapperProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [inView, delay])

  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default AnimationWrapper
