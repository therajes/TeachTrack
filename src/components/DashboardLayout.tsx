import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Bell, Settings, Search, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-education-secondary to-education-premium rounded-2xl flex items-center justify-center mx-auto shadow-xl animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-education-accent rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-foreground">Loading TeachTrack</div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-education-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-education-premium rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {/* Premium Header */}
          <header className="h-20 border-b border-muted/50 bg-gradient-to-r from-card/80 via-white/90 to-card/80 backdrop-blur-xl flex items-center px-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-300 hover:scale-105" />
              <div className="h-8 w-px bg-muted/50" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-education-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-education-secondary bg-clip-text text-transparent">
                    TeachTrack
                  </h2>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role} Dashboard
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search across the system..."
                  className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-muted/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-muted/50 rounded-lg transition-all duration-300">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-education-accent text-white border-0">
                  3
                </Badge>
              </Button>

              {/* System Status */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-education-success/10 to-education-accent/10 rounded-lg border border-education-success/20">
                <div className="w-2 h-2 bg-education-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-education-success">System Online</span>
              </div>

              {/* Quick Actions */}
              <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-300">
                <Activity className="w-5 h-5 text-muted-foreground" />
              </Button>
              
              <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/50 rounded-lg transition-all duration-300">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="min-h-full">
              {children}
            </div>
          </div>

          {/* Premium Footer */}
          <footer className="border-t border-muted/50 bg-gradient-to-r from-card/50 to-white/50 backdrop-blur-sm py-4 px-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>© 2024 TeachTrack</span>
                <span>•</span>
                <span>Advanced Education Management</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-education-success rounded-full animate-pulse"></div>
                  <span>Performance: 98.5%</span>
                </span>
                <span>•</span>
                <span>Version 2.0.0</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}