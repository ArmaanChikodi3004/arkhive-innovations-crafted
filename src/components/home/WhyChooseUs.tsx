import { useEffect, useRef } from 'react';
import { Zap, Users, Trophy, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'We deliver projects on time without compromising quality.',
    stat: '2x',
    statLabel: 'Faster Delivery',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our seasoned professionals bring decades of combined experience.',
    stat: '50+',
    statLabel: 'IT Experts',
  },
  {
    icon: Trophy,
    title: 'Award Winning',
    description: 'Recognized for excellence in digital innovation and design.',
    stat: '25+',
    statLabel: 'Industry Awards',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock support to keep your business running smoothly.',
    stat: '99.9%',
    statLabel: 'Uptime',
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the section
      gsap.fromTo('.why-us-bg',
        { y: 0 },
        {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Animate header
      gsap.fromTo('.why-us-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-us-header',
            start: 'top 85%',
          },
        }
      );

      // Animate feature cards with horizontal stagger
      gsap.fromTo('.feature-card',
        { opacity: 0, x: -30, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-row',
            start: 'top 80%',
          },
        }
      );

      // Counter animation
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const target = counter.textContent || '0';
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');
        
        gsap.fromTo(counter,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
            },
            onUpdate: function() {
              const current = Math.round(gsap.getProperty(counter, 'textContent') as number);
              counter.textContent = current + suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background with parallax */}
      <div className="why-us-bg absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="why-us-header max-w-3xl mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Building Success Through{' '}
            <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            We combine innovation, expertise, and dedication to deliver exceptional results for our clients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card perspective-container group"
            >
              <div className="perspective-element p-8 rounded-2xl bg-gradient-card border border-border/50 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-hover group-hover:transform group-hover:-translate-y-2">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="stat-number font-display text-4xl font-bold text-gradient">
                    {feature.stat}
                  </span>
                  <span className="block text-sm text-muted-foreground font-body mt-1">
                    {feature.statLabel}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
