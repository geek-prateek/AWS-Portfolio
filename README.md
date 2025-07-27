# AWS Portfolio - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, dynamic blog integration with Medium, and GitHub project integration.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Fully responsive design for all devices
- **Dynamic Blog Integration**: Automatically fetches and displays your latest Medium blog posts
- **GitHub Integration**: Fetches and displays your latest repositories and starred projects
- **Floating Navigation**: Modern floating controls for easy section navigation
- **Particle Effects**: Animated background particles in hero section
- **Lottie Animations**: Professional animations for enhanced UX
- **SEO Optimized**: Built with Next.js for excellent SEO performance

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Blog Integration**: Medium RSS Feed API
- **Project Integration**: GitHub REST API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aws-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your personal information**
   
   Edit `src/lib/config.ts` to update your personal details:
   ```typescript
   export const config = {
     medium: {
       username: 'your-medium-username', // Replace with your Medium username
       maxPosts: 6,
     },
     github: {
       username: 'your-github-username', // Replace with your GitHub username
       token: process.env.GITHUB_TOKEN || '', // Optional: GitHub token
       maxRepos: 6,
       includeStarred: true,
       maxStarred: 3,
     },
     personal: {
       name: 'Your Name',
       title: 'Your Title',
       email: 'your.email@example.com',
       // ... other details
     },
     social: {
       linkedin: 'https://linkedin.com/in/yourusername',
       github: 'https://github.com/yourusername',
       // ... other social links
     }
   }
   ```

4. **Optional: Set up GitHub token (recommended)**
   
   Create a `.env.local` file in the root directory:
   ```env
   GITHUB_TOKEN=your_github_token_here
   ```
   
   Get your GitHub token from: https://github.com/settings/tokens
   
   Benefits of using a token:
   - Higher API rate limits (5000 requests/hour vs 60 for unauthenticated)
   - Access to private repositories (if needed)
   - Better reliability for production deployments

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Medium Blog Integration

The portfolio automatically fetches and displays your latest Medium blog posts. Here's how to set it up:

### Setup Instructions

1. **Find your Medium username**
   - Go to your Medium profile
   - Your username is in the URL: `https://medium.com/@your-username`

2. **Update the configuration**
   - Open `src/lib/config.ts`
   - Replace `'your-medium-username'` with your actual Medium username
   ```typescript
   medium: {
     username: 'your-actual-medium-username',
     maxPosts: 6, // Number of posts to display
   }
   ```

3. **Test the integration**
   - The blog section will automatically fetch your latest posts
   - If there's an error, it will show sample blogs with a warning message
   - Check the browser console for any API errors

## 🐙 GitHub Project Integration

The portfolio automatically fetches and displays your GitHub repositories and starred projects. Here's how to set it up:

### Setup Instructions

1. **Find your GitHub username**
   - Go to your GitHub profile
   - Your username is in the URL: `https://github.com/your-username`

2. **Update the configuration**
   - Open `src/lib/config.ts`
   - Replace `'your-github-username'` with your actual GitHub username
   ```typescript
   github: {
     username: 'your-actual-github-username',
     token: process.env.GITHUB_TOKEN || '', // Optional but recommended
     maxRepos: 6, // Number of repositories to display
     includeStarred: true, // Include starred repositories
     maxStarred: 3, // Number of starred repositories to display
   }
   ```

3. **Optional: Set up GitHub token**
   - Create a `.env.local` file in the root directory
   - Add your GitHub token: `GITHUB_TOKEN=your_token_here`
   - Get your token from: https://github.com/settings/tokens

4. **Test the integration**
   - The projects section will automatically fetch your repositories
   - Switch between "My Repositories" and "Starred" tabs
   - If there's an error, it will show sample projects with a warning

### Features

- **Repository Display**: Shows your latest repositories with stats
- **Starred Projects**: Displays projects you've starred
- **Language Indicators**: Color-coded language badges
- **Project Stats**: Stars, forks, and last updated date
- **Topics/Tags**: Shows repository topics as tags
- **Direct Links**: Links to repository and demo (if available)
- **Fork Filtering**: Excludes forked repositories by default

## 🎨 Customization Guide

### Personal Information
Update your details in `src/lib/config.ts`:
- Name, title, contact information
- Social media links
- Education and experience details

### Styling
- **Colors**: Modify the primary color palette in `tailwind.config.ts`
- **Dark Mode**: All components support dark mode automatically
- **Animations**: Customize animations in `src/app/globals.css`

### Content
- **Hero Section**: Update in `src/components/Hero.tsx`
- **About Section**: Modify `src/components/About.tsx`
- **Skills**: Edit skills and percentages in `src/components/Skills.tsx`
- **Experience**: Modify timeline in `src/components/Experience.tsx`

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and dark mode
│   ├── layout.tsx           # Root layout component
│   └── page.tsx            # Main page component
├── components/
│   ├── Hero.tsx            # Hero section with animations
│   ├── About.tsx           # About section with stats
│   ├── Skills.tsx          # Skills and progress bars
│   ├── Projects.tsx        # GitHub project integration
│   ├── Blogs.tsx           # Medium blog integration
│   ├── Experience.tsx      # Work experience timeline
│   ├── Contact.tsx         # Contact form and info
│   ├── Footer.tsx          # Footer component
│   ├── Controls.tsx        # Floating navigation
│   └── ThemeToggle.tsx     # Dark mode toggle
└── lib/
    └── config.ts           # Configuration file
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Your site will be live at `https://your-project.vercel.app`

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add `GITHUB_TOKEN` with your GitHub token value

### Other Platforms

- **Netlify**: Use the Next.js build command
- **AWS Amplify**: Connect your repository
- **DigitalOcean App Platform**: Deploy with ease

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Medium](https://medium.com/) for the blog platform integration
- [GitHub](https://github.com/) for the project integration API

---

**Happy coding! 🚀** 