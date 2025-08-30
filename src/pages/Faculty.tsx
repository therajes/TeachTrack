import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Users, GraduationCap, Mail, Phone } from 'lucide-react';

export default function Faculty() {
  const facultyMembers = [
    {
      id: '1',
      name: 'Dr. Rajesh Barik',
      email: 'rajesh.barik@school.edu',
      phone: '+91 98765 43210',
      department: 'Computer Science',
      subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
      experience: '15 years',
      qualification: 'Ph.D. Computer Science',
      totalStudents: 156,
      avgAttendance: 91.2
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@school.edu',
      phone: '+91 98765 43211',
      department: 'Computer Science',
      subjects: ['Software Engineering', 'Web Development'],
      experience: '12 years',
      qualification: 'Ph.D. Software Engineering',
      totalStudents: 124,
      avgAttendance: 89.5
    },
    {
      id: '3',
      name: 'Prof. Amit Singh',
      email: 'amit.singh@school.edu',
      phone: '+91 98765 43212',
      department: 'Computer Science',
      subjects: ['Operating Systems', 'Computer Networks'],
      experience: '10 years',
      qualification: 'M.Tech Computer Science',
      totalStudents: 98,
      avgAttendance: 87.8
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold animate-slide-up">Faculty Management</h1>
        <p className="text-muted-foreground animate-slide-up">Manage faculty members and their information</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{facultyMembers.length}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-education-success">
              {facultyMembers.reduce((acc, faculty) => acc + faculty.totalStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all faculty</p>
          </CardContent>
        </Card>

        <Card className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-education-accent">
              {(facultyMembers.reduce((acc, faculty) => acc + faculty.avgAttendance, 0) / facultyMembers.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Department average</p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {facultyMembers.map((faculty, index) => (
          <Card 
            key={faculty.id} 
            className="animate-slide-up hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-2 hover:border-primary/20"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-education-secondary text-primary-foreground font-bold text-lg">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{faculty.name}</CardTitle>
                  <CardDescription className="text-education-secondary font-medium">
                    {faculty.department}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{faculty.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {faculty.subjects.map(subject => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Experience</p>
                  <p className="font-semibold">{faculty.experience}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Students</p>
                  <p className="font-semibold text-primary">{faculty.totalStudents}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Attendance</span>
                  <Badge 
                    variant={faculty.avgAttendance >= 90 ? "default" : faculty.avgAttendance >= 75 ? "secondary" : "destructive"}
                    className="font-semibold"
                  >
                    {faculty.avgAttendance}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}