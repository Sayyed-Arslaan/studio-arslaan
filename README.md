# Modern Portfolio Website  By Sayyed Arslaan 

A stunning, production-ready dark-themed portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🌙 Modern dark theme with neon blue/violet highlights
- ✨ Glassmorphism design with backdrop blur effects
- 🎭 Smooth parallax scrolling and entrance animations
- 📱 Fully responsive design
- 🎨 Interactive hover effects and micro-animations
- 🚀 Performance optimized
- 📊 SEO friendly
- 🔧 Easy content management through JSON

## Content Management

All website content is managed through the `src/data/data.json` file. This serves as your content management system, allowing you to update:

- Personal information (name, bio, contact details)
- Skills and technologies
- Services offered
- Portfolio projects
- Testimonials
- Social media links

### How to Update Content

1. **Edit the data.json file**: Navigate to `src/data/data.json`
2. **Update any section**: Modify the JSON structure to change content
3. **Save the file**: Changes will be reflected immediately in development
4. **Deploy**: Push changes to your repository to update the live site

### Content Structure

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "headline": "Your Headline",
    "subtitle": "Your Subtitle",
    "bio": "Your Bio",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "profileImage": "https://your-image-url.com/image.jpg"
  },
  "skills": ["React", "Node.js", "TypeScript", "..."],
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername",
    "instagram": "https://instagram.com/yourusername"
  },
  "services": [...],
  "projects": [...],
  "testimonials": [...]
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Update the base URL in `vite.config.ts` if needed

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

## Customization

### Colors
Update the color scheme in `tailwind.config.js` and `src/index.css`:
- Primary: Cyan (#00d4ff)
- Secondary: Purple (#8b5cf6)
- Background: Gray-900 (#111827)

### Fonts
The website uses Inter font by default. To change:
1. Update the Google Fonts import in `index.html`
2. Modify the font-family in `src/index.css`

### Animations
Customize animations in `src/components/AnimatedSection.tsx` and `src/index.css`

## Performance

- Lazy loading for images
- Code splitting with React.lazy()
- Optimized bundle size
- Efficient re-renders with React hooks
- GPU-accelerated animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!
