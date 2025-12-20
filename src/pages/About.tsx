import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Lightbulb, Users, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useLenis from '@/hooks/useLenis';
import AboutScene from '@/components/three/AboutScene';
import Floating3DLogo from '@/components/three/Floating3DLogo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Alex Chen',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech innovation.',
  },
  {
    name: 'Sarah Williams',
    role: 'CTO',
    bio: 'Expert in cloud architecture and AI systems.',
  },
  {
    name: 'Michael Park',
    role: 'COO',
    bio: 'Operations specialist driving efficiency and growth.',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge solutions.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Success is built through partnership and teamwork.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do and it shows in our work.',
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'Creating meaningful change through technology.',
  },
];

const About = () => {
  useLenis();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.about-hero-content > *',
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

      // Story section
      gsap.fromTo('.story-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top 75%',
          },
        }
      );

      // Vision/Mission cards
      gsap.fromTo('.vm-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vm-section',
            start: 'top 80%',
          },
        }
      );

      // Founders
      gsap.fromTo('.founder-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.founders-grid',
            start: 'top 80%',
          },
        }
      );

      // Values
      gsap.fromTo('.value-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background noise-overlay">
      <Navbar />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="about-hero-content max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
              About Us
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Innovating the Future,{' '}
              <span className="text-gradient">One Solution</span> at a Time
            </h1>
            <p className="text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
              We are a team of passionate technologists dedicated to transforming businesses through cutting-edge digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="story-content">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                From Vision to <span className="text-gradient">Reality</span>
              </h2>
              <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed">
                <p>
                  Founded in 2020, Arkhive Innovations emerged from a simple belief: technology should empower, not complicate. What started as a small team of three has grown into a powerhouse of over 50 IT experts.
                </p>
                <p>
                  Our journey has been defined by relentless innovation and an unwavering commitment to our clients' success. Today, we serve businesses across the globe, helping them navigate the digital landscape with confidence.
                </p>
                <p>
                  We Create. You Grow. This isn't just our tagline—it's our promise.
                </p>
              </div>
            </div>
            <div className="relative">
              {/* 3D Floating Logo */}
              <Floating3DLogo />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-3 gap-4 text-center glass rounded-2xl p-6">
                  <div>
                    <span className="block font-display text-3xl font-bold text-gradient">5+</span>
                    <span className="text-sm text-muted-foreground">Years</span>
                  </div>
                  <div>
                    <span className="block font-display text-3xl font-bold text-gradient">100+</span>
                    <span className="text-sm text-muted-foreground">Projects</span>
                  </div>
                  <div>
                    <span className="block font-display text-3xl font-bold text-gradient">50+</span>
                    <span className="text-sm text-muted-foreground">Experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vm-section py-32 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vm-card p-10 rounded-3xl bg-gradient-card border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  To be the global leader in digital transformation, empowering businesses of all sizes to thrive in the digital age through innovative and accessible technology solutions.
                </p>
              </div>
            </div>
            <div className="vm-card p-10 rounded-3xl bg-gradient-card border border-border/50 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  To deliver exceptional digital solutions that solve real problems, create lasting value, and build partnerships based on trust, transparency, and mutual success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
              Leadership
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-gradient">Founders</span>
            </h2>
            <p className="text-muted-foreground text-lg font-body">
              The visionary minds driving innovation at Arkhive.
            </p>
          </div>

          <div className="founders-grid grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="founder-card group p-8 rounded-3xl bg-gradient-card border border-border/50 text-center hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                  <span className="font-display text-4xl font-bold text-gradient">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{founder.name}</h3>
                <p className="text-primary font-body text-sm uppercase tracking-wider mb-4">{founder.role}</p>
                <p className="text-muted-foreground font-body">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
              Our Values
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              What Drives <span className="text-gradient">Us</span>
            </h2>
          </div>

          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card p-8 rounded-2xl bg-gradient-card border border-border/50 text-center hover:border-primary/30 hover:shadow-hover transition-all duration-500"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Ready to Join Our <span className="text-gradient">Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground font-body mb-12">
              Let's create something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-primary rounded-full text-primary-foreground font-display font-bold text-lg transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
