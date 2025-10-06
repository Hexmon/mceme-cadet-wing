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
import { PageHeader } from "@/components/layout/PageHeader";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    const handleAddSubject = (newSubject: Omit<Subject, "id">) => {
        if (editingSubject) {
            // Update existing subject
            setSubjects(prev =>
                prev.map(subject =>
                    subject.id === editingSubject.id
                        ? { ...subject, ...newSubject }
                        : subject
                )
            );
            setEditingSubject(null);
        } else {
            // Add new subject
            const id = Date.now().toString();
            setSubjects(prev => [...prev, { ...newSubject, id }]);
        }
    };

    const handleEditSubject = (id: string) => {
        const subject = subjects.find(s => s.id === id);
        if (subject) {
            setEditingSubject(subject);
            setIsAddDialogOpen(true);
        }
    };


    const handleDeleteSubject = (id: string) => {
        setSubjects(prev => prev.filter(subject => subject.id !== id));
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getSemesterSubjects = (semester: string) => {
        return filteredSubjects.filter(subject => subject.semNo === semester);
    };


    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
                        <PageHeader
                            title="Subject Management"
                            description="Manage subjects, instructors, and curriculum coverage"
                            onLogout={handleLogout}
                        />
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        {/* Breadcrumb */}
                        <BreadcrumbNav
                            paths={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Gen Mgmt", href: "/dashboard/genmgmt" },
                                { label: "Subject Management" }
                            ]}
                        />

                        {/* <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">MCEME CTW Subject Management</h2>
                            <p className="text-muted-foreground">
                                Organize and monitor academic and training subjects to support structured learning and cadet performance.
                            </p>
                        </div> */}


                        {/* Tabs */}
                        <Tabs defaultValue="subjects" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="subjects" className="flex items-center gap-2">
                                    <Book className="h-4 w-4" />
                                    Subject Management
                                </TabsTrigger>
                                <Link to="/dashboard/ocmgmt" className="text-center hover:text-primary">
                                    <TabsTrigger value="oc-mgmt">OC Management</TabsTrigger>
                                </Link>
                                <Link to="/dashboard/coursemgmt" className="text-center hover:text-primary">
                                    <TabsTrigger value="course-mgmt">Course Management</TabsTrigger>
                                </Link>
                                <Link to="/dashboard/usersmgmt" className="text-center hover:text-primary">
                                    <TabsTrigger value="user-mgmt">User Management</TabsTrigger>
                                </Link>
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
                                <TabsList className="grid w-full grid-cols-6">
                                    <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                        Semester I
                                    </TabsTrigger>
                                    <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                        Semester II
                                    </TabsTrigger>
                                    <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                        Semester III
                                    </TabsTrigger>
                                    <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                        Semester IV
                                    </TabsTrigger>
                                    <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                        Semester V
                                    </TabsTrigger>
                                    <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                        Semester VI
                                    </TabsTrigger>
                                </TabsList>

                            </TabsContent>

                            {/* Semester Wise Subjects */}
                            <TabsContent value="semester-i" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-i" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("I").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="semester-ii" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-ii" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("II").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="semester-iii" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-iii" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("III").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="semester-iv" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-iv" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("IV").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="semester-v" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-v" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("V").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="semester-vi" className="space-y-6">
                                {/* Subject List */}
                                <TabsContent value="semester-vi" className="space-y-6">
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
                                    <TabsList className="grid w-full grid-cols-6">
                                        <TabsTrigger value="semester-i" className="flex items-center gap-2">
                                            Semester I
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-ii" className="flex items-center gap-2">
                                            Semester II
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iii" className="flex items-center gap-2">
                                            Semester III
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-iv" className="flex items-center gap-2">
                                            Semester IV
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-v" className="flex items-center gap-2">
                                            Semester V
                                        </TabsTrigger>
                                        <TabsTrigger value="semester-vi" className="flex items-center gap-2">
                                            Semester VI
                                        </TabsTrigger>
                                    </TabsList>

                                </TabsContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getSemesterSubjects("VI").map((subject) => (
                                        <SubjectCard
                                            key={subject.id}
                                            id={subject.id}
                                            name={subject.name}
                                            code={subject.code}
                                            credits={subject.credits}
                                            subjectType={subject.subjectType}
                                            theoryPractical={subject.theoryPractical}
                                            onEdit={handleEditSubject}
                                            onDelete={handleDeleteSubject}
                                        />
                                    ))}
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
                onOpenChange={(open) => {
                    setIsAddDialogOpen(open);
                    if (!open) setEditingSubject(null); // reset when closed
                }}
                onAdd={handleAddSubject}
                subject={editingSubject ?? undefined}
            />

        </SidebarProvider>
    );
};

export default Index;
