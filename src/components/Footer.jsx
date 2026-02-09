import { siteData } from '../data'

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-offwhite-muted text-sm">
          © {new Date().getFullYear()} {siteData.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#hero" className="text-offwhite-muted text-sm hover:text-gold transition-colors">
            Home
          </a>
          <a href="#contact" className="text-offwhite-muted text-sm hover:text-gold transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
