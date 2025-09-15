import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubjectCard } from "@/components/subjects/SubjectCard";
import { AddSubjectDialog } from "@/components/subjects/AddSubjectDialog";
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
import { Book, Search, User, LogOut, Settings, ListChecks, Plus } from "lucide-react";
import { subjects as initialSubjects, type Subject } from "@/config/app.config";

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    const handleAddSubject = (newSubject: Omit<Subject, "id">) => {
        const id = Date.now().toString();
        setSubjects(prev => [...prev, { ...newSubject, id }]);
    };

    const handleEditSubject = (id: string) => {
        console.log("Edit subject:", id);
        // The actual editing is handled in the SubjectEditDialog
    };

    const handleDeleteSubject = (id: string) => {
        setSubjects(prev => prev.filter(subject => subject.id !== id));
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                    <h1 className="text-lg font-semibold text-primary">Subject Management</h1>
                                    <p className="text-sm text-muted-foreground">Manage subjects, instructors, and curriculum coverage</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Search Bar */}
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search subjects..."
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
                                        Subject Management
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="subjects" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="subjects" className="flex items-center gap-2">
                                    <Book className="h-4 w-4" />
                                    Subjects
                                </TabsTrigger>
                                <TabsTrigger value="assignments" className="flex items-center gap-2">
                                    <ListChecks className="h-4 w-4" />
                                    Instructor Assignments
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList>

                            {/* Subject List */}
                            <TabsContent value="subjects" className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-foreground">Subject List</h2>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setIsAddDialogOpen(true)}
                                        className="flex items-center gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Subject
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredSubjects.map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            instructor={subject.instructor}
                                            semester={subject.semester}
                                            coverage={subject.coverage}
                                            status={subject.status}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Instructor Assignments */}
                            <TabsContent value="assignments" className="space-y-6">
                                <div className="text-center py-12">
                                    <ListChecks className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Instructor Assignments</h3>
                                    <p className="text-muted-foreground">Manage instructor-subject assignments here.</p>
                                </div>
                            </TabsContent>

                            {/* Settings */}
                            <TabsContent value="settings" className="space-y-6">
                                <div className="text-center py-12">
                                    <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Subject Settings</h3>
                                    <p className="text-muted-foreground">Configure curriculum or semester settings here.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>

            <AddSubjectDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAdd={handleAddSubject}
            />
        </SidebarProvider>
    );
};

export default Index;
