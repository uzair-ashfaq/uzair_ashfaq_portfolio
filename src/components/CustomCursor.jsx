import { useEffect, useState, useRef } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'

export default function CustomCursor() {
  const { x, y } = useMousePosition()
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersPointerFine = window.matchMedia('(pointer: fine)').matches

    if (prefersReducedMotion || !prefersPointerFine) return

    setIsVisible(true)
    document.body.classList.add('custom-cursor')

    const handleMouseLeave = () => {
      setIsVisible(false)
      document.body.classList.remove('custom-cursor')
    }
    const handleMouseEnter = () => {
      setIsVisible(true)
      document.body.classList.add('custom-cursor')
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring - expands on hover */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border-2 border-gold/50 transition-all duration-300 ease-out ${
            isHovering ? 'w-12 h-12 bg-gold/5' : 'w-8 h-8'
          }`}
        />
      </div>
      {/* Inner dot - always follows precisely */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-gold transition-all duration-200 ${
            isHovering ? 'w-1.5 h-1.5' : 'w-2 h-2'
          }`}
        />
      </div>
      {/* Subtle trailing glow */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          opacity: isHovering ? 0.6 : 0.3,
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gold/20 blur-xl" />
      </div>
    </>
  )
}
