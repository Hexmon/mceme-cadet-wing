import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { CourseCard } from "@/components/courses/CourseCard";
import { DossierSection } from "@/components/courses/DossierSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FileText, BarChart3, Calendar, Settings, Search, User, LogOut } from "lucide-react";

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // Logout logic will be implemented here
    console.log("Logout clicked");
  };

  // Course sections based on the dossier image
  const courseSections = [
    { title: "Dossier Insp Sheet", pageRange: "5-6", progress: 100, status: "completed" as const, description: "Initial inspection and verification documents" },
    { title: "Pers Particulars", pageRange: "7-10", progress: 90, status: "in-progress" as const, description: "Personal details and background information" },
    { title: "SSB Report", pageRange: "11", progress: 75, status: "in-progress" as const, description: "Services Selection Board assessment report" },
    { title: "Med Info", pageRange: "12-14", progress: 60, status: "in-progress" as const, description: "Medical examination records and fitness reports" },
    { title: "Discp Record", pageRange: "15-16", progress: 0, status: "pending" as const, description: "Disciplinary actions and conduct records" },
    { title: "Record of Comm with Parent/Guardian", pageRange: "17-22", progress: 0, status: "pending" as const, description: "Communication logs with family members" },
    { title: "Acad", pageRange: "23-30", progress: 80, status: "in-progress" as const, description: "Academic performance and course records" },
    { title: "Phy Trg", pageRange: "31-37", progress: 85, status: "in-progress" as const, description: "Physical training assessments and progress" },
    { title: "Sports/Games & Motivation Awards", pageRange: "38-39", progress: 40, status: "in-progress" as const, description: "Sports participation and achievement records" },
    { title: "Wpn Trg", pageRange: "40", progress: 20, status: "pending" as const, description: "Weapons training and proficiency records" },
    { title: "Obstacle Trg", pageRange: "41", progress: 30, status: "pending" as const, description: "Obstacle course training and performance" },
    { title: "Camps", pageRange: "42-44", progress: 0, status: "pending" as const, description: "Training camp participation and reports" },
    { title: "Club & Drill", pageRange: "45", progress: 70, status: "in-progress" as const, description: "Drill practice and club activities" },
    { title: "Credit For Excellence (CFE)", pageRange: "46-47", progress: 0, status: "pending" as const, description: "Excellence credits and recognition" },
    { title: "OLQ", pageRange: "44-57", progress: 50, status: "in-progress" as const, description: "Officer Like Qualities assessment" },
    { title: "Semester Performance Record", pageRange: "58-69", progress: 65, status: "in-progress" as const, description: "Detailed semester-wise performance tracking" },
    { title: "Final Performance Record", pageRange: "70", progress: 0, status: "pending" as const, description: "Final assessment and graduation records" },
    { title: "Overall Assessment (on Passing Out)", pageRange: "71-72", progress: 0, status: "pending" as const, description: "Comprehensive final evaluation" },
    { title: "Record of Lve, Hike & Detention", pageRange: "73", progress: 10, status: "pending" as const, description: "Leave, hiking, and detention records" },
    { title: "Interview Detls", pageRange: "74-102", progress: 0, status: "pending" as const, description: "Interview schedules and feedback" },
    { title: "Counselling/Warning Record", pageRange: "103-104", progress: 0, status: "pending" as const, description: "Counselling sessions and warnings issued" },
    { title: "Performance Graph", pageRange: "105-106", progress: 25, status: "pending" as const, description: "Visual performance tracking and analytics" },
    { title: "Indl Course Report", pageRange: "107", progress: 0, status: "pending" as const, description: "Individual course completion report" }
  ];

  const dossierDetails = [
    { label: "Initiated by", value: "Maj. Kumar, A.K.", editable: true },
    { label: "Opened on", value: "15 Mar 2024", editable: true },
    { label: "Initial Interview", value: "20 Mar 2024", editable: true },
    { label: "Closed by", value: "", editable: true },
    { label: "Closed on", value: "", editable: true },
    { label: "Final Interview", value: "", editable: true }
  ];

  const overallProgress = Math.round(
    courseSections.reduce((acc, section) => acc + section.progress, 0) / courseSections.length
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-50">
            <div className="flex items-center justify-between px-4 h-full">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
                <div>
                  <h1 className="text-lg font-semibold text-primary">MCEME CTW Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Training Management System</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search OCs, courses, subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">PC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">Platoon Commander</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          platoon.cmd@mceme.gov.in
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <span className="text-muted-foreground">/</span>
                  </li>
                  <li className="text-primary" aria-current="page">
                    Home
                  </li>
                </ol>
              </nav>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Welcome to MCEME CTW Dashboard</h2>
              <p className="text-muted-foreground">
                Manage training operations, assessments, and Officer Cadet development efficiently.
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="secondary">Training Management</Badge>
                <Badge variant="secondary">Assessment Tools</Badge>
                <Badge variant="secondary">Reporting System</Badge>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="dossier" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Dossier Details
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Course Sections</h2>
                  <Button variant="outline">
                    Export Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courseSections.map((section, index) => (
                    <CourseCard
                      key={index}
                      title={section.title}
                      pageRange={section.pageRange}
                      progress={section.progress}
                      status={section.status}
                      description={section.description}
                      onClick={() => setSelectedSection(section.title)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Progress Analytics</h3>
                  <p className="text-muted-foreground">Detailed progress tracking and analytics will be available here.</p>
                </div>
              </TabsContent>

              <TabsContent value="dossier" className="space-y-6">
                <DossierSection
                  title="Dossier Filing Details"
                  details={dossierDetails}
                  status="in-progress"
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Settings</h3>
                  <p className="text-muted-foreground">Course settings and preferences will be available here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;