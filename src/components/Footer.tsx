'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom pb-6">
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Portfolio. Designed with{' '}
              <Heart className="inline w-4 h-4 text-red-500" /> by{' '}
              <span className="text-primary-400">Prateek Kumar | Founder of NGVP</span>
            </p>
            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200 text-sm"
            >
              Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 
