'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadJsonData, ExperienceData } from '@/lib/dataLoader'

const Experience = () => {
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadJsonData<ExperienceData>('experience.json')
        setExperienceData(data)
      } catch (error) {
        console.error('Failed to load experience data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Work <span className="text-primary-600 dark:text-primary-400">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and career progression
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading experience...</div>
            ) : experienceData ? (
              experienceData.experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-600 rounded-full transform -translate-x-2 md:-translate-x-1/2 mt-6"></div>

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                    <div className="card">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {experience.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                            <div className="flex items-center gap-1">
                              <Building size={16} />
                              {experience.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {experience.location}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 font-medium">
                            <Calendar size={16} />
                            {experience.period}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
                         ) : (
               <div className="text-center text-red-500">Failed to load experience data</div>
             )}
           </div>
         </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Education
          </h3>
          
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center text-lg text-gray-500">Loading education...</div>
            ) : experienceData ? (
              <div className="card">
                <div className="grid md:grid-cols-2 gap-8">
                  {experienceData.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{edu.institution}</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{edu.period}</p>
                      <p className="text-gray-600 dark:text-gray-300 mt-3">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-red-500">Failed to load education data</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 