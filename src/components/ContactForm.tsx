import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { GlassCard } from './GlassCard';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    budget: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  // Replace this URL with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields including phone number.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid phone number.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending your message...'
    });

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value || '');
      });
      formDataToSend.append('timestamp', new Date().toISOString());
      formDataToSend.append('source', 'Portfolio Website Contact Form');

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.'
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          company: '',
          budget: ''
        });
      } else {
        throw new Error('Failed to send message');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly at arslaan.developer@gmail.com'
      });
    }
  };

  const resetStatus = () => {
    setStatus({ type: 'idle', message: '' });
  };

  const openGmail = () => {
    window.open('https://mail.google.com/mail/?view=cm&to=arslaan.developer@gmail.com', '_blank');
  };

  return (
    <section className="py-20 relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <AnimatedSection animation="fadeInUp">
          <button
            onClick={() => navigate('/')}
            className="mb-8 flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </button>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <AnimatedSection animation="fadeInLeft">
              <div className="sticky top-24">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Let's Work Together
                  </span>
                </h1>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Ready to bring your project to life? I'm here to help you create something amazing. 
                  Fill out the form and I'll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <button 
                        onClick={openGmail}
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                      >
                        arslaan.developer@gmail.com
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Phone</h3>
                      <p className="text-gray-300">Available on request</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Location</h3>
                      <p className="text-gray-300">Available Worldwide</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-400/20">
                  <h3 className="text-cyan-400 font-semibold mb-2">Response Time</h3>
                  <p className="text-gray-300 text-sm">
                    I typically respond to all inquiries within 24 hours. For urgent projects, 
                    please mention it in your message.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="fadeInRight" delay={200}>
              <GlassCard className="p-8 md:p-12 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Message */}
                  {status.type !== 'idle' && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      status.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                      status.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                      'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}>
                      {status.type === 'loading' && <Loader className="animate-spin" size={20} />}
                      {status.type === 'success' && <CheckCircle size={20} />}
                      {status.type === 'error' && <AlertCircle size={20} />}
                      <span className="flex-1">{status.message}</span>
                      {status.type !== 'loading' && (
                        <button
                          type="button"
                          onClick={resetStatus}
                          className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                    <div className="space-y-6">
                      <div className="relative z-50">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          Project Type *
                        </label>
                        <div className="relative">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all duration-300 appearance-none cursor-pointer relative z-50"
                            style={{ 
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.5em 1.5em'
                            }}
                          >
                            <option value="" className="bg-gray-800 text-gray-300">Select project type</option>
                            <option value="Business Website" className="bg-gray-800 text-white">Business Website</option>
                            <option value="E-Commerce Store" className="bg-gray-800 text-white">E-Commerce Store</option>
                            <option value="Portfolio Website" className="bg-gray-800 text-white">Portfolio Website</option>
                            <option value="Blog Website" className="bg-gray-800 text-white">Blog Website</option>
                            <option value="Landing Page" className="bg-gray-800 text-white">Landing Page</option>
                            <option value="Web Application" className="bg-gray-800 text-white">Web Application</option>
                            <option value="Mobile App" className="bg-gray-800 text-white">Mobile App</option>
                            <option value="Custom Software" className="bg-gray-800 text-white">Custom Software</option>
                            <option value="API Development" className="bg-gray-800 text-white">API Development</option>
                            <option value="Database Design" className="bg-gray-800 text-white">Database Design</option>
                            <option value="Website Redesign" className="bg-gray-800 text-white">Website Redesign</option>
                            <option value="Website Maintenance" className="bg-gray-800 text-white">Website Maintenance</option>
                            <option value="SEO Optimization" className="bg-gray-800 text-white">SEO Optimization</option>
                            <option value="Performance Optimization" className="bg-gray-800 text-white">Performance Optimization</option>
                            <option value="Security Audit" className="bg-gray-800 text-white">Security Audit</option>
                            <option value="Third-party Integration" className="bg-gray-800 text-white">Third-party Integration</option>
                            <option value="CMS Development" className="bg-gray-800 text-white">CMS Development</option>
                            <option value="WordPress Development" className="bg-gray-800 text-white">WordPress Development</option>
                            <option value="Shopify Development" className="bg-gray-800 text-white">Shopify Development</option>
                            <option value="React Development" className="bg-gray-800 text-white">React Development</option>
                            <option value="Vue.js Development" className="bg-gray-800 text-white">Vue.js Development</option>
                            <option value="Node.js Development" className="bg-gray-800 text-white">Node.js Development</option>
                            <option value="Python Development" className="bg-gray-800 text-white">Python Development</option>
                            <option value="Full-Stack Development" className="bg-gray-800 text-white">Full-Stack Development</option>
                            <option value="Frontend Development" className="bg-gray-800 text-white">Frontend Development</option>
                            <option value="Backend Development" className="bg-gray-800 text-white">Backend Development</option>
                            <option value="UI/UX Design" className="bg-gray-800 text-white">UI/UX Design</option>
                            <option value="Graphic Design" className="bg-gray-800 text-white">Graphic Design</option>
                            <option value="Logo Design" className="bg-gray-800 text-white">Logo Design</option>
                            <option value="Branding" className="bg-gray-800 text-white">Branding</option>
                            <option value="Digital Marketing" className="bg-gray-800 text-white">Digital Marketing</option>
                            <option value="Social Media Management" className="bg-gray-800 text-white">Social Media Management</option>
                            <option value="Content Writing" className="bg-gray-800 text-white">Content Writing</option>
                            <option value="Technical Writing" className="bg-gray-800 text-white">Technical Writing</option>
                            <option value="Code Review" className="bg-gray-800 text-white">Code Review</option>
                            <option value="Technical Consultation" className="bg-gray-800 text-white">Technical Consultation</option>
                            <option value="Training & Mentoring" className="bg-gray-800 text-white">Training & Mentoring</option>
                            <option value="Project Management" className="bg-gray-800 text-white">Project Management</option>
                            <option value="Quality Assurance" className="bg-gray-800 text-white">Quality Assurance</option>
                            <option value="Testing Services" className="bg-gray-800 text-white">Testing Services</option>
                            <option value="DevOps Services" className="bg-gray-800 text-white">DevOps Services</option>
                            <option value="Cloud Services" className="bg-gray-800 text-white">Cloud Services</option>
                            <option value="Hosting Setup" className="bg-gray-800 text-white">Hosting Setup</option>
                            <option value="Domain Management" className="bg-gray-800 text-white">Domain Management</option>
                            <option value="Email Setup" className="bg-gray-800 text-white">Email Setup</option>
                            <option value="Analytics Setup" className="bg-gray-800 text-white">Analytics Setup</option>
                            <option value="Other" className="bg-gray-800 text-white">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative z-40">
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all duration-300 appearance-none cursor-pointer relative z-40"
                            style={{ 
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: 'right 0.5rem center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: '1.5em 1.5em'
                            }}
                          >
                            <option value="" className="bg-gray-800 text-gray-300">Select budget range</option>
                            <option value="Under $1,000" className="bg-gray-800 text-white">Under $1,000</option>
                            <option value="$1,000 - $5,000" className="bg-gray-800 text-white">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000" className="bg-gray-800 text-white">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000" className="bg-gray-800 text-white">$10,000 - $25,000</option>
                            <option value="$25,000 - $50,000" className="bg-gray-800 text-white">$25,000 - $50,000</option>
                            <option value="$50,000 - $100,000" className="bg-gray-800 text-white">$50,000 - $100,000</option>
                            <option value="$100,000+" className="bg-gray-800 text-white">$100,000+</option>
                            <option value="Discuss" className="bg-gray-800 text-white">Let's Discuss</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Project Description *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-vertical"
                          placeholder="Tell me about your project, goals, and any specific requirements..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      disabled={status.type === 'loading'}
                      className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                    >
                      {status.type === 'loading' ? (
                        <>
                          <Loader className="animate-spin" size={20} />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};