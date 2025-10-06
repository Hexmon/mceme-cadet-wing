import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Search,
  FileText,
  BookOpen,
  Users,
  UserCheck,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  User
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { dashboardCards } from "@/config/app.config";
import { PageHeader } from "@/components/layout/PageHeader";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-0 z-50">

            <PageHeader
              title="MCEME CTW Dashboard"
              description="Training Management System"
              onLogout={handleLogout}
            />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Breadcrumb */}
            <BreadcrumbNav
              paths={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Home" }
              ]}
            />


            {/* Welcome Section */}
            {/* <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Welcome to MCEME CTW Dashboard</h2>
              <p className="text-muted-foreground">
                Manage training operations, assessments, and Officer Cadet development efficiently.
              </p>
              <div className="mt-4 flex gap-2">
                <Badge variant="secondary">Training Management</Badge>
                <Badge variant="secondary">Assessment Tools</Badge>
                <Badge variant="secondary">Reporting System</Badge>
              </div>
            </div> */}

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-11 gap-y-6 mx-auto">
              {dashboardCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <Card key={index} className="group hover:shadow-command transition-all duration-300 cursor-pointer rounded-xl shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${card.color} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {card.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {card.description}
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link to={card.to}>
                          Access Module →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active OCs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">246</div>
                  <p className="text-xs text-muted-foreground">Across 6 platoons</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ongoing Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Training Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">87%</div>
                  <p className="text-xs text-muted-foreground">Current batch average</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;