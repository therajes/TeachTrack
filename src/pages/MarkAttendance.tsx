import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Users, Clock, CheckCircle, Sparkles, Zap, Target, TrendingUp, Activity, Eye, Download, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

export default function MarkAttendance() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Mock data for faculty subjects
  const subjects = [
    { id: 'CS101', name: 'Computer Science 101', students: 45, room: 'A-201', instructor: 'Dr. Rajesh Barik', time: '2:00 PM' },
    { id: 'CS201', name: 'Database Systems', students: 38, room: 'B-105', instructor: 'Dr. Priya Sharma', time: '3:30 PM' },
    { id: 'CS301', name: 'Software Engineering', students: 52, room: 'C-301', instructor: 'Prof. Amit Singh', time: '4:45 PM' },
  ];

  const generateQRCode = async () => {
    if (!selectedSubject) {
      toast({
        title: "Error",
        description: "Please select a subject first",
        variant: "destructive"
      });
      return;
    }

    const sessionId = `${selectedSubject}-${Date.now()}`;
    const attendanceUrl = `${window.location.origin}/attend/${sessionId}`;
    
    try {
      const url = await QRCode.toDataURL(attendanceUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e40af',
          light: '#ffffff'
        }
      });
      
      setQrCodeUrl(url);
      setActiveSession(sessionId);
      setAttendanceCount(0);
      setSessionStartTime(new Date());
      
      toast({
        title: "QR Code Generated",
        description: "Students can now scan the QR code to mark attendance"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive"
      });
    }
  };

  const endSession = () => {
    setActiveSession(null);
    setQrCodeUrl('');
    setSessionStartTime(null);
    toast({
      title: "Session Ended",
      description: `Attendance marked for ${attendanceCount} students`
    });
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  const getSessionDuration = () => {
    if (!sessionStartTime) return '0:00';
    const now = new Date();
    const diff = now.getTime() - sessionStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const stats = [
    { title: 'Total Subjects', value: subjects.length, icon: Target, color: 'blue', change: '+2' },
    { title: 'Active Sessions', value: activeSession ? 1 : 0, icon: Activity, color: 'green', change: 'Live' },
    { title: 'Total Students', value: subjects.reduce((acc, s) => acc + s.students, 0), icon: Users, color: 'purple', change: '+15' },
    { title: 'Avg Attendance', value: '91.2%', icon: TrendingUp, color: 'orange', change: '+2.1%' }
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

  return (
    <div className="space-y-8 animate-fade-in p-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary via-education-secondary to-education-premium rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-education-secondary to-education-premium bg-clip-text text-transparent">
            Smart Attendance
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Generate QR codes for instant attendance tracking, monitor student participation in real-time, 
          and maintain accurate attendance records with our advanced system.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Subject Selection & QR Generation */}
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-primary" />
              <span>Generate QR Code</span>
            </CardTitle>
            <CardDescription>
              Select a subject and generate QR code for instant attendance tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Select Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="input-premium h-12">
                  <SelectValue placeholder="Choose a subject to start attendance" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-education-secondary/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {subject.room} • {subject.time} • {subject.instructor}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSubjectData && (
              <div className="p-4 bg-gradient-to-r from-primary/5 to-education-secondary/5 rounded-xl border border-primary/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Subject</p>
                    <p className="font-semibold text-foreground">{selectedSubjectData.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Room</p>
                    <p className="font-semibold text-foreground">{selectedSubjectData.room}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Students</p>
                    <p className="font-semibold text-primary">{selectedSubjectData.students}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Instructor</p>
                    <p className="font-semibold text-foreground">{selectedSubjectData.instructor}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {!activeSession ? (
                <Button 
                  onClick={generateQRCode} 
                  disabled={!selectedSubject}
                  className="w-full btn-premium h-12 text-lg font-semibold"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Generate QR Code
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button 
                    onClick={endSession}
                    variant="destructive"
                    className="w-full h-12 text-lg font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    End Session
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Session active for {getSessionDuration()}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced QR Code Display */}
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-primary" />
              <span>Attendance QR Code</span>
            </CardTitle>
            <CardDescription>
              Students scan this code to mark their attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {qrCodeUrl ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-primary/20">
                      <img src={qrCodeUrl} alt="Attendance QR Code" className="w-64 h-64" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-education-accent rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-education-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-education-success">Session Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Students can scan this QR code to mark attendance
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-gradient-to-r from-education-success/10 to-education-accent/10 rounded-xl border border-education-success/20">
                      <div className="text-2xl font-bold text-education-success">{attendanceCount}</div>
                      <p className="text-xs text-education-success/70">Marked</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-education-secondary/10 to-education-premium/10 rounded-xl border border-education-secondary/20">
                      <div className="text-2xl font-bold text-education-secondary">
                        {selectedSubjectData ? selectedSubjectData.students - attendanceCount : 0}
                      </div>
                      <p className="text-xs text-education-secondary/70">Remaining</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="btn-premium cursor-not-allowed opacity-60" disabled>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/10 cursor-not-allowed opacity-60" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl flex items-center justify-center mx-auto">
                  <QrCode className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-muted-foreground">No Active Session</p>
                  <p className="text-sm text-muted-foreground">
                    Select a subject and generate a QR code to start attendance tracking
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Attendance Feed */}
      {activeSession && (
        <Card className="card-premium">
          <CardHeader className="border-b border-muted/50">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Live Attendance Feed</span>
              <Badge variant="secondary" className="bg-education-success/20 text-education-success border-education-success/30">
                Live
              </Badge>
            </CardTitle>
            <CardDescription>
              Real-time updates as students mark their attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Session started {getSessionDuration()} ago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{attendanceCount} of {selectedSubjectData?.students} students</span>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-education-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Recent Activity</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mohit Tomar</span>
                    <span className="text-education-success">✓ Present</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Emily Johnson</span>
                    <span className="text-education-success">✓ Present</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Michael Brown</span>
                    <span className="text-education-success">✓ Present</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}