import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { AppSidebar } from '@/components/AppSidebar';
import { BeneficiariesTable } from '@/components/reports/BeneficiariesTable';
import { SemesterReports } from '@/components/reports/SemesterReports';
import { DossierForm } from '@/components/reports/DossierForm';

import {
  FileText,
  Users,
  Calendar,
  Settings,
  Plus,
  Printer,
  Search,
  User,
  LogOut
} from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Reports() {
  const stats = [/* your stats data */];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3'];
  const [selectedSem, setSelectedSem] = useState(semesters[0]);
  const [showPrint, setShowPrint] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    // Your logout logic here
  };

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
                    Reports
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card key={i} className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-primary">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color} opacity-80`} />
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Semester Selector */}
            <div className="flex gap-4 mb-6">
              {semesters.map((sem) => (
                <Button
                  key={sem}
                  variant={sem === selectedSem ? 'secondary' : 'outline'}
                  onClick={() => setSelectedSem(sem)}
                >
                  {sem}
                </Button>
              ))}
              <Button onClick={() => setShowPrint(true)}>
                <Printer className="w-4 h-4 mr-1" /> Print E‑Dossier
              </Button>
            </div>

            {/* Reports Sections */}
            <SemesterReports semester={selectedSem} />
            <BeneficiariesTable semester={selectedSem} />
            {/* <DossierForm semester={selectedSem} /> */}

            {/* Print Modal */}
            {showPrint && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 max-w-3xl w-full rounded">
                  <h2 className="text-xl font-semibold mb-4">E‑Dossier – {selectedSem}</h2>
                  <div className="space-y-4">
                    <SemesterReports semester={selectedSem} printable />
                    <BeneficiariesTable semester={selectedSem} printable />
                    <DossierForm semester={selectedSem} printable />
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <Button onClick={() => window.print()}>Export / Print</Button>
                    <Button variant="outline" onClick={() => setShowPrint(false)}>Close</Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
