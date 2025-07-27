export async function loadJsonData<T>(filePath: string): Promise<T> {
  try {
    // Ensure the path starts with /data/ for public directory access
    const fullPath = filePath.startsWith('/data/') ? filePath : `/data/${filePath}`
    const response = await fetch(fullPath)
    if (!response.ok) {
      throw new Error(`Failed to load data from ${fullPath}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error loading data from ${filePath}:`, error)
    throw error
  }
}

// Type definitions for our data structures
export interface PersonalData {
  name: string
  title: string
  description: string
  profileImage?: string // optional profile image
  location: string
  email: string
  phone: string
  education: string
  languages: string
  social: {
    github: string
    linkedin: string
    twitter: string
    youtube: string
  }
  cv: {
    downloadUrl: string
    buttonText: string
  }
}

export interface AboutData {
  stats: Array<{
    number: string
    text: string
  }>
  aboutText: string
  cv?: {
    downloadUrl: string
    buttonText: string
  }
  skills: Array<{
    name: string
    percentage: number
  }>
  timeline: Array<{
    duration: string
    title: string
    company: string
    description: string
  }>
}

export interface ExperienceData {
  experiences: Array<{
    id: number
    title: string
    company: string
    location: string
    period: string
    description: string
    achievements: string[]
    technologies: string[]
  }>
  education: Array<{
    title: string
    institution: string
    period: string
    description: string
  }>
}

export interface ContactData {
  contactInfo: Array<{
    icon: string
    title: string
    value: string
    link?: string
  }>
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    youtube?: string
    [key: string]: string | undefined // allow additional social fields like LinkTree
  }
  form: {
    title: string
    description: string
    successMessage: string
  }
} 