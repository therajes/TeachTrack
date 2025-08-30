import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
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
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-education-secondary/90" />
        <img
          src={heroImage}
          alt="Education Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">TeachTrack</h1>
            <p className="text-xl opacity-90 max-w-md">
              Automated Student Attendance Monitoring & Analytics System
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/30">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:hidden mb-8">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold">TeachTrack</h1>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Administrator
                        </div>
                      </SelectItem>
                      <SelectItem value="faculty">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Faculty
                        </div>
                      </SelectItem>
                      <SelectItem value="student">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          Student
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@school.edu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || submitting}
                >
                  {submitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center mb-4">Demo Credentials:</p>
                <div className="space-y-2 text-xs">
                  {demoCredentials.map((cred) => {
                    const Icon = roleIcons[cred.role as keyof typeof roleIcons];
                    return (
                      <div
                        key={cred.role}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded cursor-pointer hover:bg-muted"
                        onClick={() => setFormData({
                          email: cred.email,
                          password: 'password123',
                          role: cred.role
                        })}
                      >
                        <div className="flex items-center">
                          <Icon className="w-3 h-3 mr-2" />
                          <span className="font-medium">{cred.name}</span>
                        </div>
                        <span className="text-muted-foreground">password123</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}