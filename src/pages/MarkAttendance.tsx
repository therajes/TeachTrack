import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Users, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import QRCode from 'qrcode';

export default function MarkAttendance() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [attendanceCount, setAttendanceCount] = useState(0);

  // Mock data for faculty subjects
  const subjects = [
    { id: 'CS101', name: 'Computer Science 101', students: 45, room: 'A-201' },
    { id: 'CS201', name: 'Database Systems', students: 38, room: 'B-105' },
    { id: 'CS301', name: 'Software Engineering', students: 52, room: 'C-301' },
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
    toast({
      title: "Session Ended",
      description: `Attendance marked for ${attendanceCount} students`
    });
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mark Attendance</h1>
        <p className="text-muted-foreground">Generate QR codes for students to mark their attendance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Selection & QR Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="w-5 h-5 mr-2" />
              Generate QR Code
            </CardTitle>
            <CardDescription>
              Select a subject and generate QR code for attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Room {subject.room} • {subject.students} students
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSubjectData && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold">{selectedSubjectData.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {selectedSubjectData.students} students
                  </span>
                  <span>Room {selectedSubjectData.room}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={generateQRCode}
                disabled={!selectedSubject || !!activeSession}
                className="flex-1"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              
              {activeSession && (
                <Button 
                  variant="outline"
                  onClick={endSession}
                >
                  End Session
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Active Session
            </CardTitle>
            <CardDescription>
              {activeSession ? 'QR code for current session' : 'No active session'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeSession && qrCodeUrl ? (
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg inline-block border">
                  <img src={qrCodeUrl} alt="Attendance QR Code" className="w-64 h-64" />
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-sm">
                    Session: {activeSession}
                  </Badge>
                  
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {attendanceCount} students marked present
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                  Students should scan this QR code with their phone camera or QR scanner app
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <QrCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generate a QR code to start attendance session</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Your recent attendance sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: 'Computer Science 101', date: 'Today, 10:00 AM', present: 42, total: 45, percentage: 93.3 },
              { subject: 'Database Systems', date: 'Yesterday, 2:00 PM', present: 35, total: 38, percentage: 92.1 },
              { subject: 'Software Engineering', date: '2 days ago, 3:30 PM', present: 48, total: 52, percentage: 92.3 },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{session.subject}</h4>
                  <p className="text-sm text-muted-foreground">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.present}/{session.total}</p>
                  <p className="text-sm text-muted-foreground">{session.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}