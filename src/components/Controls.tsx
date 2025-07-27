'use client'

import { useState, useEffect } from 'react'
import { Home, User, Briefcase, FileText, Mail } from 'lucide-react'

const Controls = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'blogs', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const controls = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ]

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        {controls.map((control) => (
          <button
            key={control.id}
            onClick={() => scrollToSection(control.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              activeSection === control.id
                ? 'bg-primary-600 text-white shadow-lg scale-110'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white'
            }`}
            title={control.label}
          >
            <control.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Controls 