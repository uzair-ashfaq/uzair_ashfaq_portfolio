import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials as testimonialsData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gold">Testimonials</span>
        </h2>
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonialsData.map((t, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-500"
            >
              <p className="text-offwhite-muted italic mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-display font-semibold text-offwhite">{t.author}</p>
                <p className="text-sm text-gold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
