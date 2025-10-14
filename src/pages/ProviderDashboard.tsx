import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Heart, 
  User, 
  Users, 
  FileText, 
  Stethoscope,
  Activity,
  Bell,
  Settings,
  LogOut,
  Phone,
  MessageCircle,
  Plus,
  Search,
  TrendingUp,
  AlertTriangle,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { SettingsPanel } from "@/components/SettingsPanel";

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-foreground">Medi-Path</h1>
                <p className="text-xs text-muted-foreground">Provider Dashboard</p>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => alert('Notifications coming soon!')}>
                <Bell className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Notifications</span>
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">3</Badge>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Settings</span>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Logout</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => alert('Notifications coming soon!')}>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">3</Badge>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link to="/login">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Good morning, Dr. Sarah Johnson
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            You have 8 appointments today and 2 urgent patients requiring attention.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto p-1 rounded-lg border bg-muted/50">
            <TabsTrigger value="overview" className="text-xs sm:text-sm py-2">Overview</TabsTrigger>
            <TabsTrigger value="patients" className="text-xs sm:text-sm py-2">Patients</TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs sm:text-sm py-2">Schedule</TabsTrigger>
            <TabsTrigger value="records" className="text-xs sm:text-sm py-2 hidden sm:inline-flex">Records</TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm py-2 hidden sm:inline-flex">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold">8</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold">142</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Active Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold">2</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Urgent Cases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold">95%</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Patient Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule & Urgent Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Today's Schedule</CardTitle>
                  <CardDescription>Your upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between border-l-4 border-primary pl-3 sm:pl-4">
                    <div>
                      <p className="font-medium text-sm sm:text-base">John Smith - Follow-up</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">9:00 AM - 9:30 AM</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Next</Badge>
                  </div>
                  <div className="flex items-center justify-between border-l-4 border-muted pl-3 sm:pl-4">
                    <div>
                      <p className="font-medium text-sm sm:text-base">Maria Garcia - Consultation</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">10:00 AM - 10:45 AM</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between border-l-4 border-muted pl-3 sm:pl-4">
                    <div>
                      <p className="font-medium text-sm sm:text-base">David Wilson - Check-up</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">11:00 AM - 11:30 AM</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">Scheduled</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Full Schedule
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Priority Alerts</CardTitle>
                  <CardDescription>Patients requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-destructive text-sm sm:text-base">Critical Lab Results</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Patient: Emily Chen</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Elevated cardiac enzymes detected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-yellow-700 dark:text-yellow-400 text-sm sm:text-base">Medication Review Due</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Patient: Robert Taylor</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Diabetes medication adjustment needed</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                <CardDescription>Frequently used tools and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <Button className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm" variant="outline">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>New Patient</span>
                  </Button>
                  <Button className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm" variant="outline">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Schedule</span>
                  </Button>
                  <Button className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm" variant="outline">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Prescription</span>
                  </Button>
                  <Button className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm" variant="outline">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Message</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Patient Management</CardTitle>
                    <CardDescription>Search and manage your patient roster</CardDescription>
                  </div>
                  <Button size="sm" className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Patient
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients by name or ID..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">Filter</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-border/20 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base">John Smith</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">ID: PAT-001 • Age: 45 • Last visit: Dec 8, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2">
                      <Badge variant="outline" className="text-xs">Diabetes</Badge>
                      <Button size="sm" variant="outline" className="text-xs">View Profile</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border border-border/20 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base">Maria Garcia</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">ID: PAT-002 • Age: 32 • Last visit: Dec 10, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2">
                      <Badge variant="outline" className="text-xs">Hypertension</Badge>
                      <Button size="sm" variant="outline" className="text-xs">View Profile</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Appointment Schedule</CardTitle>
                    <CardDescription>Manage your daily appointments and availability</CardDescription>
                  </div>
                  <Button size="sm" className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Desktop Schedule Grid */}
                <div className="hidden md:block space-y-4">
                  <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-muted-foreground">
                    <div>Time</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-4 text-sm">
                    <div className="text-muted-foreground">9:00 AM</div>
                    <div className="p-2 bg-primary/10 rounded text-primary text-xs">John Smith</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                    <div className="p-2 bg-secondary/10 rounded text-secondary text-xs">Maria Garcia</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                    <div className="p-2 bg-accent/10 rounded text-accent text-xs">David Wilson</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-4 text-sm">
                    <div className="text-muted-foreground">10:00 AM</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                    <div className="p-2 bg-primary/10 rounded text-primary text-xs">Emily Chen</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                    <div className="p-2 bg-secondary/10 rounded text-secondary text-xs">Robert Taylor</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                    <div className="p-2 bg-muted/50 rounded text-xs">Available</div>
                  </div>
                </div>

                {/* Mobile Schedule List */}
                <div className="md:hidden space-y-3">
                  <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">9:00 AM - Monday</p>
                      <Badge variant="outline" className="text-xs">Booked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">John Smith</p>
                  </div>
                  <div className="p-3 border border-secondary/20 bg-secondary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">9:00 AM - Wednesday</p>
                      <Badge variant="outline" className="text-xs">Booked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Maria Garcia</p>
                  </div>
                  <div className="p-3 border border-accent/20 bg-accent/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">9:00 AM - Friday</p>
                      <Badge variant="outline" className="text-xs">Booked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">David Wilson</p>
                  </div>
                  <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">10:00 AM - Tuesday</p>
                      <Badge variant="outline" className="text-xs">Booked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Emily Chen</p>
                  </div>
                  <div className="p-3 border border-secondary/20 bg-secondary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">10:00 AM - Thursday</p>
                      <Badge variant="outline" className="text-xs">Booked</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Robert Taylor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Medical Records</CardTitle>
                <CardDescription>Access and manage patient medical records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search records by patient name or record ID..." className="pl-10" />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">Filter by Date</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 border border-border/20 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm sm:text-base">Cardiology Consultation - John Smith</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Dec 8, 2024 • Dr. Sarah Johnson</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs">
                      <FileText className="w-4 h-4 mr-2" />
                      View Record
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 sm:p-4 border border-border/20 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm sm:text-base">Lab Results - Maria Garcia</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Dec 10, 2024 • Complete Blood Count</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto text-xs">
                      <FileText className="w-4 h-4 mr-2" />
                      View Record
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Analytics & Reports</CardTitle>
                <CardDescription>Practice insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">142</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-secondary">95%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold text-accent">32</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Appointments This Week</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Monthly Performance Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Patient Demographics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Treatment Outcomes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <SettingsPanel 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default ProviderDashboard;