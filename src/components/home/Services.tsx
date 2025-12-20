import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Cloud, Brain, ArrowRight, Palette, Shield, Megaphone, TrendingUp, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile Application',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven digital marketing solutions designed to scale brands and accelerate business growth.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Brain,
    title: 'AI & Tools',
    description: 'Intelligent systems and automation powered by advanced AI algorithms.',
    color: 'from-orange-500 to-amber-400',
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Beautiful, intuitive interfaces designed to engage and convert users.',
    color: 'from-pink-500 to-rose-400',
  },
  {
    icon: Globe,
    title: 'WordPress Development',
    description: 'Custom, fast, and scalable WordPress websites tailored for modern businesses.',
    color: 'from-red-500 to-orange-400',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo('.services-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 85%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Solutions That Drive{' '}
            <span className="text-gradient">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            We deliver comprehensive IT solutions tailored to transform your business and accelerate growth in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-8 rounded-2xl bg-gradient-card border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-hover overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative text-muted-foreground font-body mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Link */}
              <Link
                to="/services"
                className="relative inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-foreground font-medium hover:bg-primary/10 transition-all duration-300 group"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
