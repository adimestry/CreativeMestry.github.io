import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, MapPin, Calendar, Award, Code, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'CORELDRAW', level: 95, color: '#00d9ff' },
    { name: 'Adobe Photoshop & Illustrator', level: 90, color: '#ff006e' },
    { name: 'Figma & Sketch', level: 85, color: '#9d4edd' },
    { name: 'Web Development', level: 80, color: '#06ffa5' },
    { name: 'Visual Design', level: 88, color: '#00d9ff' },
    { name: 'UI/UX Design', level: 59, color: '#ff006e' },
  ];

  const experience = [
    {
      title: 'FREELANCE DESIGNER & PRINTING',
      company: 'Self-Employed / Remote',
      period: '2024 - 2025',
      description: 'Designing logos, branding materials, and social media creatives for clients. Handling print design projects such as brochures, business cards, and posters from concept to final output.',
      achievements: ['Created unique brand identities for 20+ clients', 'Delivered high-quality print materials with attention to detail', 'Built strong client relationships through consistent quality']
    },
    {
      title: 'GRAPHIC DESIGNER',
      company: 'Crescendoz Agency',
      period: '2023 - 2025',
      description: 'Designed responsive web layouts and Meta ad creatives to improve client engagement and brand visibility. Worked with the marketing team to keep design consistent across digital platforms.',
      achievements: ['Increased client engagement by 35% through optimized ad designs', 'Collaborated on 50+ successful marketing campaigns', 'Maintained brand consistency across multiple platforms']
    },
    {
      title: 'JUNIOR DESIGNER',
      company: 'Vandana Digital Prints & Design Solution',
      period: '2022 - 2023',
      description: 'Work with the team to create print and digital materials such as brochures, posters, and social media graphics. Help senior designers by preparing print ready files, ensuring color accuracy, and maintaining layout consistency.',
      achievements: ['Prepared 100+ print-ready files with zero error rate', 'Assisted in major rebranding projects for local businesses', 'Learned industry-standard design and printing workflows']
    },
  ];

  const interests = [
    { icon: Code, name: 'Coding', description: 'Building interactive experiences' },
    { icon: Palette, name: 'Digital Art', description: 'Creating futuristic illustrations' },
    { icon: Zap, name: 'Technology', description: 'Exploring emerging tech trends' },
    { icon: Users, name: 'Community', description: 'Mentoring young designers' },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
              <span className="holographic-text">About Me</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              I'm Aditya Mestry, a passionate graphic designer who lives at the crossroads of
              <span className="text-neon-blue"> creativity</span> and 
              <span className="text-neon-pink"> technology</span>. 
              My mission is to craft designs that bring ideas to life from digital concepts to tangible prints that leave a lasting impact.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              With over 4 years of experience in the design and printing industry, I specialize in creating bold brand identities, 
              modern visual concepts, and high-quality print solutions that connect innovation with craftsmanship.
               Every project I take on is fueled by creativity, attention to detail, and a deep passion for transforming imagination into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="neon-solid" size="lg" asChild>
                <a href="/resume.pdf" download>
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
              <Button variant="neon" size="lg" asChild>
                <Link to="/contact">
                  Let's Connect
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass p-8 rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-xl overflow-hidden mb-6">
                <img 
                  src="/jyfhnv.png" 
                  alt="Aditya Mestry - Graphic Designer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Aditya Mestry</h3>
                <p className="text-muted-foreground mb-4">Graphic Designer & UI/UX </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Mumbai, Thane
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center holographic-text">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="glass p-6 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.level}%`,
                      background: `linear-gradient(to right, ${skill.color}, #9d4edd)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center holographic-text">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="glass p-8 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neon-blue mb-1">{exp.title}</h3>
                    <p className="text-lg text-muted-foreground">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="border-neon-pink/30 text-neon-pink mt-2 md:mt-0">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center holographic-text">
            Interests & Passions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <div key={index} className="glass p-6 rounded-xl text-center group hover:neon-glow-blue transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <interest.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-neon-blue transition-colors duration-300">
                  {interest.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 holographic-text">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate on your next project and bring your vision to life with 
            cutting-edge design and futuristic aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon-solid" size="lg" asChild>
              <Link to="/contact">
                Start a Project
              </Link>
            </Button>
            <Button variant="neon" size="lg" asChild>
              <Link to="/contact">
                Schedule a Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;