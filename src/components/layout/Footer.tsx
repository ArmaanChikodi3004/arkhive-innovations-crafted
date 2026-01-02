import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';
import logo from '@/assets/AKLOGO.png';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <img src={logo} alt="Arkhive Innovations" className="h-12 w-auto" />
            <p className="text-muted-foreground font-body leading-relaxed">
              We Create. You Grow. Your trusted partner in digital transformation and innovation.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home','About Us', 'Services', '', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body line-animate pb-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Quick Links */}
<div>
  <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
  <ul className="space-y-4">
    {[
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Contact', path: '/contact' },
    ].map((item) => (
      <li key={item.label}>
        <Link
          to={item.path}
          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body line-animate pb-1"
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</div>


          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Web Development', 'Mobile Application', 'Digital Marketing', 'AI & Tools', 'Graphic Designing', 'WordPress Development'].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <span className="font-body">arkhiveinnovations@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary" />
                <span className="font-body">+91 7204996364</span>
                <span className="font-body">+91 8088522218</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary mt-1" />
                <span className="font-body">Bengaluru<br />BTM Layout Stage 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © {new Date().getFullYear()} Arkhive Innovations. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
