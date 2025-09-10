import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { InstructorCard } from "@/components/instructors/InstructorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Search, User, LogOut, Book, ListChecks, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const instructors = [
  {
    name: "Lt. Sharma",
    email: "sharma.lt@mceme.gov.in",
    department: "Computer Science",
    assignedSubjects: 2,
    status: "active",
  },
  {
    name: "Capt. Rao",
    email: "rao.capt@mceme.gov.in",
    department: "Mechanical",
    assignedSubjects: 3,
    status: "on-leave",
  },
  {
    name: "Maj. Verma",
    email: "verma.maj@mceme.gov.in",
    department: "Electrical",
    assignedSubjects: 1,
    status: "retired",
  },
];

export default function InstructorManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    console.log("Logout clicked");
  };

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
                  <h1 className="text-lg font-semibold text-primary">Instructor Management</h1>
                  <p className="text-sm text-muted-foreground">Manage instructors and subject assignments</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search instructors..."
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
                    Instructor Management
                  </li>
                </ol>
              </nav>
            </div>

            <Tabs defaultValue="instructors" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="instructors" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Instructors
                </TabsTrigger>
                <TabsTrigger value="assignments" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  Subject Assignments
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Instructor List */}
              <TabsContent value="instructors" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Instructor List</h2>
                  <Button variant="outline">Add Instructor</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructors
                    .filter((instructor) =>
                      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((instructor, index) => (
                      <InstructorCard
                        key={index}
                        name={instructor.name}
                        email={instructor.email}
                        department={instructor.department}
                        assignedSubjects={instructor.assignedSubjects}
                        status={instructor.status as "active" | "on-leave" | "retired"}
                      />
                    ))}
                </div>
              </TabsContent>

              {/* Subject Assignments */}
              <TabsContent value="assignments" className="space-y-6">
                <div className="text-center py-12">
                  <Book className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Subject Assignments</h3>
                  <p className="text-muted-foreground">Assign subjects to instructors from this section.</p>
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Instructor Settings</h3>
                  <p className="text-muted-foreground">Configure instructor roles, departments, and more.</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
