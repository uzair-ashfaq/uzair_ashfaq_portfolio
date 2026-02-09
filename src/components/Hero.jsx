import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { siteData } from '../data'
import Portrait3D from './Portrait3D'
import TypingEffect from './TypingEffect'

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const typingRef = useRef(null)
  const taglineRef = useRef(null)
  const ctasRef = useRef(null)

  useEffect(() => {
    try {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      const headline = headlineRef.current?.children
      const typing = typingRef.current
      const tagline = taglineRef.current
      const ctas = ctasRef.current?.children

      if (headline?.length) tl.from(headline, { y: 50, duration: 0.7, stagger: 0.08, delay: 0.2 })
      if (typing) tl.from(typing, { y: 20, duration: 0.5 }, '-=0.3')
      if (tagline) tl.from(tagline, { y: 20, duration: 0.5 }, '-=0.3')
      if (ctas?.length) tl.from(ctas, { y: 15, duration: 0.4, stagger: 0.08 }, '-=0.2')
    } catch (_) {}
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-1 sm:gap-4 lg:gap-8 px-4 md:px-12 lg:px-24 pt-14 pb-1 lg:pt-24 lg:pb-16 overflow-hidden"
    >
      {/* Mobile: portrait first (top). Desktop: portrait right */}
      <div className="flex-1 order-1 lg:order-2 flex items-center justify-center lg:justify-end w-full shrink-0 lg:shrink">
        <Portrait3D />
      </div>

      {/* Mobile: name, typing, buttons below portrait. Desktop: text left */}
      <div className="flex-1 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl -mt-1 lg:mt-0">
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.2] mb-8 md:mb-12"
        >
          <span className="block text-offwhite">Uzair</span>
          <span className="block text-gold">Ashfaq</span>
        </h1>
        <p
          ref={typingRef}
          className="text-sm sm:text-base md:text-xl lg:text-2xl mb-3 lg:mb-6 min-h-[1.75rem] lg:min-h-[2.5rem] font-display mt-0.5 md:text-gold"
        >
          <TypingEffect
            words={siteData.expertise}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1000}
          />
        </p>
        <p
          ref={taglineRef}
          className="text-offwhite-muted text-xs sm:text-sm md:text-base lg:text-lg mb-3 lg:mb-10 max-w-md leading-snug"
        >
          {siteData.tagline}
        </p>
        <div ref={ctasRef} className="flex flex-col sm:flex-row gap-2 lg:gap-4 w-full sm:w-auto justify-center lg:justify-start">
          <button
            onClick={scrollToProjects}
            className="px-5 py-2.5 lg:px-8 lg:py-4 bg-gold text-charcoal font-semibold rounded-lg hover:bg-gold-muted transition-all duration-300 text-sm lg:text-base"
          >
            View Projects
          </button>
          <a
            href="/cv.pdf"
            download
            className="px-5 py-2.5 lg:px-8 lg:py-4 glass rounded-lg font-medium hover:bg-white/10 transition-all duration-300 text-sm lg:text-base text-center"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
