import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useLenis from '@/hooks/useLenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useLenis();
  const pageRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.contact-hero > *',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Contact info cards
      gsap.fromTo('.contact-info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info-section',
            start: 'top 80%',
          },
        }
      );

      // Form animation
      gsap.fromTo('.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'arkhiveinnovations@gmail.com',
      description: 'We respond as soon as possible',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 72049 96364 | +91 80885 22218',
      description: 'Mon-Sat 9am-6pm IST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Bengaluru',
      description: 'BTM Layout Stage 1',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: '9:00 AM - 6:00 PM',
      description: 'Monday to Friday',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-background noise-overlay">
      <Navbar />
      
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="contact-hero max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
              Get in Touch
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Let's Start Your{' '}
              <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="contact-info-section lg:col-span-2 space-y-6">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground font-body">
                  Reach out through any of these channels and we'll get back to you promptly.
                </p>
              </div>
              
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="contact-info-card p-6 rounded-2xl bg-gradient-card border border-border/50 flex items-start gap-4 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold mb-1">{item.title}</h3>
                    <p className="text-foreground font-body">{item.content}</p>
                    <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="contact-form p-8 md:p-10 rounded-3xl bg-gradient-card border border-border/50">
                <h2 className="font-display text-2xl font-bold mb-8">Send Us a Message</h2>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 font-body">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 font-body">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2 font-body">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2 font-body">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Application</option>
                      <option value="cloud">Digital Marketing</option>
                      <option value="ai">AI & Tools</option>
                      <option value="design">Graphic Designing</option>
                      <option value="security">WordPress Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 font-body">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-primary rounded-full text-primary-foreground font-display font-bold text-lg transition-all duration-300 hover:shadow-glow hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-card border border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Prefer a Quick Chat?
              </h2>
              <p className="text-muted-foreground font-body mb-8">
                Schedule a free 30-minute consultation call with our team.
              </p>
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-foreground font-display font-bold transition-all duration-300 hover:bg-primary/10 group">
                Book a Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
