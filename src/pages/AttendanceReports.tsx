import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BarChart3, 
  Download, 
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  Target,
  Activity,
  Award,
  Eye,
  Filter,
  RefreshCw,
  PieChart,
  LineChart
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function AttendanceReports() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Mock data
  const subjects = [
    'Computer Science 101',
    'Database Systems',
    'Software Engineering',
    'Data Structures',
    'Operating Systems'
  ];

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering'
  ];

  const attendanceData = [
    {
      date: '2024-01-15',
      subject: 'Computer Science 101',
      present: 42,
      total: 45,
      percentage: 93.3,
      absentStudents: ['Mohit Tomar', 'Emily Johnson', 'Michael Brown'],
      instructor: 'Dr. Rajesh Barik',
      room: 'A-201'
    },
    {
      date: '2024-01-15',
      subject: 'Database Systems',
      present: 35,
      total: 38,
      percentage: 92.1,
      absentStudents: ['Sarah Davis', 'Tom Wilson', 'Lisa Chen'],
      instructor: 'Dr. Priya Sharma',
      room: 'B-105'
    },
    {
      date: '2024-01-14',
      subject: 'Software Engineering',
      present: 48,
      total: 52,
      percentage: 92.3,
      absentStudents: ['Alex Patel', 'Emma Singh', 'David Kumar', 'Maria Sharma'],
      instructor: 'Prof. Amit Singh',
      room: 'C-301'
    }
  ];

  const weeklyStats = [
    { day: 'Monday', attendance: 89.2, change: '+2.1%' },
    { day: 'Tuesday', attendance: 91.5, change: '+1.8%' },
    { day: 'Wednesday', attendance: 87.8, change: '-1.2%' },
    { day: 'Thursday', attendance: 93.1, change: '+3.4%' },
    { day: 'Friday', attendance: 85.4, change: '-2.7%' }
  ];

  const subjectStats = [
    { subject: 'Computer Science 101', avgAttendance: 91.2, totalClasses: 45, lowAttendanceCount: 3, instructor: 'Dr. Rajesh Barik' },
    { subject: 'Database Systems', avgAttendance: 88.7, totalClasses: 38, lowAttendanceCount: 5, instructor: 'Dr. Priya Sharma' },
    { subject: 'Software Engineering', avgAttendance: 93.4, totalClasses: 42, lowAttendanceCount: 2, instructor: 'Prof. Amit Singh' },
    { subject: 'Data Structures', avgAttendance: 86.1, totalClasses: 40, lowAttendanceCount: 7, instructor: 'Dr. Meera Patel' },
  ];

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`
    });
    
    // Mock export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${format.toUpperCase()} report downloaded successfully`
      });
    }, 2000);
  };

  const overallStats = [
    { title: 'Total Classes', value: '156', icon: CalendarIcon, color: 'blue', change: '+8%' },
    { title: 'Avg Attendance', value: '89.7%', icon: TrendingUp, color: 'green', change: '+2.1%' },
    { title: 'Total Students', value: '1,247', icon: Users, color: 'purple', change: '+12%' },
    { title: 'Reports Generated', value: '23', icon: FileText, color: 'orange', change: '+5' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-gray-500 to-gray-600';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-education-success';
    if (percentage >= 75) return 'text-education-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-8 animate-fade-in p-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-education-secondary to-education-premium rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-education-secondary to-education-premium bg-clip-text text-transparent">
            Attendance Analytics
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Comprehensive attendance reports, detailed analytics, and actionable insights to improve 
          student engagement and academic performance across all departments.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <Card 
            key={index} 
            className="card-premium group overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.title}
              </CardTitle>
              <div className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-sm text-muted-foreground font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Department</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48 input-premium">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-48 input-premium">
                    <Target className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
        </div>
        
            <div className="flex space-x-3">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10 cursor-not-allowed opacity-60" disabled>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="btn-premium cursor-not-allowed opacity-60" disabled>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Calendar */}
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>Date Selection</span>
            </CardTitle>
            <CardDescription>Choose dates for detailed reports</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
            />
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Weekly Trends</span>
            </CardTitle>
            <CardDescription>Attendance patterns this week</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{stat.day}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-education-success to-education-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stat.attendance}%` }}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">{stat.attendance}%</div>
                      <div className={`text-xs ${stat.change.startsWith('+') ? 'text-education-success' : 'text-destructive'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Subject Performance</span>
            </CardTitle>
            <CardDescription>Top performing subjects</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {subjectStats.slice(0, 3).map((stat, index) => (
                <div key={stat.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground truncate">{stat.subject}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        stat.avgAttendance >= 90 ? 'border-education-success text-education-success' :
                        stat.avgAttendance >= 75 ? 'border-education-warning text-education-warning' :
                        'border-destructive text-destructive'
                      }`}
                    >
                      {stat.avgAttendance}%
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        stat.avgAttendance >= 90 ? 'bg-gradient-to-r from-education-success to-education-accent' :
                        stat.avgAttendance >= 75 ? 'bg-gradient-to-r from-education-warning to-education-secondary' :
                        'bg-gradient-to-r from-destructive to-red-600'
                      }`}
                      style={{ width: `${stat.avgAttendance}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{stat.totalClasses} classes</span>
                    <span>{stat.lowAttendanceCount} low attendance</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Attendance Table */}
      <Card className="card-premium overflow-hidden">
        <CardHeader className="border-b border-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Detailed Attendance Records</span>
              </CardTitle>
              <CardDescription>
                Comprehensive attendance data with student details and performance metrics
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
            </div>
          </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Date & Subject</TableHead>
                  <TableHead className="font-semibold">Instructor</TableHead>
                  <TableHead className="font-semibold">Attendance</TableHead>
                  <TableHead className="font-semibold">Performance</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-muted/30 transition-colors duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {record.subject}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString()} • {record.room}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-education-secondary/20 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{record.instructor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Present</span>
                          <Badge variant="outline" className="bg-education-success/10 text-education-success border-education-success/30">
                            {record.present}/{record.total}
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              record.percentage >= 90 ? 'bg-gradient-to-r from-education-success to-education-accent' :
                              record.percentage >= 75 ? 'bg-gradient-to-r from-education-warning to-education-secondary' :
                              'bg-gradient-to-r from-destructive to-red-600'
                            }`}
                            style={{ width: `${record.percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`text-lg font-bold ${getAttendanceColor(record.percentage)}`}>
                          {record.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {record.absentStudents.length} absent
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-primary/10 cursor-not-allowed opacity-60" disabled>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-primary/10 cursor-not-allowed opacity-60" disabled>
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="card-premium">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Export Reports</h3>
              <p className="text-muted-foreground">
                Download comprehensive attendance reports in multiple formats for analysis and sharing
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="px-8 py-3 border-primary/30 hover:bg-primary/10 cursor-not-allowed opacity-60"
                disabled
              >
                <FileText className="w-5 h-5 mr-2" />
                CSV Export
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3 border-primary/30 hover:bg-primary/10 cursor-not-allowed opacity-60"
                disabled
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Excel Export
              </Button>
              <Button 
                className="btn-premium px-8 py-3 cursor-not-allowed opacity-60"
                disabled
              >
                <Download className="w-5 h-5 mr-2" />
                PDF Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}