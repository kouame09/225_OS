<div align="center">
  <img width="1200" height="475" alt="225 Open Source Banner" src="./public/banner.png" />

  
  # 225 Open Source
  
  **The #1 Open Source Community Platform for Côte d'Ivoire**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.39.7-green.svg)](https://supabase.com/)
  
  [Live Demo](https://225opensource.com) • [Report Bug](https://github.com/princekouame/225opensource/issues) • [Request Feature](https://github.com/princekouame/225opensource/issues)
</div>

---

## 🌍 About The Project

**225 Open Source** is a centralized platform showcasing open source projects built by developers in Côte d'Ivoire. While GitHub is the world's largest open source platform, it lacks a crucial feature: **filtering projects by country**. That's where we come in.

### The Problem We Solve

- **No Country Filter on GitHub**: Impossible to easily discover open source projects created by Ivorian developers
- **Limited Visibility**: Ivorian talents remain hidden in the global ocean of open source projects
- **Fragmented Collaboration**: Difficult for Ivorian developers to find each other and collaborate

### Our Solution

- **Smart Centralization**: We aggregate Ivorian open source projects from GitHub
- **Country Filtering**: Instant access to all open source projects created in Côte d'Ivoire
- **Unified Community**: A central space to discover, contribute, and collaborate with local talents

---

## ✨ Features

- 🔍 **Project Discovery**: Browse and search open source projects from Ivorian developers
- 🎯 **Smart Filtering**: Filter by technology, category, and popularity
- 👤 **User Profiles**: Showcase your projects and contributions
- ⭐ **Favorites System**: Save and track projects you're interested in
- 🌓 **Dark Mode**: Beautiful UI with light and dark themes
- 🔐 **Secure Authentication**: Powered by Supabase with location-based access control
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile
- 🌐 **Geolocation Restriction**: Platform accessible only from Côte d'Ivoire

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/princekouame/225opensource.git
   cd 225opensource
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Then update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Language**: TypeScript 5.8.2
- **Routing**: React Router DOM 6.22.3
- **Styling**: Vanilla CSS with Tailwind-inspired utilities
- **Icons**: Lucide React 0.344.0
- **Backend**: Supabase 2.39.7
- **Build Tool**: Vite 6.2.0
- **Deployment**: Vercel / Netlify

---

## 📁 Project Structure

```
225OS/
├── components/          # Reusable UI components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Footer.tsx      # Site footer
│   ├── Navbar.tsx      # Navigation bar
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Dashboard.tsx   # User dashboard
│   ├── AddProject.tsx  # Add project form
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   └── projectService.ts
├── utils/              # Utility functions
│   ├── location.ts     # Geolocation check
│   └── slugify.ts      # URL slug generator
├── lib/                # Third-party configurations
│   └── supabaseClient.ts
└── public/             # Static assets
```

---

## 🔐 Authentication & Security

- **Supabase Authentication**: Email/password and OAuth (GitHub)
- **Location-Based Access**: Platform restricted to users in Côte d'Ivoire using IP geolocation
- **Row Level Security**: Supabase RLS policies for data protection
- **Secure Sessions**: JWT-based authentication

---

## 🌟 Key Features Explained

### Location Restriction
The platform uses IP geolocation (via `ipapi.co`) to verify that users are accessing from Côte d'Ivoire. If not, authentication buttons are disabled with a clear message.

### Project Showcase
Users can add their GitHub projects with:
- Project name, description, and repository URL
- Technology tags
- Category classification
- Automatic GitHub stats fetching

### Community Features
- Browse all projects from Ivorian developers
- Filter by technology stack
- Save favorites for later
- View project details and contributors

---

## 🤝 Contributing

We welcome contributions from the Ivorian tech community! Here's how you can help:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Prince Kouamé**

- Website: [princekouame.com](https://www.princekouame.com)
- GitHub: [@princekouame](https://github.com/princekouame)
- LinkedIn: [Prince Kouamé](https://linkedin.com/in/princekouame)

---

## 🙏 Acknowledgments

- All Ivorian developers contributing to open source
- The Supabase team for their amazing platform
- The React and Vite communities
- Everyone supporting the African tech ecosystem

---

## 📊 Project Stats

- **500+** Tech Talents
- **120+** Open Source Projects
- **50+** Startups Represented

---

## 🎯 Our Mission

> "To make Côte d'Ivoire a recognized hub of open-source innovation, proving that African developers are not just participants in the global tech ecosystem—we are leaders, creators, and pioneers."

---

## Principal developer

- **Prince Kouamé**
- **Email**: [princekouame@gmail.com](mailto:princekouame@gmail.com)
- **LinkedIn**: [Prince Kouamé](https://www.linkedin.com/in/princekouame/)

