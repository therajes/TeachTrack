import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  avatar?: string;
  attendancePercentage: number;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Mohit Tomar',
      rollNo: 'CS2021001',
      email: 'mohit.tomar@student.edu',
      phone: '+1 234 567 8901',
      department: 'Computer Science',
      batch: '2021-2025',
      attendancePercentage: 89.5
    },
    {
      id: '2',
      name: 'Emily Johnson',
      rollNo: 'CS2021002',
      email: 'emily.johnson@student.edu',
      phone: '+1 234 567 8902',
      department: 'Computer Science',
      batch: '2021-2025',
      attendancePercentage: 94.2
    },
    {
      id: '3',
      name: 'Michael Brown',
      rollNo: 'CS2020015',
      email: 'michael.brown@student.edu',
      phone: '+1 234 567 8903',
      department: 'Computer Science',
      batch: '2020-2024',
      attendancePercentage: 76.8
    },
    {
      id: '4',
      name: 'Sarah Davis',
      rollNo: 'CS2021003',
      email: 'sarah.davis@student.edu',
      phone: '+1 234 567 8904',
      department: 'Computer Science',
      batch: '2021-2025',
      attendancePercentage: 91.3
    },
    {
      id: '5',
      name: 'Alex Chen',
      rollNo: 'CS2021004',
      email: 'alex.chen@student.edu',
      phone: '+1 234 567 8905',
      department: 'Computer Science',
      batch: '2021-2025',
      attendancePercentage: 88.7
    },
    {
      id: '6',
      name: 'Priya Patel',
      rollNo: 'CS2021005',
      email: 'priya.patel@student.edu',
      phone: '+1 234 567 8906',
      department: 'Computer Science',
      batch: '2021-2025',
      attendancePercentage: 95.1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    department: '',
    batch: ''
  });

  const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'];
  const batches = ['2020-2024', '2021-2025', '2022-2026', '2023-2027'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || student.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo || !newStudent.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const student: Student = {
      ...newStudent,
      id: Date.now().toString(),
      attendancePercentage: 0
    };

    setStudents([...students, student]);
    setNewStudent({ name: '', rollNo: '', email: '', phone: '', department: '', batch: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Student added successfully"
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast({
      title: "Student Deleted",
      description: "Student has been removed from the system"
    });
  };

  const getAttendanceBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return 'default';
    if (percentage >= 75) return 'secondary';
    return 'destructive';
  };

  const stats = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'slate', change: '+12%' },
    { title: 'Active Students', value: students.filter(s => s.attendancePercentage > 0).length, icon: GraduationCap, color: 'emerald', change: '+8%' },
    { title: 'Avg Attendance', value: `${(students.reduce((acc, s) => acc + s.attendancePercentage, 0) / students.length).toFixed(1)}%`, icon: TrendingUp, color: 'blue', change: '+2.1%' },
    { title: 'Low Attendance', value: students.filter(s => s.attendancePercentage < 75).length, icon: Target, color: 'amber', change: '-3%' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      slate: 'from-slate-500 to-slate-600',
      emerald: 'from-emerald-500 to-emerald-600',
      blue: 'from-blue-500 to-blue-600',
      amber: 'from-amber-500 to-amber-600',
      red: 'from-red-500 to-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="space-y-8 animate-fade-in p-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">
            Student Excellence
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Manage and monitor student records, track attendance performance, and ensure academic success 
          through comprehensive student management tools.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
              <p className="text-sm text-slate-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Actions Bar */}
      <Card className="border-slate-200/50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48 border-slate-300 focus:border-slate-400 focus:ring-slate-400">
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
            
            <div className="flex space-x-3">
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5 text-slate-700" />
                      <span>Add New Student</span>
                    </DialogTitle>
                    <DialogDescription>
                      Enter student information to add them to the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                          placeholder="Mohit Tomar"
                          className="border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rollNo">Roll Number</Label>
                        <Input
                          id="rollNo"
                          value={newStudent.rollNo}
                          onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                          placeholder="CS2021001"
                          className="border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                        placeholder="student@school.edu"
                        className="border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newStudent.phone}
                          onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                          placeholder="+1 234 567 8900"
                          className="border-slate-300 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={newStudent.department} onValueChange={(value) => setNewStudent({...newStudent, department: value})}>
                          <SelectTrigger className="border-slate-300 focus:border-slate-400 focus:ring-slate-400">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Select value={newStudent.batch} onValueChange={(value) => setNewStudent({...newStudent, batch: value})}>
                        <SelectTrigger className="border-slate-300 focus:border-slate-400 focus:ring-slate-400">
                          <SelectValue placeholder="Select Batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batches.map(batch => (
                            <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <Button 
                        onClick={handleAddStudent} 
                        className="bg-slate-900 hover:bg-slate-800 text-white flex-1 shadow-sm"
                      >
                        Add Student
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                        className="flex-1 border-slate-300 hover:bg-slate-50 text-slate-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Students Table */}
      <Card className="border-slate-200/50 overflow-hidden">
        <CardHeader className="border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-slate-700" />
                <span>Student Records</span>
              </CardTitle>
              <CardDescription>
                {filteredStudents.length} students found • {students.length} total in system
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-semibold text-slate-700">Student</TableHead>
                  <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                  <TableHead className="font-semibold text-slate-700">Academic</TableHead>
                  <TableHead className="font-semibold text-slate-700">Performance</TableHead>
                  <TableHead className="font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow 
                    key={student.id} 
                    className="hover:bg-slate-50 transition-colors duration-200 group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 ring-2 ring-slate-200 shadow-sm">
                          <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-white font-semibold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                            {student.name}
                          </p>
                          <p className="text-sm text-slate-500">{student.rollNo}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-3 h-3 text-slate-600" />
                          <span className="truncate max-w-32 text-slate-700">{student.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-3 h-3 text-slate-600" />
                          <span className="text-slate-700">{student.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {student.department}
                        </Badge>
                        <p className="text-sm text-slate-500">{student.batch}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">Attendance</span>
                          <Badge 
                            variant={getAttendanceBadgeVariant(student.attendancePercentage)}
                            className="font-semibold"
                          >
                            {student.attendancePercentage}%
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              student.attendancePercentage >= 90 
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                                : student.attendancePercentage >= 75 
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                                : 'bg-gradient-to-r from-red-500 to-red-600'
                            }`}
                            style={{ width: `${student.attendancePercentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="hover:bg-slate-100 cursor-not-allowed opacity-60" disabled>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-slate-100 cursor-not-allowed opacity-60" disabled>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-red-50 text-red-600 cursor-not-allowed opacity-60"
                          disabled
                        >
                          <Trash2 className="w-4 h-4" />
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
    </div>
  );
}