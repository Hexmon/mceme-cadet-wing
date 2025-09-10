import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Calendar, Search, User, LogOut, Settings, ClipboardList } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample appointment data
const appointments = [
  {
    title: "Midterm Review",
    officer: "Capt. Sharma",
    department: "Training",
    date: "2025-09-15",
    time: "10:00 AM",
    status: "scheduled",
  },
  {
    title: "Performance Evaluation",
    officer: "Maj. Rao",
    department: "Logistics",
    date: "2025-09-10",
    time: "3:00 PM",
    status: "completed",
  },
  {
    title: "Platoon Strategy Meet",
    officer: "Lt. Verma",
    department: "Operations",
    date: "2025-09-18",
    time: "1:30 PM",
    status: "cancelled",
  },
];

export default function AppointmentManagement() {
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
                  <h1 className="text-lg font-semibold text-primary">Appointment Management</h1>
                  <p className="text-sm text-muted-foreground">Manage officer appointments and schedules</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

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
                    Appointment Management
                  </li>
                </ol>
              </nav>
            </div>

            <Tabs defaultValue="appointments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appointments" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Appointments List */}
              <TabsContent value="appointments" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Appointment List</h2>
                  <Button variant="outline">Add Appointment</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appointments
                    .filter((apt) =>
                      apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      apt.officer.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((apt, index) => (
                      <AppointmentCard
                        key={index}
                        title={apt.title}
                        officer={apt.officer}
                        department={apt.department}
                        date={apt.date}
                        time={apt.time}
                        status={apt.status as "scheduled" | "completed" | "cancelled"}
                      />
                    ))}
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Appointment Settings</h3>
                  <p className="text-muted-foreground">Configure scheduling rules, roles, and more.</p>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
