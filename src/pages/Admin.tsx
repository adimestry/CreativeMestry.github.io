import { useState, useEffect } from "react";
import { Lock, User, Eye, EyeOff, Plus, Edit, Trash2, Upload, Save, X, ImageIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock authentication state
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Default project data
  // Load projects from localStorage only (no defaults)
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('admin-projects');
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        // Migrate old projects to new format (image -> images array)
        return parsedProjects.map((project: any) => ({
          ...project,
          images: project.images || (project.image ? [project.image] : [])
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      return [];
    }
  });

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem('admin-projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
      toast({
        title: "Storage Error",
        description: "Unable to save projects. Please check your browser storage.",
        variant: "destructive",
      });
    }
  }, [projects, toast]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    images: [] as string[],
    tags: "",
    link: "",
    githubUrl: "",
    category: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    // Mock authentication (replace with real authentication)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (loginData.username === "Bokyaa" && loginData.password === "Dhruv@1246") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
    
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Check if adding more files would exceed 5 images limit
    if (uploadedImages.length + files.length > 5) {
      toast({
        title: "Too Many Images",
        description: "You can upload a maximum of 5 images per project.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [];
    let processedFiles = 0;

    Array.from(files).forEach((file) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a valid image file. Please select PNG, JPG, JPEG, GIF, or WebP files.`,
          variant: "destructive",
        });
        processedFiles++;
        if (processedFiles === files.length) setIsUploading(false);
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 5MB. Please select a smaller image.`,
          variant: "destructive",
        });
        processedFiles++;
        if (processedFiles === files.length) setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newImages.push(result);
        processedFiles++;
        
        if (processedFiles === files.length) {
          setUploadedImages(prev => [...prev, ...newImages]);
          setProjectForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
          setIsUploading(false);
          toast({
            title: `${newImages.length} Image(s) Uploaded`,
            description: "Images have been successfully uploaded and will be used for the project.",
          });
        }
      };
      
      reader.onerror = () => {
        processedFiles++;
        if (processedFiles === files.length) setIsUploading(false);
        toast({
          title: "Upload Failed",
          description: `Failed to read ${file.name}. Please try again.`,
          variant: "destructive",
        });
      };
      
      reader.readAsDataURL(file);
    });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one image is provided
    if (projectForm.images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please upload at least one image for the project.",
        variant: "destructive",
      });
      return;
    }
    
    const tagsArray = projectForm.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id 
          ? { 
              id: editingProject.id,
              title: projectForm.title,
              description: projectForm.description,
              images: projectForm.images,
              tags: tagsArray,
              link: projectForm.link,
              githubUrl: projectForm.githubUrl,
              category: projectForm.category
            }
          : p
      ));
      toast({
        title: "Project Updated",
        description: "Project has been successfully updated and will appear on your website!",
      });
    } else {
      // Add new project
      const newProject = {
        id: Date.now(),
        title: projectForm.title,
        description: projectForm.description,
        images: projectForm.images,
        tags: tagsArray,
        link: projectForm.link,
        githubUrl: projectForm.githubUrl,
        category: projectForm.category
      };
      setProjects(prev => [...prev, newProject]);
      console.log('New project added:', newProject);
      console.log('All projects:', [...projects, newProject]);
      toast({
        title: "Project Added Successfully! 🎉",
        description: "Your project has been saved and is now visible on your website. Check the Projects page!",
      });
    }
    
    // Reset form
    setProjectForm({
      title: "",
      description: "",
      images: [],
      tags: "",
      link: "",
      githubUrl: "",
      category: ""
    });
    setUploadedImages([]);
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      tags: project.tags.join(", "),
      images: project.images || []
    });
    setUploadedImages(project.images?.filter((img: string) => img.startsWith('data:')) || []);
    setShowProjectForm(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Project Deleted",
      description: "Project has been successfully deleted.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-background to-neon-purple/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
        
        <div className="glass p-12 w-full max-w-lg rounded-2xl border border-white/20 relative z-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4 holographic-text">Admin Access</h1>
            <p className="text-muted-foreground text-lg">Enter your credentials to manage projects</p>
          </div>
            
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-foreground mb-3 font-semibold text-lg">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input
                  type="text"
                  required
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-foreground mb-3 font-semibold text-lg">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password"
                  className="pl-12 pr-12 h-14 text-lg"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoggingIn}
              variant="neon-solid"
              size="lg"
              className="w-full h-14 text-lg font-semibold"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                  Authenticating...
                </>
              ) : (
                "Login to Admin Panel"
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-background to-neon-purple/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-4 holographic-text">Admin Dashboard</h1>
              <p className="text-muted-foreground text-xl">Manage your portfolio projects</p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <Button 
                onClick={() => window.open('/', '_blank')}
                variant="outline"
                size="lg"
                className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Website
              </Button>
              <Button 
                onClick={() => setShowProjectForm(true)}
                variant="neon-solid"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                size="lg"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20"
              >
                Logout
              </Button>
            </div>
          </div>
          
          {/* Project Form Modal */}
          {showProjectForm && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="glass p-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-foreground holographic-text">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                      setUploadedImages([]);
                      setProjectForm({
                        title: "",
                        description: "",
                        images: [],
                        tags: "",
                        link: "",
                        githubUrl: "",
                        category: ""
                      });
                    }}
                    className="hover:bg-white/10"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </Button>
                </div>
                
                <form onSubmit={handleProjectSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground mb-3 font-semibold text-lg">Project Title</label>
                      <Input
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter project title"
                        className="h-12 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground mb-3 font-semibold text-lg">Category</label>
                      <Input
                        required
                        value={projectForm.category}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Branding, Web Design"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-foreground mb-3 font-semibold text-lg">Description</label>
                    <Textarea
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the project..."
                      rows={5}
                      className="text-base"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-foreground mb-3 font-semibold text-lg">Project Images (Max 5)</label>
                      
                      {/* File Upload Section */}
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-white/30 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={isUploading || projectForm.images.length >= 5}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                              projectForm.images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                              {isUploading ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-white" />
                              )}
                            </div>
                            <div className="text-center">
                              <p className="text-foreground font-medium">
                                {isUploading 
                                  ? "Uploading..." 
                                  : projectForm.images.length >= 5
                                    ? "Maximum 5 images reached"
                                    : "Click to upload images (multiple selection allowed)"
                                }
                              </p>
                              <p className="text-muted-foreground text-sm">
                                PNG, JPG, JPEG, GIF, WebP (max 5MB each) • {projectForm.images.length}/5 uploaded
                              </p>
                            </div>
                          </label>
                        </div>
                        
                        {/* Image Previews */}
                        {projectForm.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {projectForm.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image}
                                  alt={`Project image ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border border-white/10"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newImages = projectForm.images.filter((_, i) => i !== index);
                                    setProjectForm(prev => ({ ...prev, images: newImages }));
                                    setUploadedImages(prev => prev.filter((_, i) => i !== index));
                                  }}
                                  className="absolute top-2 right-2 w-6 h-6 p-0 bg-red-500/80 border-red-500 text-white hover:bg-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {index + 1}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* OR Divider */}
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 h-px bg-white/20"></div>
                          <span className="text-muted-foreground text-sm">OR</span>
                          <div className="flex-1 h-px bg-white/20"></div>
                        </div>
                        
                        {/* URL Input */}
                        <div>
                          <label className="block text-foreground mb-2 font-medium text-base">Or Add Image URL</label>
                          <div className="flex gap-2">
                            <Input
                              value=""
                              onChange={(e) => {
                                const url = e.target.value.trim();
                                if (!url) return;
                                
                                if (projectForm.images.length >= 5) {
                                  toast({
                                    title: "Too Many Images",
                                    description: "You can have a maximum of 5 images per project.",
                                    variant: "destructive",
                                  });
                                  return;
                                }
                                
                                setProjectForm(prev => ({ ...prev, images: [...prev.images, url] }));
                                e.target.value = '';
                              }}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.target as HTMLInputElement;
                                  const url = input.value.trim();
                                  if (url && projectForm.images.length < 5) {
                                    setProjectForm(prev => ({ ...prev, images: [...prev.images, url] }));
                                    input.value = '';
                                  }
                                }
                              }}
                              placeholder="Paste image URL and press Enter"
                              className="h-12 text-base"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={(e) => {
                                const input = e.currentTarget.previousSibling as HTMLInputElement;
                                const url = input.value.trim();
                                if (url && projectForm.images.length < 5) {
                                  setProjectForm(prev => ({ ...prev, images: [...prev.images, url] }));
                                  input.value = '';
                                  toast({
                                    title: "Image URL Added",
                                    description: "Image URL has been added to the project.",
                                  });
                                }
                              }}
                            >
                              Add URL
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Add image URLs one at a time. You can mix uploaded files and URLs (max 5 total).
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-foreground mb-3 font-semibold text-lg">Project Link</label>
                      <Input
                        value={projectForm.link}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                        placeholder="https://project-url.com"
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground mb-3 font-semibold text-lg">GitHub Repository URL</label>
                      <Input
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                        placeholder="https://github.com/username/repository"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-foreground mb-3 font-semibold text-lg">Tags (comma-separated)</label>
                    <Input
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="Branding, Logo Design, Identity"
                      className="h-12 text-base"
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" variant="neon-solid" size="lg" className="px-8">
                      <Save className="w-5 h-5 mr-2" />
                      {editingProject ? "Update Project" : "Add Project"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                        setUploadedImages([]);
                      }}
                      className="px-8"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Projects List */}
          <div className="glass p-10 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 holographic-text">Current Projects ({projects.length})</h2>
            
            {projects.length === 0 ? (
              <div className="text-center py-16">
                <Upload className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-foreground mb-4">No Projects Yet</h3>
                <p className="text-muted-foreground text-lg mb-8">Start by adding your first project to showcase your work.</p>
                <Button 
                  onClick={() => setShowProjectForm(true)}
                  variant="neon-solid"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Project
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="glass p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-56 h-40 bg-muted rounded-xl overflow-hidden flex-shrink-0 shadow-lg relative">
                        <img 
                          src={project.images?.[0] || project.image || '/placeholder.svg'} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {project.images && project.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            +{project.images.length - 1} more
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-3">{project.title}</h3>
                            <Badge variant="outline" className="border-neon-purple/30 text-neon-purple mb-3 text-sm px-3 py-1">
                              {project.category}
                            </Badge>
                          </div>
                          <div className="flex gap-3 mt-4 lg:mt-0">
                            <Button 
                              size="default" 
                              variant="outline"
                              onClick={() => handleEditProject(project)}
                              className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button 
                              size="default" 
                              variant="outline"
                              onClick={() => handleDeleteProject(project.id)}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 text-base leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string) => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-sm px-3 py-1"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;