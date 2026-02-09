import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience as experienceData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const timelineRef = useRef(null)

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
        timelineRef.current?.children || [],
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gold">Experience</span>
        </h2>
        <div ref={timelineRef} className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gray-light to-transparent" />
          {experienceData.map((exp, i) => (
            <div key={i} className="relative pl-12 md:pl-16">
              <div className="absolute left-0 w-3 h-3 rounded-full bg-gold top-1.5" />
              <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
                  <span className="text-sm text-gold">{exp.period}</span>
                </div>
                <p className="text-offwhite-muted text-sm mb-3">{exp.company}</p>
                <p className="text-offwhite-muted text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
