import { useState, useEffect, useRef } from 'react'

/**
 * Smooth mouse position using requestAnimationFrame for buttery cursor movement
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current
      const lerp = 0.18

      currentRef.current = {
        x: current.x + (target.x - current.x) * lerp,
        y: current.y + (target.y - current.y) * lerp,
      }
      setPosition({ ...currentRef.current })
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return position
}
