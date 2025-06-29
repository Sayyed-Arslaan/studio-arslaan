import React from 'react';
import { Navigation } from '../components/Navigation';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { ParticleBackground } from '../components/ParticleBackground';
import portfolioData from '../data/data.json';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10 pt-16">
        <ContactForm />
      </main>
      
      {/* Footer */}
      <Footer 
        data={{
          name: portfolioData.personal.name,
          social: portfolioData.social
        }}
      />
    </div>
  );
};