import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { GlassCard } from './GlassCard';

interface ContactProps {
  data: {
    email: string;
    phone: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      instagram: string;
    };
  };
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const openGmail = () => {
    window.open('https://mail.google.com/mail/?view=cm&to=arslaan.developer@gmail.com', '_blank');
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your project to life? Let's discuss how we can work together to create something amazing.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={200}>
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Email</h3>
                <button 
                  onClick={openGmail}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  {data.email}
                </button>
              </GlassCard>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeInUp" delay={400}>
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Phone</h3>
                <a 
                  href={`tel:${data.phone}`}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {data.phone}
                </a>
              </GlassCard>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeInUp" delay={600}>
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Location</h3>
                <p className="text-gray-300">Available Worldwide</p>
              </GlassCard>
            </AnimatedSection>
          </div>
          
          <AnimatedSection animation="fadeInUp" delay={800} className="mt-12">
            <GlassCard className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex justify-center gap-6">
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};