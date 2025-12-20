import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Cloud, 
  Brain, 
  Palette, 
  Shield, 
  Database,
  Workflow,
  Check,
  TrendingUp,
  Globe
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useLenis from '@/hooks/useLenis';
import ServicesScene from '@/components/three/ServicesScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.',
    features: ['React & Next.js', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development'],
    color: 'from-blue-500 to-cyan-400',
    image: '/src/assets/website.png',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
    color: 'from-purple-500 to-pink-400',
    image: '/src/assets/mobile.png',
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Powerful digital marketing solutions designed to increase visibility, engagement, and conversions for your business.',
    features: ['Search Engine Optimization (SEO)', 'Social Media Growth & Ads', 'Paid Campaigns & Lead Generation', 'Branding & Content Marketing'],
    color: 'from-emerald-500 to-teal-400',
    image: '/src/assets/digitalmarketing.png',
  },
  {
    icon: Brain,
    title: 'AI & Tools',
    description: 'Intelligent systems and automation powered by advanced AI algorithms to transform your operations.',
    features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Chatbots'],
    color: 'from-orange-500 to-amber-400',
    image: '/src/assets/ai.png',
  },
  {
    icon: Palette,
    title: 'Graphic Designing',
    description: 'Beautiful, intuitive interfaces designed to engage users and drive conversions.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: 'from-pink-500 to-rose-400',
    image: '/src/assets/graphic.png',
  },
  {
    icon: Globe,
    title: 'WordPress Development',
    description: 'Custom WordPress solutions designed to build fast, secure, and scalable websites tailored to your business goals.',
    features: ['Custom Theme Development', 'Plugin Development & Integration', 'Performance Optimization', 'Maintenance & Security'],
    color: 'from-red-500 to-orange-400',
    image: '/src/assets/wordpress.png',
  },
 
];

const Services = () => {
  useLenis();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.services-hero > *',
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

      // Service cards
      const cards = document.querySelectorAll('.service-detail-card');
      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -50 : 50;
        gsap.fromTo(card,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background noise-overlay">
      <Navbar />
      
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="services-hero">
              <span className="inline-block px-4 py-2 rounded-full glass text-sm font-body text-primary mb-6">
                Our Services
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Solutions That Power{' '}
                <span className="text-gradient">Your Growth</span>
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                Comprehensive IT services designed to transform your business and accelerate success in the digital age.
              </p>
            </div>
            <div className="hidden lg:block">
              <ServicesScene />
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-detail-card grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-body text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary font-medium group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-10`} />
                    {/* <div className="absolute inset-4 rounded-2xl bg-gradient-card border border-border/50 flex items-center justify-center">
                      <service.icon className="w-32 h-32 text-primary/20" />
                    </div> */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
  <div className="relative aspect-square max-w-md mx-auto">
    {/* Glow background */}
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-10`} />

    {/* Image frame (matches provided image style) */}
    <div className="absolute inset-4 rounded-2xl bg-gradient-card border border-border/50 overflow-hidden flex items-center justify-center">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover opacity-90"
        loading="lazy"
      />
    </div>

    {/* Floating accent elements (keeps premium feel) */}
    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-card border border-border/50 flex items-center justify-center animate-float">
      <service.icon className="w-8 h-8 text-primary" />
    </div>

    <div
      className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-gradient-card border border-border/50 flex items-center justify-center animate-float"
      style={{ animationDelay: '1s' }}
    >
      <Shield className="w-6 h-6 text-accent" />
    </div>
  </div>
</div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-card border border-border/50 flex items-center justify-center animate-float">
                      <Code className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-gradient-card border border-border/50 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-card/30 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Ready to Start Your <span className="text-gradient">Project</span>?
            </h2>
            <p className="text-xl text-muted-foreground font-body mb-12">
              Let's discuss how we can help transform your business.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-primary rounded-full text-primary-foreground font-display font-bold text-lg transition-all duration-300 hover:shadow-glow hover:scale-105"
            >
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
