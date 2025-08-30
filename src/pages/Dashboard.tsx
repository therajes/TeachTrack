import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  GraduationCap
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const adminStats = [
    { title: 'Total Students', value: '1,247', icon: Users, change: '+12%' },
    { title: 'Active Faculty', value: '89', icon: BookOpen, change: '+3%' },
    { title: "Today's Attendance", value: '94.2%', icon: CheckCircle, change: '+2.1%' },
    { title: 'Total Classes', value: '156', icon: Calendar, change: '+8%' }
  ];

  const facultyStats = [
    { title: 'My Classes Today', value: '4', icon: BookOpen, change: 'Next: 2:00 PM' },
    { title: 'Students Present', value: '87/92', icon: CheckCircle, change: '94.6%' },
    { title: 'Avg Attendance', value: '91.2%', icon: TrendingUp, change: '+1.5%' },
    { title: 'Classes This Week', value: '18', icon: Calendar, change: '3 remaining' }
  ];

  const studentStats = [
    { title: 'Overall Attendance', value: '89.5%', icon: CheckCircle, change: 'Good' },
    { title: 'Classes Today', value: '5', icon: Calendar, change: 'Next: 3:00 PM' },
    { title: 'This Week', value: '18/20', icon: Clock, change: '90%' },
    { title: 'Low Attendance', value: '2 Subjects', icon: AlertCircle, change: 'Action needed' }
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
    { type: 'attendance', message: 'Attendance marked for CS101', time: '2 hours ago' },
    { type: 'student', message: 'New student registered', time: '4 hours ago' },
    { type: 'report', message: 'Monthly report generated', time: '1 day ago' },
  ];

  const upcomingClasses = [
    { subject: 'Computer Science 101', time: '2:00 PM', room: 'Room A-201', students: 45 },
    { subject: 'Database Systems', time: '3:30 PM', room: 'Room B-105', students: 38 },
    { subject: 'Software Engineering', time: '4:45 PM', room: 'Room C-301', students: 52 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' && 'Monitor and manage your institution\'s attendance system.'}
          {user?.role === 'faculty' && 'Track attendance for your classes and view analytics.'}
          {user?.role === 'student' && 'View your attendance records and upcoming classes.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats().map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions or Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {user?.role === 'student' ? 'Upcoming Classes' : 'Today\'s Schedule'}
            </CardTitle>
            <CardDescription>
              {user?.role === 'student' ? 'Your next classes' : 'Classes scheduled for today'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{cls.subject}</h4>
                  <p className="text-sm text-muted-foreground">{cls.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{cls.time}</p>
                  <p className="text-sm text-muted-foreground">{cls.students} students</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Attendance Overview or Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {user?.role === 'student' ? 'Attendance Overview' : 'Recent Activity'}
            </CardTitle>
            <CardDescription>
              {user?.role === 'student' ? 'Your attendance by subject' : 'Latest system activity'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.role === 'student' ? (
              <>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Computer Science</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mathematics</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Physics</span>
                      <span className="text-sm font-medium text-education-warning">68%</span>
                    </div>
                    <Progress value={68} className="h-2 bg-education-warning/20" />
                    <Badge variant="outline" className="mt-1 text-xs">Below 75%</Badge>
                  </div>
                </div>
              </>
            ) : (
              <>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}