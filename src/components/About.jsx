import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about as aboutData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const strengthsRef = useRef(null)

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
        textRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(
        strengthsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: { trigger: strengthsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const paragraphs = aboutData.text.split('. ').filter(Boolean)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold mb-12"
        >
          About <span className="text-gold">Me</span>
        </h2>
        <div ref={textRef} className="space-y-6 mb-12">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-offwhite-muted text-lg leading-relaxed">
              {p.trim()}.
            </p>
          ))}
        </div>
        <div className="glass rounded-2xl p-8 md:p-10">
          <p className="text-sm text-gold uppercase tracking-wider mb-4 font-display">Core Strengths</p>
          <div
            ref={strengthsRef}
            className="flex flex-wrap gap-3"
          >
            {aboutData.strengths.map((s, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg bg-white/5 text-offwhite-muted text-sm border border-white/5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
