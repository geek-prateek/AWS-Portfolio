'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code } from 'lucide-react'
import { config } from '@/lib/config'

interface GitHubRepo {
  id: number
  name: string
  language: string
}

const Skills = () => {
  const [languages, setLanguages] = useState<{ [lang: string]: number }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true)
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        }
        if (config.github.token) {
          headers['Authorization'] = `token ${config.github.token}`
        }
        const allRepos: any[] = []
        let page = 1
        const perPage = 100 // Max allowed by GitHub API

        while (true) {
          const response = await fetch(
            `https://api.github.com/users/${config.github.username}/repos?sort=updated&per_page=${perPage}&page=${page}`,
            { headers }
          )

          if (!response.ok) {
            throw new Error(`Failed to fetch repositories on page ${page}`)
          }

          const data = await response.json()

          // If the page returns no data, break the loop
          if (data.length === 0) {
            break
          }

          allRepos.push(...data)
          page++
        }
        const repos: GitHubRepo[] = allRepos.filter((repo: any) => !repo.fork)
        // Count language usage
        const langCount: { [lang: string]: number } = {}
        repos.forEach((repo) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1
          }
        })
        setLanguages(langCount)
      } catch (err) {
        setError('Failed to load skills from GitHub.')
        setLanguages({})
      } finally {
        setLoading(false)
      }
    }
    fetchLanguages()
  }, [])

  // Convert to array and sort by usage
  const sortedLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  return (
    <section id="skills" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-primary-600">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Languages detected from my public GitHub repositories
          </p>
        </motion.div>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading skills...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : sortedLanguages.length === 0 ? (
          <div className="text-center text-gray-500">No languages detected in your repositories.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Code size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Languages Used</h3>
              </div>
              {sortedLanguages.map((lang, idx) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{lang.name}</span>
                    <span className="text-sm text-gray-500">{lang.count} repo{lang.count > 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(lang.count * 15, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills 