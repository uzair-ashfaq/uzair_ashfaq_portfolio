import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useMousePosition } from '../hooks/useMousePosition'

export default function Portrait3D() {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const glowRightRef = useRef(null)
  const { x, y } = useMousePosition()

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const breathe = gsap.to(img, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => breathe.kill()
  }, [])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(img, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [x, y])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[260px] min-h-0 sm:max-w-[300px] md:max-w-[400px] md:min-h-[400px] lg:max-w-[480px] lg:min-h-[480px] flex items-center justify-center portrait-wrapper"
    >
      {/* Dark olive gradient - blends with page background */}
      <div
        className="absolute inset-0 portrait-bg"
        aria-hidden
      />

      {/* Yellowish glow on right - pulses dim and light */}
      <div
        ref={glowRightRef}
        className="absolute inset-0 portrait-glow-right"
        aria-hidden
      />

      {/* Concentric circles overlay */}
      <div className="absolute inset-0 portrait-circles" aria-hidden />

      {/* Portrait - circular frame with ring, clean edges */}
      <div
        ref={imgRef}
        className="relative z-10 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] will-change-transform portrait-frame"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden portrait-blend">
          <img
            src="/portrait.png"
            alt="Uzair Ashfaq"
            className="w-full h-full object-cover object-center select-none pointer-events-none portrait-img"
            draggable={false}
            onError={(e) => {
              e.target.style.display = 'none'
              const placeholder = document.createElement('div')
              placeholder.className = 'w-full h-full flex items-center justify-center bg-gray/50 text-offwhite-muted text-sm'
              placeholder.textContent = 'Add portrait.png to /public'
              e.target.parentNode.appendChild(placeholder)
            }}
          />
        </div>
      </div>
    </div>
  )
}
