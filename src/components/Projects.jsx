import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects as projectsData } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [expandedId, setExpandedId] = useState(null)

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
        gridRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Selected <span className="text-gold">Projects</span>
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`glass rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer ${
                expandedId === project.id ? 'ring-2 ring-gold/50' : 'hover:ring-1 hover:ring-gold/30'
              }`}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              <div className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-gold uppercase tracking-wider">{project.type}</span>
                </div>
                <p className="text-offwhite-muted text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-white/5 text-xs text-offwhite-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {expandedId === project.id && (
                <div className="px-6 pb-6 pt-0 border-t border-white/5 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                  <p className="text-offwhite-muted text-sm pt-4">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-block mt-4 text-gold text-sm hover:underline"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
