import { 
  BarChart3, 
  Users, 
  QrCode, 
  Calendar,
  Settings,
  BookOpen,
  GraduationCap,
  LogOut,
  User
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigationItems = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { title: 'Students', url: '/students', icon: GraduationCap },
    { title: 'Faculty', url: '/faculty', icon: BookOpen },
    { title: 'Attendance', url: '/attendance', icon: Calendar },
    { title: 'Reports', url: '/reports', icon: BarChart3 },
  ],
  faculty: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { title: 'My Classes', url: '/classes', icon: BookOpen },
    { title: 'Mark Attendance', url: '/mark-attendance', icon: QrCode },
    { title: 'View Attendance', url: '/attendance', icon: Calendar },
    { title: 'Reports', url: '/reports', icon: BarChart3 },
  ],
  student: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { title: 'My Attendance', url: '/my-attendance', icon: Calendar },
    { title: 'Profile', url: '/profile', icon: User },
  ]
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!user) return null;

  const items = navigationItems[user.role] || [];
  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg">TeachTrack</h2>
              <p className="text-xs text-muted-foreground capitalize">{user.role} Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="w-full"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}