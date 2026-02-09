import { useEffect, useState } from 'react'
import { siteData } from '../data'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-3' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          className="flex items-center gap-2 font-display font-bold text-xl text-offwhite hover:text-gold transition-colors"
        >
          <img
            src="/logo.png"
            alt={`${siteData.name} logo`}
            className="h-10 w-10 object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              const fallback = e.target.parentElement?.querySelector('.logo-fallback')
              if (fallback) fallback.classList.remove('hidden')
            }}
          />
          <span className="logo-fallback hidden">UA</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm text-offwhite-muted hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger - mobile only */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="md:hidden p-2 text-offwhite hover:text-gold transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[72px] md:hidden z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
        <ul className="relative flex flex-col gap-1 p-6 pt-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="block py-3 px-4 text-offwhite hover:text-gold hover:bg-white/5 rounded-lg transition-colors text-lg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
