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
  FileText
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
      absentStudents: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      date: '2024-01-15',
      subject: 'Database Systems',
      present: 35,
      total: 38,
      percentage: 92.1,
      absentStudents: ['Sarah Wilson', 'Tom Brown', 'Lisa Davis']
    },
    {
      date: '2024-01-14',
      subject: 'Software Engineering',
      present: 48,
      total: 52,
      percentage: 92.3,
      absentStudents: ['Alex Chen', 'Emma White', 'David Lee', 'Maria Garcia']
    }
  ];

  const weeklyStats = [
    { day: 'Monday', attendance: 89.2 },
    { day: 'Tuesday', attendance: 91.5 },
    { day: 'Wednesday', attendance: 87.8 },
    { day: 'Thursday', attendance: 93.1 },
    { day: 'Friday', attendance: 85.4 }
  ];

  const subjectStats = [
    { subject: 'Computer Science 101', avgAttendance: 91.2, totalClasses: 45, lowAttendanceCount: 3 },
    { subject: 'Database Systems', avgAttendance: 88.7, totalClasses: 38, lowAttendanceCount: 5 },
    { subject: 'Software Engineering', avgAttendance: 93.4, totalClasses: 42, lowAttendanceCount: 2 },
    { subject: 'Data Structures', avgAttendance: 86.1, totalClasses: 40, lowAttendanceCount: 7 },
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
        description: `Report exported as ${format.toUpperCase()}`
      });
    }, 1500);
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge className="bg-green-500">Excellent</Badge>;
    if (percentage >= 75) return <Badge className="bg-yellow-500">Good</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Reports</h1>
          <p className="text-muted-foreground">View detailed attendance analytics and export reports</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.7%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 completed, 4 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Present</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-muted-foreground">out of 1,290 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Attendance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">students below 75%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter reports by date and subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All subjects" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Daily Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>Attendance breakdown for selected date</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.subject}</TableCell>
                    <TableCell>{record.present}</TableCell>
                    <TableCell>{record.total}</TableCell>
                    <TableCell>{record.percentage}%</TableCell>
                    <TableCell>{getAttendanceBadge(record.percentage)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
          <CardDescription>Average attendance by day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {weeklyStats.map((day) => (
              <div key={day.day} className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">{day.day}</p>
                <p className="text-2xl font-bold mt-2">{day.attendance}%</p>
                <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${day.attendance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Statistics</CardTitle>
          <CardDescription>Detailed attendance statistics by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Avg Attendance</TableHead>
                <TableHead>Total Classes</TableHead>
                <TableHead>Students Below 75%</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectStats.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{subject.subject}</TableCell>
                  <TableCell>{subject.avgAttendance}%</TableCell>
                  <TableCell>{subject.totalClasses}</TableCell>
                  <TableCell>{subject.lowAttendanceCount}</TableCell>
                  <TableCell>{getAttendanceBadge(subject.avgAttendance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}