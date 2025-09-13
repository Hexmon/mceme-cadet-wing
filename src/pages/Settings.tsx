import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
import { Settings, User, LogOut, Shield, Wrench } from "lucide-react";

export default function SettingsPage() {
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
                  <h1 className="text-lg font-semibold text-primary">System Settings</h1>
                  <p className="text-sm text-muted-foreground">Configure user roles, permissions, and access control</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
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
                    Settings
                  </li>
                </ol>
              </nav>
            </div>

            {/* Settings Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg shadow bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="text-primary h-5 w-5" />
                  <h2 className="text-lg font-semibold text-foreground">Manage Roles</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Define user roles like Administrator, Commander, Staff, and assign role-based permissions.
                </p>
                <Button variant="secondary">Configure Roles</Button>
              </div>

              <div className="p-4 border rounded-lg shadow bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Wrench className="text-primary h-5 w-5" />
                  <h2 className="text-lg font-semibold text-foreground">Access Control</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage account status, system access, login rules, and restrictions.
                </p>
                <Button variant="secondary">Access Settings</Button>
              </div>

              <div className="p-4 border rounded-lg shadow bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="text-primary h-5 w-5" />
                  <h2 className="text-lg font-semibold text-foreground">System Preferences</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Control default behaviors, interface configurations, and notification settings.
                </p>
                <Button variant="secondary">System Settings</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
