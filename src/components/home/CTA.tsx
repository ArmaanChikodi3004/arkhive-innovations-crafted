import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate CTA content
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-content',
            start: 'top 85%',
          },
        }
      );

      // Floating orbs animation
      gsap.to('.floating-orb', {
        y: 'random(-30, 30)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="floating-orb absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
      <div className="floating-orb absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-accent/10 blur-[100px]" />
      <div className="floating-orb absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-body text-primary">Ready to Transform?</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Let's Build Something{' '}
            <span className="text-gradient">Extraordinary</span>{' '}
            Together
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-12 leading-relaxed">
            Have a project in mind? We're here to turn your vision into reality. Let's discuss how we can help you achieve your goals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-10 py-5 bg-gradient-primary rounded-full text-primary-foreground font-display font-bold text-lg transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-3 px-10 py-5 rounded-full glass text-foreground font-display font-bold text-lg transition-all duration-300 hover:bg-primary/10"
            >
              View Our Work
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-body text-sm">Available for Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-foreground">2+</span>
              <span className="font-body text-sm">Projects Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-foreground">2+</span>
              <span className="font-body text-sm">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
