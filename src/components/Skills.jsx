import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills as skillsData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
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
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Skills & <span className="text-gold">Tech Stack</span>
        </h2>
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillsData.map((category, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/5 group"
            >
              <h3 className="font-display text-lg font-semibold text-gold mb-4 group-hover:text-gold-muted transition-colors">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, j) => (
                  <li key={j} className="text-offwhite-muted text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
