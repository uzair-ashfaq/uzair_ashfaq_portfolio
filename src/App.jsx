import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Background - CSS gradient (Three.js can cause white screen on some systems) */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 169, 98, 0.08) 0%, transparent 50%), #0a0a0a',
        }}
      />

      {/* Custom cursor - desktop only */}
      <CustomCursor />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  )
}
