import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  tags,
  category,
  year,
  featured = false,
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 ${
      featured ? 'md:col-span-2 md:row-span-2' : ''
    }`}>
      {/* Glass Card Container */}
      <div className="glass h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex space-x-3">
              <Button variant="neon" size="sm" asChild>
                <Link to={`/projects/${id}`}>
                  View Details
                </Link>
              </Button>
              <Button variant="neon-pink" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span>{category}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{year}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-neon-blue transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-muted text-muted-foreground">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Neon Border Effect */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-neon-blue/30 transition-all duration-300 pointer-events-none" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none neon-glow-blue" />
      </div>
    </div>
  );
};

export default ProjectCard;