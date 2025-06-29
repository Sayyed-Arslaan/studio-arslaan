import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OptimizedParticleBackground } from './components/OptimizedParticleBackground';
import portfolioData from './data/data.json';

// Lazy load the contact page
const ContactPage = lazy(() => import('./pages/Contact').then(module => ({ default: module.ContactPage })));

interface PortfolioData {
  personal: {
    name: string;
    title: string;
    headline: string;
    subtitle: string;
    bio: string;
    email: string;
    phone: string;
    profileImage: string;
  };
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  services: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    features: string[];
  }>;
  projects: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    link: string;
    github: string;
  }>;
  testimonials: Array<{
    id: number;
    name: string;
    position: string;
    content: string;
    rating: number;
    image: string;
  }>;
}

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

const HomePage: React.FC<{ data: PortfolioData }> = React.memo(({ data }) => (
  <>
    <Hero 
      data={{
        name: data.personal.name,
        headline: data.personal.headline,
        subtitle: data.personal.subtitle,
        social: {
          github: data.social.github,
          linkedin: data.social.linkedin,
          email: data.personal.email
        }
      }} 
    />
    
    <Services services={data.services} />
    
    <Portfolio projects={data.projects} />
    
    <About 
      data={{
        name: data.personal.name,
        bio: data.personal.bio,
        profileImage: data.personal.profileImage
      }}
      skills={data.skills}
    />
    
    <Testimonials testimonials={data.testimonials} />
    
    <Contact 
      data={{
        email: data.personal.email,
        phone: data.personal.phone,
        social: data.social
      }}
    />
  </>
));

HomePage.displayName = 'HomePage';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use imported data instead of fetch
    try {
      setData(portfolioData as PortfolioData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update document title
    if (data?.personal?.name) {
      document.title = `${data.personal.name} - ${data.personal.title}`;
    }

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);

    return () => {
      document.head.removeChild(preloadLink);
    };
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Error loading portfolio data</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        {/* Optimized Particle Background */}
        <OptimizedParticleBackground />
        
        <Routes>
          <Route path="/contact" element={
            <Suspense fallback={<LoadingSpinner />}>
              <ContactPage />
            </Suspense>
          } />
          <Route path="/" element={
            <>
              {/* Navigation */}
              <Navigation />
              
              {/* Main Content */}
              <main className="relative z-10">
                <HomePage data={data} />
              </main>
              
              {/* Footer */}
              <Footer 
                data={{
                  name: data.personal.name,
                  social: data.social
                }}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;