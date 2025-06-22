import React from 'react';
import { User, Award, Coffee, Heart } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { GlassCard } from './GlassCard';

interface AboutProps {
  data: {
    name: string;
    bio: string;
    profileImage: string;
  };
  skills: string[];
}

export const About: React.FC<AboutProps> = ({ data, skills }) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get to know the person behind the code and discover my journey in web development.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <AnimatedSection animation="fadeInLeft">
            <GlassCard className="p-8 text-center lg:text-left">
              <div className="mb-8">
                <img
                  src={data.profileImage}
                  alt={data.name}
                  className="w-48 h-48 rounded-full mx-auto lg:mx-0 object-cover border-4 border-gradient-to-r from-cyan-400 to-purple-500 shadow-2xl"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{data.name}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {data.bio}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <User className="text-white" size={20} />
                  </div>
                  <p className="text-sm text-gray-300">2+ Years</p>
                  <p className="text-xs text-gray-400">Experience</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Award className="text-white" size={20} />
                  </div>
                  <p className="text-sm text-gray-300">50+</p>
                  <p className="text-xs text-gray-400">Projects</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Coffee className="text-white" size={20} />
                  </div>
                  <p className="text-sm text-gray-300">1000+</p>
                  <p className="text-xs text-gray-400">Cups of Coffee</p>
                </div>
              </div>
            </GlassCard>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection animation="fadeInRight">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Heart className="text-cyan-400 mr-3" size={24} />
                Technologies I Love
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <AnimatedSection
                    key={index}
                    animation="scaleIn"
                    delay={index * 50}
                  >
                    <div className="bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-lg p-4 text-center border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group hover:scale-105">
                      <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};