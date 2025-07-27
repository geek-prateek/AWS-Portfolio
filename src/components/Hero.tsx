'use client'

import { motion } from 'framer-motion'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadJsonData, PersonalData } from '@/lib/dataLoader'
declare global {
  interface Window {
    particlesJS?: any;
  }
}
const Hero = () => {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadJsonData<PersonalData>('personal.json')
        setPersonalData(data)
      } catch (error) {
        console.error('Failed to load personal data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Load particles.js
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { speed: 2 }
          }
        })
      }
    }
    document.head.appendChild(script)

    // Load Lottie player
    const lottieScript = document.createElement('script')
    lottieScript.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
    document.head.appendChild(lottieScript)

    return () => {
      document.head.removeChild(script)
      document.head.removeChild(lottieScript)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Particle Effect Background */}
      <div id="particles-js" className="absolute inset-0"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 items-center">
          {/* Left Section: Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="left-header flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-md h-96 flex items-center justify-center">
              {loading ? (
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ) : personalData && personalData.profileImage ? (
                <motion.img
                  src={personalData.profileImage}
                  alt={personalData.name + ' profile'}
                  className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-primary-200 dark:border-primary-800"
                  initial={{ scale: 0.95, y: 0 }}
                  animate={{ scale: [0.95, 1.05, 0.95], y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ) : (
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full" />
              )}
            </div>
          </motion.div>

          {/* Right Section: Introduction */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="right-header text-center lg:text-left"
          >
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading...</div>
            ) : personalData ? (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  Hi, I'm<br />
                  <span className="text-primary-600 dark:text-primary-400">{personalData.name}.</span>
                </h1>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  A {personalData.title}.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                  "{personalData.description}"
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href={personalData.cv.downloadUrl} download className="btn-primary flex items-center gap-2 px-8 py-3 text-lg">
                    <Download size={20} />
                    {personalData.cv.buttonText}
                  </a>
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="btn-secondary flex items-center gap-2 px-8 py-3 text-lg"
                  >
                    <Mail size={20} />
                    Get In Touch
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-6 mt-8">
                  <a
                    href={personalData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Github size={24} className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href={personalData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Linkedin size={24} className="text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center text-red-500">Failed to load personal data</div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 