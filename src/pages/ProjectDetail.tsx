import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Calendar, Tag, User, Clock } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load project from localStorage
    try {
      const savedProjects = localStorage.getItem('admin-projects');
      if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        const foundProject = projects.find(p => p.id.toString() === id);
        
        if (foundProject) {
                    // Convert admin project format to detail page format
          const detailProject = {
            id: foundProject.id.toString(),
            title: foundProject.title,
            description: foundProject.description,
            longDescription: foundProject.description + "\n\nThis project showcases innovative design thinking and cutting-edge technology implementation. Every detail has been carefully crafted to deliver an exceptional user experience that exceeds client expectations.",
            images: foundProject.images || [foundProject.image] || ['/placeholder.svg'],
            tags: foundProject.tags || [],
            category: foundProject.category,
            year: new Date().getFullYear().toString(),
            client: 'Client Name',
            duration: '2-3 months',
            role: 'Lead Designer',
            tools: ['Adobe Creative Suite', 'Figma', 'Modern Web Technologies'],
            liveUrl: foundProject.link || '#',
            githubUrl: foundProject.githubUrl || '#',
          };
          setProject(detailProject);
        }
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  // Mock project data - in a real app, this would come from an API or state management
  const mockProject = {
    id: '1',
    title: 'Cyber Corp Identity',
    description: 'Complete brand identity design for a futuristic tech company, featuring holographic logos and neon color schemes that embody the cyberpunk aesthetic.',
    longDescription: `This comprehensive brand identity project for Cyber Corp represents the pinnacle of futuristic design thinking. The challenge was to create a visual identity that would resonate with both tech-savvy millennials and forward-thinking enterprises.

The design process began with extensive research into cyberpunk aesthetics, holographic materials, and emerging display technologies. I developed a unique logo system that adapts across different mediums while maintaining its core holographic essence.

The color palette draws inspiration from neon cityscapes and aurora phenomena, creating a sense of otherworldly sophistication. Every element, from business cards to digital interfaces, was crafted to feel like it belongs in the year 2050.`,
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ],
    tags: ['Branding', 'Logo Design', 'Cyberpunk', 'Holographic', 'Identity System'],
    category: 'Branding',
    year: '2024',
    client: 'Cyber Corp Technologies',
    duration: '3 months',
    role: 'Lead Designer',
    tools: ['Adobe Illustrator', 'Figma', 'Blender', 'After Effects'],
    liveUrl: '#',
    githubUrl: '#',
  };

  // Use loaded project or fallback to mock
  const displayProject = project || mockProject;

  if (!displayProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button variant="neon" asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-neon-blue">
            <Link to="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <img
            src={displayProject.images[0]}
            alt={displayProject.title}
            className="w-full h-96 md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {displayProject.tags.slice(0, 4).map((tag, index) => (
                <Badge key={index} className="bg-black/50 text-white border-neon-blue/30">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-poppins">
              {displayProject.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {displayProject.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 holographic-text">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                {displayProject.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Project Images */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 holographic-text">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayProject.images.slice(1).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${displayProject.title} - Image ${index + 2}`}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 holographic-text">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {displayProject.tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="border-neon-purple/30 text-neon-purple">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Project Details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-neon-blue" />
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{displayProject.client}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-neon-pink" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{displayProject.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{displayProject.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-neon-cyan" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{displayProject.category}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="neon-solid" className="w-full" asChild>
                  <a href={displayProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </a>
                </Button>
                
                <Button variant="neon" className="w-full" asChild>
                  <Link to="/contact">
                    Start Your Project
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center holographic-text">
            More Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="glass rounded-xl overflow-hidden transition-all duration-300 hover:neon-glow-blue">
                  <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Project {item}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-blue transition-colors">
                      Related Project {item}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Another amazing project showcasing futuristic design principles.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;