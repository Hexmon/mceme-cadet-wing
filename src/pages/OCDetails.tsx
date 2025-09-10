import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, Shield, Users } from "lucide-react";
import { OCCard } from "@/components/oc/OCCard";

// Sample data for OCs
const ocList = [
  {
    name: "OC Sharma",
    email: "sharma.oc@mceme.gov.in",
    term: "Term I",
    platoon: "Alpha",
    status: "active",
  },
  {
    name: "OC Singh",
    email: "singh.oc@mceme.gov.in",
    term: "Term II",
    platoon: "Bravo",
    status: "suspended",
  },
  {
    name: "OC Khan",
    email: "khan.oc@mceme.gov.in",
    term: "Term I",
    platoon: "Charlie",
    status: "disabled",
  },
];

export default function OCDetails() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => console.log("Logout clicked");

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
                  <h1 className="text-lg font-semibold text-primary">OC Details</h1>
                  <p className="text-sm text-muted-foreground">View all OC details across platoons and terms</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search OCs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                {/* User Avatar */}
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
                    OC Details
                  </li>
                </ol>
              </nav>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All
                </TabsTrigger>
                <TabsTrigger value="term1">Term I</TabsTrigger>
                <TabsTrigger value="term2">Term II</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">All OCs</h2>
                  <Button variant="outline">Add OC</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ocList
                    .filter((oc) =>
                      oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      oc.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((oc, index) => (
                      <OCCard
                        key={index}
                        name={oc.name}
                        email={oc.email}
                        term={oc.term}
                        platoon={oc.platoon}
                        status={oc.status as "active" | "suspended" | "disabled"}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="term1" className="space-y-6">
                <p className="text-muted-foreground text-sm">Term I OCs coming soon...</p>
              </TabsContent>

              <TabsContent value="term2" className="space-y-6">
                <p className="text-muted-foreground text-sm">Term II OCs coming soon...</p>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
