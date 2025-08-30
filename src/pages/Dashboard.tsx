import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Sparkles,
  Award,
  Target,
  Zap,
  ArrowUpRight,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const adminStats = [
    { title: 'Total Students', value: '1,247', icon: Users, change: '+12%', trend: 'up', color: 'slate' },
    { title: 'Active Faculty', value: '89', icon: BookOpen, change: '+3%', trend: 'up', color: 'emerald' },
    { title: "Today's Attendance", value: '94.2%', icon: CheckCircle, change: '+2.1%', trend: 'up', color: 'blue' },
    { title: 'Total Classes', value: '156', icon: Calendar, change: '+8%', trend: 'up', color: 'violet' }
  ];

  const facultyStats = [
    { title: 'My Classes Today', value: '4', icon: BookOpen, change: 'Next: 2:00 PM', trend: 'neutral', color: 'slate' },
    { title: 'Students Present', value: '87/92', icon: CheckCircle, change: '94.6%', trend: 'up', color: 'emerald' },
    { title: 'Avg Attendance', value: '91.2%', icon: TrendingUp, change: '+1.5%', trend: 'up', color: 'blue' },
    { title: 'Classes This Week', value: '18', icon: Calendar, change: '3 remaining', trend: 'neutral', color: 'violet' }
  ];

  const studentStats = [
    { title: 'Overall Attendance', value: '89.5%', icon: CheckCircle, change: 'Good', trend: 'up', color: 'emerald' },
    { title: 'Classes Today', value: '5', icon: Calendar, change: 'Next: 3:00 PM', trend: 'neutral', color: 'slate' },
    { title: 'This Week', value: '18/20', icon: Clock, change: '90%', trend: 'up', color: 'blue' },
    { title: 'Low Attendance', value: '2 Subjects', icon: AlertCircle, change: 'Action needed', trend: 'down', color: 'red' }
  ];

  const getStats = () => {
    switch (user?.role) {
      case 'admin': return adminStats;
      case 'faculty': return facultyStats;
      case 'student': return studentStats;
      default: return [];
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    return `Good ${timeOfDay}, ${user?.name}!`;
  };

  const recentActivity = [
    { type: 'attendance', message: 'Attendance marked for CS101', time: '2 hours ago', icon: CheckCircle, color: 'emerald' },
    { type: 'student', message: 'New student registered', time: '4 hours ago', icon: Users, color: 'blue' },
    { type: 'report', message: 'Monthly report generated', time: '1 day ago', icon: TrendingUp, color: 'violet' },
    { type: 'faculty', message: 'Dr. Rajesh Barik joined', time: '2 days ago', icon: BookOpen, color: 'slate' },
  ];

  const upcomingClasses = [
    { subject: 'Computer Science 101', time: '2:00 PM', room: 'Room A-201', students: 45, instructor: 'Dr. Rajesh Barik', status: 'upcoming' },
    { subject: 'Database Systems', time: '3:30 PM', room: 'Room B-105', students: 38, instructor: 'Dr. Priya Sharma', status: 'upcoming' },
    { subject: 'Software Engineering', time: '4:45 PM', room: 'Room C-301', students: 52, instructor: 'Prof. Amit Singh', status: 'upcoming' },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-emerald-600" />;
    if (trend === 'down') return <ArrowUpRight className="w-4 h-4 text-red-600 rotate-90" />;
    return <Activity className="w-4 h-4 text-slate-600" />;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      slate: 'from-slate-500 to-slate-600',
      emerald: 'from-emerald-500 to-emerald-600',
      blue: 'from-blue-500 to-blue-600',
      violet: 'from-violet-500 to-violet-600',
      red: 'from-red-500 to-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="space-y-8 animate-fade-in p-6">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 p-8 border border-slate-200/50">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                {getWelcomeMessage()}
              </h1>
              <p className="text-xl text-slate-600 mt-2">
                {user?.role === 'admin' && 'Monitor and manage your institution\'s attendance system with real-time insights.'}
                {user?.role === 'faculty' && 'Track attendance for your classes and view comprehensive analytics.'}
                {user?.role === 'student' && 'View your attendance records and stay updated with upcoming classes.'}
              </p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg shadow-sm cursor-not-allowed opacity-60" disabled>
              Quick Actions
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg border-slate-300 hover:bg-slate-50 text-slate-700 cursor-not-allowed opacity-60" disabled>
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <Card 
            key={index} 
            className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors duration-200">
                {stat.title}
              </CardTitle>
              <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(stat.trend)}
                <p className="text-sm text-slate-600 font-medium">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Recent Activity */}
        <Card className="border-slate-200/50">
          <CardHeader className="border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-slate-700" />
                <span>Recent Activity</span>
              </CardTitle>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                Live Updates
              </Badge>
            </div>
            <CardDescription>Latest activities across the system</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 p-4 hover:bg-slate-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(activity.color)} rounded-xl flex items-center justify-center shadow-sm`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Classes */}
        <Card className="border-slate-200/50">
          <CardHeader className="border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-slate-700" />
                <span>{user?.role === 'student' ? 'Upcoming Classes' : 'Today\'s Schedule'}</span>
              </CardTitle>
              <Badge variant="outline" className="border-slate-300 text-slate-700">
                {upcomingClasses.length} Classes
              </Badge>
            </div>
            <CardDescription>Your next scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {upcomingClasses.map((classItem, index) => (
                <div 
                  key={index} 
                  className="p-4 hover:bg-slate-50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{classItem.subject}</h4>
                      <p className="text-sm text-slate-500">{classItem.instructor}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-100 text-blue-700 border-blue-200"
                    >
                      {classItem.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{classItem.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{classItem.room}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">{classItem.students}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="border-slate-200/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-slate-700" />
                <span>Performance Overview</span>
              </CardTitle>
              <CardDescription>Key metrics and trends for this month</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 text-slate-700">
                This Month
              </Button>
              <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 text-slate-700">
                Last Month
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">94.2%</h3>
              <p className="text-sm text-emerald-600/70 font-medium">Overall Attendance</p>
              <div className="mt-3">
                <Progress value={94.2} className="h-2" />
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">1,247</h3>
              <p className="text-sm text-blue-600/70 font-medium">Active Students</p>
              <div className="mt-3">
                <Progress value={85} className="h-2" />
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl border border-violet-200/50">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-violet-700 mb-2">89</h3>
              <p className="text-sm text-violet-600/70 font-medium">Faculty Members</p>
              <div className="mt-3">
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}