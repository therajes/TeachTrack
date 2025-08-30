import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Mail, 
  Phone, 
  Star,
  TrendingUp,
  Award,
  Sparkles,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

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
      avgAttendance: 91.2,
      rating: 4.8,
      researchPapers: 23,
      awards: ['Best Teacher 2023', 'Research Excellence']
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@school.edu',
      phone: '+91 98765 43211',
      department: 'Computer Science',
      subjects: ['Software Engineering', 'Web Development', 'Cloud Computing'],
      experience: '12 years',
      qualification: 'Ph.D. Software Engineering',
      totalStudents: 124,
      avgAttendance: 89.5,
      rating: 4.6,
      researchPapers: 18,
      awards: ['Innovation Award 2022']
    },
    {
      id: '3',
      name: 'Prof. Amit Singh',
      email: 'amit.singh@school.edu',
      phone: '+91 98765 43212',
      department: 'Computer Science',
      subjects: ['Operating Systems', 'Computer Networks', 'Cybersecurity'],
      experience: '10 years',
      qualification: 'M.Tech Computer Science',
      totalStudents: 98,
      avgAttendance: 87.8,
      rating: 4.4,
      researchPapers: 15,
      awards: ['Young Faculty Award 2021']
    },
    {
      id: '4',
      name: 'Dr. Meera Patel',
      email: 'meera.patel@school.edu',
      phone: '+91 98765 43213',
      department: 'Computer Science',
      subjects: ['Machine Learning', 'AI', 'Data Science'],
      experience: '8 years',
      qualification: 'Ph.D. Artificial Intelligence',
      totalStudents: 112,
      avgAttendance: 93.1,
      rating: 4.9,
      researchPapers: 31,
      awards: ['AI Research Award 2023', 'Student Choice Award']
    }
  ];

  const departmentStats = {
    totalFaculty: facultyMembers.length,
    totalStudents: facultyMembers.reduce((acc, faculty) => acc + faculty.totalStudents, 0),
    avgAttendance: (facultyMembers.reduce((acc, faculty) => acc + faculty.avgAttendance, 0) / facultyMembers.length).toFixed(1),
    avgRating: (facultyMembers.reduce((acc, faculty) => acc + faculty.rating, 0) / facultyMembers.length).toFixed(1),
    totalResearchPapers: facultyMembers.reduce((acc, faculty) => acc + faculty.researchPapers, 0)
  };

  return (
    <div className="space-y-8 animate-fade-in p-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Faculty Excellence
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Meet our distinguished faculty members who are shaping the future of computer science education 
          through innovative teaching methods and cutting-edge research.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Faculty</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-sm">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{departmentStats.totalFaculty}</div>
            <p className="text-xs text-slate-600 font-medium">Distinguished educators</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Total Students</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{departmentStats.totalStudents}</div>
            <p className="text-xs text-slate-600 font-medium">Across all programs</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg Attendance</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{departmentStats.avgAttendance}%</div>
            <p className="text-xs text-slate-600 font-medium">Department average</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Avg Rating</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-sm">
              <Star className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{departmentStats.avgRating}/5.0</div>
            <p className="text-xs text-slate-600 font-medium">Student satisfaction</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-200 hover:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Research Papers</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-sm">
              <Award className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{departmentStats.totalResearchPapers}</div>
            <p className="text-xs text-slate-600 font-medium">Published works</p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {facultyMembers.map((faculty, index) => (
          <Card 
            key={faculty.id} 
            className="group overflow-hidden border-slate-200/50 hover:border-slate-300 transition-all duration-300 hover:shadow-sm"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {/* Premium Header with Gradient */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 ring-4 ring-slate-200 shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-white font-bold text-xl">
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                        {faculty.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-slate-600">
                        {faculty.department}
                      </CardDescription>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(faculty.rating) 
                                  ? 'text-amber-400 fill-current' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-slate-500">
                          {faculty.rating}/5.0
                        </span>
                      </div>
                    </div>
                  </div>
                                      <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="hover:bg-slate-100 cursor-not-allowed opacity-60" disabled>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-slate-100 cursor-not-allowed opacity-60" disabled>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-slate-100 cursor-not-allowed opacity-60" disabled>
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                </div>
              </CardHeader>
            </div>
            
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium truncate text-slate-700">{faculty.email}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{faculty.phone}</span>
                </div>
              </div>

              {/* Subjects */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">Expertise Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {faculty.subjects.map(subject => (
                    <Badge 
                      key={subject} 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-slate-100 text-slate-700 border-slate-200 hover:scale-105 transition-transform duration-200"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
                  <p className="text-xs text-slate-600 font-medium">Experience</p>
                  <p className="text-lg font-bold text-emerald-700">{faculty.experience}</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                  <p className="text-xs text-slate-600 font-medium">Students</p>
                  <p className="text-lg font-bold text-blue-700">{faculty.totalStudents}</p>
                </div>
              </div>

              {/* Research & Awards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-violet-50 to-violet-100/50 rounded-xl border border-violet-200/50">
                  <span className="text-sm font-medium text-violet-700">Research Papers</span>
                  <Badge variant="default" className="bg-violet-600 text-white">
                    {faculty.researchPapers}
                  </Badge>
                </div>
                {faculty.awards.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900">Awards & Recognition:</p>
                    <div className="flex flex-wrap gap-2">
                      {faculty.awards.map(award => (
                        <Badge 
                          key={award} 
                          variant="outline" 
                          className="text-xs px-2 py-1 bg-amber-50 text-amber-700 border-amber-200"
                        >
                          🏆 {award}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Attendance Performance */}
              <div className="pt-4 border-t border-slate-200/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Attendance Performance</span>
                  <Badge 
                    variant={faculty.avgAttendance >= 90 ? "default" : faculty.avgAttendance >= 75 ? "secondary" : "destructive"}
                    className="font-semibold px-3 py-1"
                  >
                    {faculty.avgAttendance}%
                  </Badge>
                </div>
                <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${faculty.avgAttendance}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <Card className="border-slate-200/50 bg-gradient-to-r from-slate-50 to-slate-100/50">
          <CardContent className="py-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-slate-700" />
              <h3 className="text-2xl font-bold text-slate-900">Join Our Faculty Team</h3>
              <Sparkles className="w-8 h-8 text-slate-700" />
            </div>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Are you passionate about computer science education? We're always looking for talented educators 
              to join our distinguished faculty team and help shape the future of technology education.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg shadow-sm cursor-not-allowed opacity-60" disabled>
                Apply Now
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg border-slate-300 hover:bg-slate-50 text-slate-700 cursor-not-allowed opacity-60" disabled>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}