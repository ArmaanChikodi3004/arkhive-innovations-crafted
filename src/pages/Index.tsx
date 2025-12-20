import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TechStack from '@/components/home/TechStack';
import CTA from '@/components/home/CTA';
import useLenis from '@/hooks/useLenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
