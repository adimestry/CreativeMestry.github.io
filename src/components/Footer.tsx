import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/adimestry', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-mestry-0a250334a/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/aditya_mestry_x007/', label: 'Instagram' },
   // { icon: Mail, href: 'mailto:hello@thecreativemestry.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative mt-20 glass border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/5 via-transparent to-transparent" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="The Creative Mestry Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="holographic-text text-xl font-bold font-poppins">
                The Creative Mestry
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Creating futuristic digital experiences with cutting-edge design and 
              holographic aesthetics. Let's build something extraordinary together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-neon-blue transition-all duration-300 hover:neon-glow-blue"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-neon-blue transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-2 text-muted-foreground">
              <p></p>
              <p> adityamestry324@gmail.com</p>
              <p>Shree Ganesh Plaza Diva(E) Thane,Maharashtra 400612</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} The Creative Mestry. All rights reserved.
            </p>
          </div>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            Made with{' '}
            <Link 
              to="/admin" 
              className="mx-1 text-neon-pink hover:text-neon-purple transition-colors duration-300"
            >
              <Heart className="w-4 h-4" />
            </Link>
            {' '}and lots of coffee☕.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;