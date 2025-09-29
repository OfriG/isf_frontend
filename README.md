# ISF Frontend Application

## Overview
This is the Next.js frontend application for the ISF project, built with modern React and styled with Tailwind CSS and SCSS.

## Technology Stack
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **SCSS/Sass** - CSS preprocessor
- **ESLint** - Code linting

## Project Structure
```
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   ├── functions/     # Utility functions
│   └── lib/           # Libraries and utilities
├── public/            # Static assets
└── styles/            # Global styles
```

## Setup and Installation

### Prerequisites
- Node.js (18.x or higher)
- npm or yarn
- ISF Backend API running (see backend repository)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features

### Components
- **Header** - Responsive navigation with desktop and mobile variants
- **Logo** - Dynamic logo fetched from Strapi CMS
- **Footer** - Site footer component

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS Modules** - Component-specific styling
- **Responsive Design** - Mobile-first approach

### API Integration
- **Strapi Client** - Custom API client for backend communication
- **Dynamic Content** - Content fetched from Strapi CMS
- **Image Optimization** - Next.js Image component with Strapi integration

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_STRAPI_URL` | Backend API URL | `http://localhost:1337` |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | `http://localhost:3000` |

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deployment Platforms
This application can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **Any Node.js hosting platform**

## Backend Integration
This frontend connects to the ISF Strapi backend. Make sure the backend is running and the `NEXT_PUBLIC_STRAPI_URL` environment variable points to the correct backend URL.

## Performance Features
- **Turbopack** - Fast bundler for development
- **Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic code splitting with Next.js
- **Static Generation** - ISR (Incremental Static Regeneration) where applicable

## Support
For support and questions, please refer to the [Next.js documentation](https://nextjs.org/docs).
