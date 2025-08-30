import { 
  BarChart3, 
  Users, 
  QrCode, 
  Calendar,
  Settings,
  BookOpen,
  GraduationCap,
  LogOut,
  User,
  Sparkles,
  TrendingUp,
  Award
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
import { Badge } from '@/components/ui/badge';

const navigationItems = {
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3, badge: 'Live' },
    { title: 'Students', url: '/students', icon: GraduationCap, badge: '1.2K' },
    { title: 'Faculty', url: '/faculty', icon: BookOpen, badge: '89' },
    { title: 'Attendance', url: '/attendance', icon: Calendar, badge: '94.2%' },
    { title: 'Analytics', url: '/reports', icon: TrendingUp, badge: 'New' },
  ],
  faculty: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3, badge: 'Live' },
    { title: 'My Classes', url: '/classes', icon: BookOpen, badge: '4' },
    { title: 'Mark Attendance', url: '/mark-attendance', icon: QrCode, badge: 'Active' },
    { title: 'View Attendance', url: '/attendance', icon: Calendar, badge: '91.2%' },
    { title: 'Reports', url: '/reports', icon: TrendingUp, badge: 'New' },
  ],
  student: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3, badge: 'Live' },
    { title: 'My Attendance', url: '/my-attendance', icon: Calendar, badge: '89.5%' },
    { title: 'Profile', url: '/profile', icon: User, badge: 'Updated' },
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
    <Sidebar collapsible="icon" className="border-r border-slate-200/30 bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 backdrop-blur-xl shadow-lg">
      <SidebarHeader className="p-6 border-b border-slate-200/30 bg-gradient-to-r from-slate-50/90 to-white/95">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          {!isCollapsed && (
            <div className="space-y-1">
              <h2 className="font-bold text-xl text-slate-900">
                TeachTrack
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 border-slate-200">
                  {user.role === 'admin' ? 'Administrator' : user.role === 'faculty' ? 'Faculty' : 'Student'}
                </Badge>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            {!isCollapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div
                      className={`group relative flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-not-allowed ${
                        isActive 
                          ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md" 
                          : "text-black bg-white shadow-sm hover:bg-slate-50 hover:shadow-md"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "bg-slate-100 text-black"
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      {!isCollapsed && (
                        <div className="flex items-center justify-between min-w-0 flex-1">
                          <span className="font-medium text-sm truncate">{item.title}</span>
                          <Badge 
                            variant={item.badge === 'Live' ? 'default' : item.badge === 'New' ? 'secondary' : 'outline'}
                            className={`text-xs px-1.5 py-0.5 min-w-0 ${
                              item.badge === 'Live' ? 'bg-emerald-500 text-white' :
                              item.badge === 'New' ? 'bg-blue-500 text-white' :
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            <span className="truncate">{item.badge}</span>
                          </Badge>
                        </div>
                      )}
                      {isActive && (
                        <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats Section */}
        {!isCollapsed && (
          <div className="mt-8 px-3">
            <div className="bg-gradient-to-br from-white/90 to-slate-50/90 rounded-xl p-4 border border-slate-200/50 shadow-sm">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Quick Stats</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">System Status</span>
                  <span className="text-emerald-600 font-medium">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Performance</span>
                  <span className="text-slate-700 font-medium">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200/30 bg-gradient-to-t from-slate-50/90 to-white/95">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-xl border border-slate-200/50 shadow-sm backdrop-blur-sm">
            <Avatar className="w-9 h-9 ring-2 ring-slate-200">
              <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-white font-bold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full bg-white/90 hover:bg-white hover:shadow-sm transition-all duration-200 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 group backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}