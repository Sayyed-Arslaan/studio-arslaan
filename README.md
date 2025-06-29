# Modern Portfolio Website By Sayyed Arslaan 

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
- 📧 Professional contact form with Google Sheets integration
- ⚡ Lightning-fast loading with advanced optimizations

## Contact Form Setup

The website includes a professional contact form that integrates with Google Sheets for automatic data collection and email notifications.

### Google Apps Script Setup

1. **Create a Google Apps Script project**:
   - Go to [Google Apps Script](https://script.google.com/)
   - Click "New Project"
   - Name it "Portfolio Contact Form"
   - Replace the default code with the script from `src/scripts/google-apps-script.js`

2. **Create a Google Sheet**:
   - Create a new Google Sheet for storing form submissions
   - Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Replace `YOUR_SHEET_ID_HERE` in the script with your actual Sheet ID

3. **Deploy the script**:
   - Save the script (Ctrl+S)
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set execute permissions to "Anyone"
   - Click "Deploy" and copy the web app URL

4. **Update the contact form**:
   - Open `src/components/ContactForm.tsx`
   - Replace `YOUR_SCRIPT_ID` in the GOOGLE_SCRIPT_URL with your script ID

5. **Configure email notifications** (optional):
   - In the Google Apps Script, replace `arslaan.developer@gmail.com` with your email
   - You'll receive email notifications for each form submission

### Form Features

- **Professional Design**: Beautiful, responsive form matching the website aesthetic
- **Comprehensive Fields**: Name, email, phone, company, project type, budget, timeline, and message
- **Real-time Validation**: Client-side validation for required fields and email format
- **Status Feedback**: Loading, success, and error states with clear messaging
- **Google Sheets Integration**: Automatic data export with timestamp and status tracking
- **Email Notifications**: Optional email alerts for new submissions
- **Mobile Optimized**: Perfect experience on all devices
- **Accessibility**: Full keyboard navigation and screen reader support

### Accessing the Contact Form

- **Dedicated Page**: Click "Contact" in navigation to access the full contact form at `/contact`
- **Quick Contact**: Basic contact information available on the homepage
- **Back Navigation**: Easy return to homepage from contact page

### Data Management

The Google Sheet automatically organizes submissions with:
- Timestamp
- Contact information (name, email, phone, company)
- Project details (type, budget, timeline)
- Message content
- Source tracking
- Status management (New/Read)

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

## Performance Optimizations

This portfolio is built with performance in mind:

- **Lazy Loading**: Images and components load only when needed
- **Code Splitting**: Automatic route-based code splitting
- **Optimized Bundles**: Vendor, router, and icon chunks separated
- **Image Optimization**: Progressive loading with blur placeholders
- **Particle Optimization**: Adaptive particle count based on screen size
- **Service Worker**: Caching for offline functionality
- **Critical CSS**: Inlined for faster first paint
- **Font Optimization**: Preloaded fonts with display swap

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!