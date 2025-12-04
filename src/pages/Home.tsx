import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Palette, Code } from 'lucide-react';
const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Load projects from localStorage
    try {
      const savedProjects = localStorage.getItem('admin-projects');
      if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        // Get first 3 projects for featured section
        setFeaturedProjects(projects.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading featured projects:', error);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const {
        clientX,
        clientY
      } = e;
      const {
        innerWidth,
        innerHeight
      } = window;
      const x = clientX / innerWidth * 100;
      const y = clientY / innerHeight * 100;
      heroRef.current.style.background = `
        radial-gradient(circle at ${x}% ${y}%, hsla(var(--neon-blue), 0.15) 0%, transparent 50%),
        radial-gradient(circle at ${100 - x}% ${100 - y}%, hsla(var(--neon-pink), 0.1) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, hsla(var(--neon-purple), 0.05) 0%, transparent 50%)
      `;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const stats = [{
    number: '50+',
    label: 'Projects Completed'
  }, {
    number: '25+',
    label: 'Happy Clients'
  }, {
    number: '3+',
    label: 'Years Experience'
  }, {
    number: '15+',
    label: 'Awards Won'
  }];
  const services = [{
    icon: Palette,
    title: 'Brand Identity',
    description: 'Creating unique visual identities that capture your brand essence'
  }, {
    icon: Code,
    title: 'Web Design',
    description: 'Futuristic websites with cutting-edge UI/UX and animations'
  }, {
    icon: Zap,
    title: 'Digital Art',
    description: 'Holographic and neon-themed digital artwork and illustrations'
  }, {
    icon: Sparkles,
    title: 'Motion Graphics',
    description: 'Dynamic animations and motion graphics for digital platforms'
  }];
  return <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-floating" />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-floating" style={{
          animationDelay: '1s'
        }} />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-floating" style={{
          animationDelay: '2s'
        }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Greeting */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full glass border border-neon-blue/30 text-neon-blue text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to The Creative Mestry
                Where Imagination Becomes Design.
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-poppins">
              <span className="holographic-text">Your Vision,</span>
              <br />
              <span className="holographic-text">Our Creation</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              I'm Aditya Mestry, a creative graphic designer specializing in
              <span className="text-neon-blue"> INNOVATIVE DESIGNS</span> and 
              <span className="text-neon-pink"> PRINTING SOLUTIONS</span> that bring ideas to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="neon-solid" size="lg" className="text-lg px-8" asChild>
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="neon" size="lg" className="text-lg px-8" asChild>
                <Link to="/contact">Let's Collaborate</Link>
              </Button>
            </div>

            {/* Stats */}
            
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              <span className="holographic-text">What I Create</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specializing in futuristic design solutions that blend creativity with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => <div key={index} className="group">
                <div className="glass p-6 rounded-xl h-full transition-all duration-300 hover:neon-glow-blue">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-neon-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              <span className="holographic-text">Featured Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A glimpse into my latest projects that showcase the future of digital design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project: any, index: number) => (
                <div key={project.id || index} className="group relative overflow-hidden rounded-xl">
                  <div className="glass aspect-video flex flex-col items-center justify-center p-6">
                    {(project.images?.[0] || project.image) && (
                      <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={project.images?.[0] || project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold mb-2 text-center">{project.title}</h3>
                    <p className="text-sm text-muted-foreground text-center line-clamp-2">
                      {project.description}
                    </p>
                    {project.category && (
                      <span className="mt-2 text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded-full">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))
            ) : (
              // Fallback placeholders if no projects
              [1, 2, 3].map(item => (
                <div key={item} className="group relative overflow-hidden rounded-xl">
                  <div className="glass aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Project {item}</h3>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button variant="neon-pink" size="lg" asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;