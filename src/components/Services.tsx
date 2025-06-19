import React from 'react';
import { 
  Palette, 
  Code, 
  Search, 
  ShoppingCart, 
  Smartphone,
  CheckCircle
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { GlassCard } from './GlassCard';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface ServicesProps {
  services: Service[];
}

const iconMap = {
  Palette,
  Code,
  Search,
  ShoppingCart,
  Smartphone
};

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I provide comprehensive web development services to help your business thrive in the digital world.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <AnimatedSection
                key={service.id}
                animation="fadeInUp"
                delay={index * 100}
              >
                <GlassCard className="p-8 h-full group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-6 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-300">
                          <CheckCircle size={16} className="text-cyan-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};