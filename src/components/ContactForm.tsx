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
              <GlassCard className="p-8 md:p-12">
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
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                          Project Type *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                        >
                          <option value="">Select project type</option>
                          <option value="Business Website">Business Website</option>
                          <option value="E-Commerce Store">E-Commerce Store</option>
                          <option value="Portfolio Website">Portfolio Website</option>
                          <option value="Blog Website">Blog Website</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="Web Application">Web Application</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Custom Software">Custom Software</option>
                          <option value="API Development">API Development</option>
                          <option value="Database Design">Database Design</option>
                          <option value="Website Redesign">Website Redesign</option>
                          <option value="Website Maintenance">Website Maintenance</option>
                          <option value="SEO Optimization">SEO Optimization</option>
                          <option value="Performance Optimization">Performance Optimization</option>
                          <option value="Security Audit">Security Audit</option>
                          <option value="Third-party Integration">Third-party Integration</option>
                          <option value="CMS Development">CMS Development</option>
                          <option value="WordPress Development">WordPress Development</option>
                          <option value="Shopify Development">Shopify Development</option>
                          <option value="React Development">React Development</option>
                          <option value="Vue.js Development">Vue.js Development</option>
                          <option value="Node.js Development">Node.js Development</option>
                          <option value="Python Development">Python Development</option>
                          <option value="Full-Stack Development">Full-Stack Development</option>
                          <option value="Frontend Development">Frontend Development</option>
                          <option value="Backend Development">Backend Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Logo Design">Logo Design</option>
                          <option value="Branding">Branding</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="Social Media Management">Social Media Management</option>
                          <option value="Content Writing">Content Writing</option>
                          <option value="Technical Writing">Technical Writing</option>
                          <option value="Code Review">Code Review</option>
                          <option value="Technical Consultation">Technical Consultation</option>
                          <option value="Training & Mentoring">Training & Mentoring</option>
                          <option value="Project Management">Project Management</option>
                          <option value="Quality Assurance">Quality Assurance</option>
                          <option value="Testing Services">Testing Services</option>
                          <option value="DevOps Services">DevOps Services</option>
                          <option value="Cloud Services">Cloud Services</option>
                          <option value="Hosting Setup">Hosting Setup</option>
                          <option value="Domain Management">Domain Management</option>
                          <option value="Email Setup">Email Setup</option>
                          <option value="Analytics Setup">Analytics Setup</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="Under $1,000">Under $1,000</option>
                          <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000+">$100,000+</option>
                          <option value="Discuss">Let's Discuss</option>
                        </select>
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