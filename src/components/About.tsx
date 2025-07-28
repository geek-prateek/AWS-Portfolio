'use client'

import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadJsonData, AboutData } from '@/lib/dataLoader'
import { ExperienceData } from '@/lib/dataLoader'

const GITHUB_USERNAME = 'geek-prateek'

const About = () => {
  const router = useRouter()
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  // Add state for dynamic stats
  const [repoCount, setRepoCount] = useState<number | null>(null)
  const [yearsOfExperience, setYearsOfExperience] = useState<number | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadJsonData<AboutData>('about.json')
        setAboutData(data)
      } catch (error) {
        console.error('Failed to load about data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Fetch GitHub repo count
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepoCount(Math.round(data.length))
        }
      })
      .catch(() => setRepoCount(null))
  }, [])

  // Fetch experience data and calculate years
  useEffect(() => {
    const getExperienceYears = async () => {
      try {
        const expData = await loadJsonData<ExperienceData>('experience.json')
        if (expData.experiences && expData.experiences.length > 0) {
          // Extract start years from period strings
          const years = expData.experiences.map(exp => {
            // Try to extract a 4-digit year from the start of the period string
            const match = exp.period.match(/(\d{4})/)
            return match ? parseInt(match[1], 10) : null
          }).filter(Boolean) as number[]
          if (years.length > 0) {
            const minYear = Math.min(...years)
            setYearsOfExperience(new Date().getFullYear() - minYear)
          }
        }
      } catch {
        setYearsOfExperience(null)
      }
    }
    getExperienceYears()
  }, [])

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="main-title"
        >
          <h2>About <span>me</span><span className="bg-text">my stats</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="left-about"
          >
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Story</h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {aboutData?.aboutText || "I'm passionate about applying hands-on learning to real-world projects"}
            </p>
            <div className="btn-con flex gap-4">
              <button className="btn-primary flex items-center gap-2 px-4 py-3 text-lg" onClick={() => router.push('/resume')}>
                <Eye size={20} />
                View Resume
              </button>
            </div>
          </motion.div>

          {/* Right Section - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="right-about grid grid-cols-1 gap-6"
          >
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading stats...</div>
            ) : aboutData ? (
              // Custom dynamic stats
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  viewport={{ once: true }}
                  className="about-item card text-center"
                >
                  <div className="abt-text">
                    <p className="large-text text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {repoCount !== null ? repoCount : aboutData.stats[0]?.number} +
                    </p>
                    <p className="small-text text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      Projects{`\n`}Completed
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="about-item card text-center"
                >
                  <div className="abt-text">
                    <p className="large-text text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {yearsOfExperience !== null ? yearsOfExperience : aboutData.stats[1]?.number}
                    </p>
                    <p className="small-text text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      Years of Experience{`\nin Software Development`}
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              <div className="text-center text-red-500">Failed to load stats</div>
            )}
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="about-stats mt-16"
        >
          <h4 className="stat-title text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            My Skills
          </h4>
          <div className="progress-bars grid md:grid-cols-2 gap-6">
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading skills...</div>
            ) : aboutData ? (
              aboutData.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="progress-bar"
                >
                  <p className="prog-title text-gray-700 dark:text-gray-300 font-medium mb-2">
                    {skill.name}
                  </p>
                  <div className="progress-con">
                    <p className="prog-text text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {skill.percentage}%
                    </p>
                    <div className="progress bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full block"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-red-500">Failed to load skills</div>
            )}
          </div>
        </motion.div>

        {/* Timeline Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h4 className="stat-title text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            My Timeline
          </h4>
          <div className="timeline grid gap-6">
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading timeline...</div>
            ) : aboutData ? (
              aboutData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="timeline-item card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="tl-icon w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Briefcase size={20} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <p className="tl-duration text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                        {item.duration}
                      </p>
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title} <span className="text-primary-600 dark:text-primary-400">- {item.company}</span>
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-red-500">Failed to load timeline</div>
            )}
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}

export default About 