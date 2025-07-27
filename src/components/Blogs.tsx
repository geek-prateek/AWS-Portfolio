'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Calendar, Clock, ArrowRight } from 'lucide-react'
import { config } from '@/lib/config'

interface BlogPost {
  title: string
  link: string
  description: string
  pubDate: string
  author: string
  categories: string[]
  thumbnail?: string
  image?: string
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        
        // Using a CORS proxy to fetch Medium RSS feed
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(config.medium.rssUrl)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        
        const data = await response.json()
        
        if (data.status === 'ok' && data.items) {
          const formattedBlogs = data.items.map((item: any) => {
            // Extract image from content or use thumbnail
            let imageUrl = null
            
            // Try to get image from content
            if (item.content) {
              const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/)
              if (imgMatch) {
                imageUrl = imgMatch[1]
              }
            }
            
            // If no image in content, try thumbnail
            if (!imageUrl && item.thumbnail) {
              imageUrl = item.thumbnail
            }
            
            // If still no image, try to extract from description
            if (!imageUrl && item.description) {
              const descImgMatch = item.description.match(/<img[^>]+src="([^"]+)"/)
              if (descImgMatch) {
                imageUrl = descImgMatch[1]
              }
            }

            return {
              title: item.title,
              link: item.link,
              description: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              author: item.author,
              categories: item.categories || [],
              thumbnail: imageUrl,
              image: imageUrl
            }
          })
          
          setBlogs(formattedBlogs.slice(0, config.medium.maxPosts))
        } else {
          throw new Error('Invalid RSS feed data')
        }
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs. Please check your Medium username in config.ts')
        
        // Fallback to sample blogs if API fails
        setBlogs([
          {
            title: 'Building a Full-Stack Web App: Frontend + Cloud Backend',
            link: `https://medium.com/@${config.medium.username}/building-fullstack-web-app`,
            description: 'Learn how to build a complete web application with modern frontend technologies and cloud backend services...',
            pubDate: 'December 15, 2024',
            author: config.personal.name,
            categories: ['Web Development', 'Cloud Computing'],
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
          },
          {
            title: 'Staying Updated with the Latest Cloud & DevOps Trends',
            link: `https://medium.com/@${config.medium.username}/cloud-devops-trends`,
            description: 'Explore the latest trends in cloud computing and DevOps practices that are shaping the industry...',
            pubDate: 'December 10, 2024',
            author: config.personal.name,
            categories: ['DevOps', 'Cloud Computing'],
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'
          },
          {
            title: 'Best Practices for Securing Your Cloud Infrastructure',
            link: `https://medium.com/@${config.medium.username}/cloud-security-best-practices`,
            description: 'Essential security practices to protect your cloud infrastructure and applications from threats...',
            pubDate: 'December 5, 2024',
            author: config.personal.name,
            categories: ['Security', 'Cloud Computing'],
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop'
          },
          {
            title: 'Getting Started with AWS: A Beginner\'s Guide',
            link: `https://medium.com/@${config.medium.username}/aws-beginners-guide`,
            description: 'A comprehensive guide for beginners to get started with Amazon Web Services and cloud computing...',
            pubDate: 'November 30, 2024',
            author: config.personal.name,
            categories: ['AWS', 'Cloud Computing'],
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop'
          },
          {
            title: 'CI/CD with GitHub Actions & AWS: Automate Your Deployments',
            link: `https://medium.com/@${config.medium.username}/cicd-github-actions-aws`,
            description: 'Set up automated CI/CD pipelines using GitHub Actions and AWS services for seamless deployments...',
            pubDate: 'November 25, 2024',
            author: config.personal.name,
            categories: ['CI/CD', 'AWS', 'DevOps'],
            thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop'
          },
          {
            title: 'Docker vs Kubernetes: What\'s the Difference?',
            link: `https://medium.com/@${config.medium.username}/docker-vs-kubernetes`,
            description: 'Understanding the differences between Docker and Kubernetes and when to use each technology...',
            pubDate: 'November 20, 2024',
            author: config.personal.name,
            categories: ['Docker', 'Kubernetes', 'DevOps'],
            thumbnail: 'https://images.unsplash.com/photo-1624953587687-daf285da6e6b?w=400&h=250&fit=crop',
            image: 'https://images.unsplash.com/photo-1624953587687-daf285da6e6b?w=400&h=250&fit=crop'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const formatReadingTime = (description: string) => {
    const wordsPerMinute = 200
    const wordCount = description.split(' ').length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  return (
    <section id="blogs" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="main-title"
        >
          <h2>My <span>Blogs</span><span className="bg-text">my thoughts</span></h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto italic"
        >
          "Explore my blog for insights, tutorials, and tips on web development, cloud computing, and more. 
          Dive in and discover something new!"
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
              <span className="text-sm">Showing sample blogs. Update username in src/lib/config.ts to connect your Medium account.</span>
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
                className="blog card animate-pulse"
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
        ) : (
          <div className="blogs grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="blog group"
              >
                <div className="card h-full flex flex-col">
                  {/* Blog Image */}
                  <div className="image relative overflow-hidden rounded-lg mb-4">
                    {blog.thumbnail || blog.image ? (
                      <img 
                        src={blog.thumbnail || blog.image} 
                        alt={blog.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to gradient if image fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    {/* Fallback gradient if no image or image fails to load */}
                    <div className={`w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center ${blog.thumbnail || blog.image ? 'hidden' : ''}`}>
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                        {blog.title.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="blog-text flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {blog.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                      {blog.description}
                    </p>

                    {/* Blog Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{blog.pubDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{formatReadingTime(blog.description)}</span>
                      </div>
                    </div>

                    {/* Categories */}
                    {blog.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.categories.slice(0, 3).map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200 group/link"
                    >
                      Read More
                      <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={config.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
          >
            <ExternalLink size={20} />
            View All Blogs on Medium
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Blogs 