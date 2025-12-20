import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import Hero3DScene from '../three/Hero3DScene';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate badge
      tl.fromTo('.hero-badge',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Animate headline with split text effect
      tl.fromTo('.hero-headline-line',
        { opacity: 0, y: 80, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.15 },
        '-=0.4'
      );

      // Animate description
      tl.fromTo('.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      // Animate buttons
      tl.fromTo('.hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

      // Animate scroll indicator
      tl.fromTo('.scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      );

      // Floating animation for scroll indicator
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background - React Three Fiber */}
      <Hero3DScene />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background pointer-events-none z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      
      {/* Content */}
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-body text-muted-foreground">IT Services & Innovation</span>
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
            <span className="hero-headline-line block">We Create</span>
            <span className="hero-headline-line block text-gradient">Digital Excellence</span>
            <span className="hero-headline-line block">You Grow</span>
          </h1>

          {/* Description */}
          <p className="hero-description font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform your business with cutting-edge technology solutions. From web development to AI integration, we build the future.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-primary rounded-full text-primary-foreground font-medium text-lg transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              className="group flex items-center gap-3 px-8 py-4 rounded-full glass text-foreground font-medium text-lg transition-all duration-300 hover:bg-primary/10"
            >
              <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-primary fill-primary" />
              </span>
              Watch Showreel
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
