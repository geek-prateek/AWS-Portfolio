import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Controls from '@/components/Controls'
import ThemeToggle from '@/components/ThemeToggle'
import Blogs from '@/components/Blogs'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />
      <Controls />
      <ThemeToggle />
    </main>
  )
} 