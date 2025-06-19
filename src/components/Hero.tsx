import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useParallax } from '../hooks/useParallax';

interface HeroProps {
  data: {
    name: string;
    headline: string;
    subtitle: string;
    social: {
      github: string;
      linkedin: string;
      email?: string;
    };
  };
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const scrollY = useParallax();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {data.headline}
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={400}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 flex items-center gap-3"
              >
                Hire Me
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-gray-600 hover:border-cyan-400 hover:bg-white/5"
              >
                View My Work
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={800}>
            <div className="flex justify-center gap-6">
              <a
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
              >
                <Github size={24} />
              </a>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${data.social.email}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 p-3 rounded-full hover:bg-white/10"
              >
                <Mail size={24} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};