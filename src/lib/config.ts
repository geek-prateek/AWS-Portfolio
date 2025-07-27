// Configuration file for portfolio customization
export const config = {
  // Medium Blog Configuration
  medium: {
    username: 'prateek.dbg', // Replace with your actual Medium username
    rssUrl: 'https://medium.com/feed/@prateek.dbg', // Will be auto-generated
    maxPosts: 6, // Number of latest posts to display
  },
  
  // GitHub Configuration
  github: {
    username: 'geek-prateek', // Replace with your GitHub username
    token: process.env.GITHUB_TOKEN || '', // Optional: GitHub token for higher rate limits
    maxRepos: 6, // Number of latest repositories to display
  },
  
  // Personal Information
  personal: {
    name: 'Prateek Kumar',
    title: 'Software Developer',
    email: 'techie.intellipaat@gmail.com',
    phone: '+91 84958 58745',
    location: 'Bangalore, India',
    education: 'Oxford University',
    languages: 'English, Spanish, Hindi',
  },
  
  // Social Links
  social: {
    linkedin: 'https://linkedin.com/in/yourusername',
    github: 'https://github.com/geek-prateek',
    twitter: 'https://twitter.com/yourusername',
    youtube: 'https://youtube.com/yourusername',
    medium: 'https://medium.com/@prateek.dbg',
  },
  
  // Portfolio Settings
  portfolio: {
    showBlogs: true,
    showProjects: true,
    showSkills: true,
    showExperience: true,
  }
}

// Auto-generate Medium RSS URL
config.medium.rssUrl = `https://medium.com/feed/@${config.medium.username}` 