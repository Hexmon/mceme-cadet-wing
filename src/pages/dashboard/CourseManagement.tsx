import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { CourseCard, Course } from "@/components/courses/CourseCard";
import { DossierSection } from "@/components/courses/DossierSection";
import { CourseFormModal } from "@/components/courses/CourseFormModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FileText, BarChart3, Calendar, Settings, Search, User, LogOut, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", courseNo: "TES-43", startDate: "10-02-2024", endDate: "10-09-2025", trgModel: 0 },
    { id: "2", courseNo: "TES-44", startDate: "03-01-2022", endDate: "14-12-2024", trgModel: 0 },
    { id: "3", courseNo: "TES-45", startDate: "04-07-2022", endDate: "14-06-2025", trgModel: 0 },
    { id: "4", courseNo: "TES-46", startDate: "02-01-2023", endDate: "11-12-2025", trgModel: 0 },
    { id: "5", courseNo: "TES-47", startDate: "03-07-2023", endDate: "13-06-2026", trgModel: 0 },
    { id: "6", courseNo: "TES-48", startDate: "01-01-2024", endDate: "12-12-2026", trgModel: 0 },
    { id: "7", courseNo: "TES-49", startDate: "01-07-2024", endDate: "12-06-2027", trgModel: 0 },
    { id: "8", courseNo: "TES-49A", startDate: "30-01-2025", endDate: "11-12-2027", trgModel: 0 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAddCourse = () => {
    setFormMode("add");
    setSelectedCourse(null);
    setIsFormModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setFormMode("edit");
    setSelectedCourse(course);
    setIsFormModalOpen(true);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setViewDialogOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
    toast({
      title: "Course deleted",
      description: "The course has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleSaveCourse = (courseData: Omit<Course, "id">) => {
    if (formMode === "add") {
      const newCourse: Course = {
        ...courseData,
        id: Date.now().toString(),
      };
      setCourses([...courses, newCourse]);
      toast({
        title: "Course added",
        description: "New course has been successfully added.",
      });
    } else if (formMode === "edit" && selectedCourse) {
      setCourses(
        courses.map((course) =>
          course.id === selectedCourse.id ? { ...courseData, id: selectedCourse.id } : course
        )
      );
      toast({
        title: "Course updated",
        description: "Course has been successfully updated.",
      });
    }
  };

  // 🔍 Filter only by course number now
  const filteredCourses = courses.filter((course) =>
    course.courseNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dossierDetails = [
    { label: "Initiated by", value: "Maj. Kumar, A.K.", editable: true },
    { label: "Opened on", value: "15 Mar 2024", editable: true },
    { label: "Initial Interview", value: "20 Mar 2024", editable: true },
    { label: "Closed by", value: "", editable: true },
    { label: "Closed on", value: "", editable: true },
    { label: "Final Interview", value: "", editable: true },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
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
                    placeholder="Search courses by number..."
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
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          PC
                        </AvatarFallback>
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
                    Course Management
                  </li>
                </ol>
              </nav>
            </div>

            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">MCEME CTW Course Management</h2>
              <p className="text-muted-foreground">
                Manage training courses, assessments, and Officer Cadet development efficiently.
              </p>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <Link to="/dashboard/ocmgmt" className="text-center hover:text-primary">
                  <TabsTrigger value="oc-mgmt">OC Management</TabsTrigger>
                </Link>
                <Link to="/dashboard/subjectmgmt" className="text-center hover:text-primary">
                  <TabsTrigger value="course-mgmt">Subject Management</TabsTrigger>
                </Link>
                <Link to="/dashboard/usersmgmt" className="text-center hover:text-primary">
                  <TabsTrigger value="course-mgmt">User Management</TabsTrigger>
                </Link>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Course Sections</h2>
                  <Button onClick={handleAddCourse} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Course
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onView={handleViewCourse}
                      onEdit={handleEditCourse}
                      onDelete={handleDeleteCourse}
                    />
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? "No courses match your search criteria."
                        : "No courses available yet."}
                    </p>
                    <Button onClick={handleAddCourse}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Course
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Progress Analytics</h3>
                  <p className="text-muted-foreground">
                    Detailed progress tracking and analytics will be available here.
                  </p>
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
                  <p className="text-muted-foreground">
                    Course settings and preferences will be available here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Course Form Modal */}
      <CourseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourse}
        mode={formMode}
      />

      {/* View Course Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.courseNo}</DialogTitle>
            <DialogDescription>Course details and information</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Date</label>
                  <p className="text-sm">{selectedCourse.startDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Date</label>
                  <p className="text-sm">{selectedCourse.endDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Training Model</label>
                  <p className="text-sm">{selectedCourse.trgModel}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default CourseManagement;
