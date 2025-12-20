import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'TensorFlow', category: 'AI/ML' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Redis', category: 'Cache' },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.tech-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tech-header',
            start: 'top 85%',
          },
        }
      );

      // Marquee animation
      const marqueeContent = document.querySelector('.marquee-content');
      if (marqueeContent) {
        gsap.to('.marquee-content', {
          xPercent: -50,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });
      }

      // Tech items reveal
      gsap.fromTo('.tech-item',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-card/30">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="tech-header text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
            Tech Stack
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powered by Modern{' '}
            <span className="text-gradient">Technology</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            We leverage the latest technologies to build robust, scalable, and future-proof solutions.
          </p>
        </div>

        {/* Infinite Marquee */}
        <div ref={marqueeRef} className="relative overflow-hidden py-8 mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="marquee-content flex gap-8 whitespace-nowrap">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-8 py-4 rounded-full glass text-foreground font-display text-lg font-medium"
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="tech-item group relative p-6 rounded-xl bg-gradient-card border border-border/50 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-hover cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative block font-display text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                {tech.name}
              </span>
              <span className="relative block text-xs text-muted-foreground font-body uppercase tracking-wider">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
