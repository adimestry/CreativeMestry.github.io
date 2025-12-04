import React, { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [projects, setProjects] = useState([]);

  // Load projects from localStorage only
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('admin-projects');
      if (savedProjects) {
        const adminProjects = JSON.parse(savedProjects);
        // Convert admin projects to match the expected format
        const convertedProjects = adminProjects.map((project: any) => ({
          id: project.id.toString(),
          title: project.title,
          description: project.description,
          image: project.images?.[0] || project.image || '/placeholder.svg',
          tags: project.tags,
          category: project.category,
          year: new Date().getFullYear().toString(),
          featured: false,
        }));
        setProjects(convertedProjects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  }, []);

  const categories = ['All', 'Branding', 'Web Design', 'Digital Art', 'Motion Graphics', 'UI/UX'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
            <span className="holographic-text">My Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of futuristic designs, holographic art, and cyberpunk-inspired digital experiences
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'neon' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'neon' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'neon' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              featured={viewMode === 'grid' ? project.featured : false}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <Filter className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              Try selecting a different category or view all projects.
            </p>
            <Button variant="neon" onClick={() => setSelectedCategory('All')}>
              Show All Projects
            </Button>
          </div>
        )}

        {/* Load More (Future Enhancement) */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <Button variant="neon-purple" size="lg">
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;