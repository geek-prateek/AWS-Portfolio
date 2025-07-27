'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import { config } from '@/lib/config'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        }
        
        // Add token if available for higher rate limits
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
        // Format repositories
        const formattedRepos = allRepos
          .filter((repo: any) => !repo.fork) // Exclude forked repositories
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: new Date(repo.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            topics: repo.topics || []
          }))

        // Prioritize projects with demos - show top 6 with demos first, then others
        const reposWithDemos = formattedRepos.filter((repo: GitHubRepo) => repo.homepage)
        const reposWithoutDemos = formattedRepos.filter((repo: GitHubRepo) => !repo.homepage)
        
        // Take top 6 from repos with demos, then fill remaining slots with others
        const prioritizedRepos = [
          ...reposWithDemos.slice(0, 6),
          ...reposWithoutDemos
        ].slice(0, config.github.maxRepos)

        setRepos(prioritizedRepos)
        
      } catch (err) {
        console.error('Error fetching GitHub data:', err)
        setError('Failed to load GitHub projects. Please check your GitHub username in config.ts')
        setRepos([]) // No sample projects
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Go': 'bg-cyan-500',
      'Java': 'bg-red-500',
      'C++': 'bg-pink-500',
      'Rust': 'bg-orange-500',
      'HCL': 'bg-purple-500',
      'HTML': 'bg-orange-400',
      'CSS': 'bg-blue-400',
      'PHP': 'bg-purple-400',
      'Ruby': 'bg-red-400',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-500',
      'Scala': 'bg-red-600',
      'R': 'bg-blue-600',
      'Dart': 'bg-blue-400',
      'Elixir': 'bg-purple-600',
      'Clojure': 'bg-green-600',
      'Haskell': 'bg-purple-700'
    }
    return colors[language] || 'bg-gray-500'
  }

  return (
    <section id="portfolio" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="main-title"
        >
          <h2>My <span>Portfolio</span><span className="bg-text">my work</span></h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto italic"
        >
          "Take a look at some of my recent projects, where creativity meets functionality! 
          Each piece reflects my passion for crafting seamless user experiences, blending innovative design with robust development. 
          Explore my work and see how I bring ideas to life!"
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-yellow-800 dark:text-yellow-200">
              {error} 
              <br />
              <span className="text-sm">Update username in src/lib/config.ts to connect your GitHub account.</span>
            </p>
          </motion.div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="portfolio-item card animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                No Projects Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unable to load your GitHub projects. Please check your GitHub username in the configuration.
              </p>
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3"
              >
                <Github size={20} />
                View All Projects on GitHub
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="portfolios grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="portfolio-item relative group"
              >
                <div className="card h-full flex flex-col">
                  {/* Project Image with Hover Icons */}
                  <div className="image relative overflow-hidden rounded-lg mb-4 group">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                      <Github size={48} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    
                    {/* Hover Overlay with Icons */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                        title="View Source"
                      >
                        <Github size={20} className="text-gray-700" />
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors duration-200"
                          title="View Demo"
                        >
                          <ExternalLink size={20} className="text-gray-700" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="portfolio-text flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {project.name}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Project Meta - Language and Date on same line */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Language */}
                      {project.language && (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{project.language}</span>
                        </div>
                      )}
                      
                      {/* Date aligned to the right */}
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} />
                        <span>{project.updated_at}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    {project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 