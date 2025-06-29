import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { GlassCard } from './GlassCard';
import { LazyImage } from './LazyImage';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = useMemo(() => testimonials[currentIndex], [testimonials, currentIndex]);

  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <GlassCard className="p-8 md:p-12 relative">
              <Quote className="absolute top-6 left-6 text-cyan-400/30" size={48} />
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic">
                  "{currentTestimonial.content}"
                </p>
                
                <div className="flex items-center justify-center">
                  <LazyImage
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-cyan-400/30"
                  />
                  <div className="text-left">
                    <h4 className="text-white font-semibold">{currentTestimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{currentTestimonial.position}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};