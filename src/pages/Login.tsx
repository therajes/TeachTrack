import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Users, BookOpen, Sparkles, Zap, Shield, Award } from 'lucide-react';
import heroImage from '@/assets/education-hero.jpg';

export default function Login() {
  const { user, login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    const success = await login(formData.email, formData.password, formData.role);
    
    if (success) {
      toast({
        title: "Welcome!",
        description: "Login successful"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try password123",
        variant: "destructive"
      });
    }
    setSubmitting(false);
  };

  const roleIcons = {
    admin: Users,
    faculty: BookOpen,
    student: GraduationCap
  };

  const demoCredentials = [
    { role: 'admin', email: 'admin@school.edu', name: 'Admin User' },
    { role: 'faculty', email: 'rajesh.barik@school.edu', name: 'Dr. Rajesh Barik' },
    { role: 'student', email: 'mohit.tomar@student.edu', name: 'Mohit Tomar' }
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-education-secondary/90 to-education-premium/90" />
        <img
          src={heroImage}
          alt="Education Dashboard"
          className="w-full h-full object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-education-accent rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              TeachTrack
            </h1>
            <p className="text-xl opacity-90 max-w-md leading-relaxed">
              Next-Generation Student Attendance Monitoring & Analytics System
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary via-education-secondary to-education-premium rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-education-accent rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-education-secondary to-education-premium bg-clip-text text-transparent">
              TeachTrack
            </h1>
            <p className="text-muted-foreground mt-2">Advanced Attendance Management</p>
          </div>

          <Card className="card-premium border-2 border-primary/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-education-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to access your premium dashboard
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-semibold">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger className="input-premium h-12">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-primary" />
                          <span>Administrator</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="faculty">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-primary" />
                          <span>Faculty</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="student">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@school.edu"
                    className="input-premium h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter your password"
                    className="input-premium h-12"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-premium h-12 text-lg font-semibold"
                  disabled={isLoading || submitting}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">Click any credential to auto-fill:</p>
                <div className="space-y-2">
                  {demoCredentials.map((cred) => {
                    const Icon = roleIcons[cred.role as keyof typeof roleIcons];
                    return (
                      <div
                        key={cred.role}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-all duration-300 border border-muted/50 hover:border-primary/30 hover:shadow-md group"
                        onClick={() => setFormData({
                          email: cred.email,
                          password: 'password123',
                          role: cred.role
                        })}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-education-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-foreground">{cred.name}</span>
                            <p className="text-xs text-muted-foreground capitalize">{cred.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">password123</span>
                          <p className="text-xs text-primary font-medium">Click to fill</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 TeachTrack. All rights reserved.</p>
            <p className="mt-1">Advanced Education Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
}