import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Calendar, Zap } from 'lucide-react';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        timeline: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };
  const contactInfo = [{
    icon: Mail,
    label: 'Email',
    value: 'hello@thecreativemestry.com',
    href: 'mailto:hello@thecreativemestry.com'
  }, {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  }, {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#'
  }, {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: '#'
  }];
  const projectTypes = ['Brand Identity', 'Web Design', 'Mobile App Design', 'Digital Art', 'Motion Graphics', 'Consultation', 'Other'];
  const budgetRanges = ['Under $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+', 'Let\'s discuss'];
  const timelineOptions = ['ASAP', '1-2 weeks', '1 month', '2-3 months', '3+ months', 'Flexible'];
  return <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
            <span className="holographic-text">Let's Create Together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life with cutting-edge design? 
            Let's discuss your project and create something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass p-8 rounded-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Start Your Project</h2>
                  <p className="text-muted-foreground">Fill out the form below and I'll get back to you soon</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-2 glass border-neon-blue/30 focus:border-neon-blue" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-2 glass border-neon-blue/30 focus:border-neon-blue" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-foreground">Company</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} className="mt-2 glass border-neon-blue/30 focus:border-neon-blue" placeholder="Your company name (optional)" />
                </div>

                

                <div>
                  <Label htmlFor="message" className="text-foreground">Project Details *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="mt-2 glass border-neon-blue/30 focus:border-neon-blue resize-none" placeholder="Tell me about your project, goals, and any specific requirements..." />
                </div>

                <Button type="submit" variant="neon-solid" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Sending Message...
                    </> : <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Additional Details */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 holographic-text">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {})}
              </div>
            </div>

            {/* Quick Response */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-neon-blue mr-2" />
                <h3 className="text-lg font-bold">Quick Response</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                I typically respond to all inquiries within 24 hours. For urgent projects, 
                feel free to mention it in your message.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-sm text-muted-foreground">Usually responds in a few hours</span>
              </div>
            </div>

            {/* Availability */}
            <div className="glass p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-neon-pink mr-2" />
                <h3 className="text-lg font-bold">Availability</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Status</span>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    Available
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next Opening</span>
                  <span className="text-sm font-medium">Immediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Booking</span>
                  <span className="text-sm font-medium">2-3 weeks ahead</span>
                </div>
              </div>
            </div>

            {/* FAQ */}
            
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;