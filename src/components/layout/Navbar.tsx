import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import gsap from 'gsap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on load
    gsap.fromTo('.nav-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="nav-item relative z-10">
          <img 
            src={logo} 
            alt="Arkhive Innovations" 
            className="h-12 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-item font-body text-sm uppercase tracking-wider transition-colors duration-300 line-animate pb-1 ${
                location.pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="nav-item ml-4 px-6 py-3 bg-gradient-primary rounded-full text-primary-foreground font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden nav-item relative z-10 p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-background/98 backdrop-blur-xl md:hidden transition-all duration-500 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-display text-3xl font-bold transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'text-gradient'
                    : 'text-foreground hover:text-primary'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 px-8 py-4 bg-gradient-primary rounded-full text-primary-foreground font-medium uppercase tracking-wider"
              style={{
                transitionDelay: isOpen ? '400ms' : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
