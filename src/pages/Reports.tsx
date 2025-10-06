import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
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
import { Search, User, LogOut, Settings, Shield, ClipboardCheck, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, militaryTrainingCards } from "@/config/app.config";

import { Textarea } from "@/components/ui/textarea";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";


// Sample user data
const cadets = ["Ravi Kumar", "Arjun Singh", "Vikram Roy"];

export default function DossierInspSheet() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [dossierFilling, setDossierFilling] = useState(false);
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);


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
                                    <h1 className="text-lg font-semibold text-primary">Dossier Insp Sheet</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Maintain and review cadet dossiers, record inspection notes, and track progress for evaluation and documentation.
                                    </p>
                                </div>


                            </div>

                            <div className="flex items-center gap-4">


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
                        <BreadcrumbNav currentPage="Dossier Insp" />

                        {/* welcome section */}
                        {/* <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">Dossier Inspection Sheet</h2>
                            <p className="text-muted-foreground">
                                Record, maintain, and review cadet dossiers to ensure accurate documentation of performance, conduct, and progress during training and service.
                            </p>
                        </div> */}
                        {/* Show selected cadet name */}
                        {selectedCadet && (
                            <SelectedCadetTable selectedCadet={selectedCadet} />
                        )}

                        {/* Tabs */}
                        <Tabs defaultValue="dossier-insp" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="dossier-insp" className="flex items-center gap-2">
                                    <ClipboardCheck className="h-4 w-4" />
                                    Dossier Insp Sheet
                                </TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <TabsTrigger value="dossier-insp" className="flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Mil-Trg
                                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                        </TabsTrigger>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-96 max-h-64 overflow-y-auto">
                                        {militaryTrainingCards.map((card) => (
                                            <DropdownMenuItem key={card.to} asChild>
                                                <Link to={card.to} className="flex items-center gap-2 w-full">
                                                    <card.icon className={`h-4 w-4 ${card.color}`} />
                                                    <span>{card.title}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>

                                </DropdownMenu>
                            </TabsList>

                            {/* Dossier Insp Form */}
                            <TabsContent value="dossier-insp" className="space-y-6">

                                {["Pl Cdr", "DS Coord", "Cdr"].map((role) => (
                                    <Card key={role} className="shadow-lg rounded-xl p-6 border border-border">
                                        <CardHeader className="mb-4">
                                            <CardTitle className="text-lg font-semibold text-primary">{role} Form</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                Fill out the inspection details for {role}.
                                            </p>
                                        </CardHeader>

                                        <CardContent>
                                            <form
                                                className="space-y-6"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const formData = new FormData(e.currentTarget);
                                                    const data = {
                                                        role,
                                                        date: formData.get("date"),
                                                        remarks: formData.get("remarks"),
                                                        rk: formData.get("rk"),
                                                        name: formData.get("name"),
                                                        appointment: formData.get("appointment"),
                                                        initials: formData.get("initials"),
                                                    };
                                                    console.log(`${role} Form Data:`, data);
                                                }}
                                            >
                                                {/* Date Field */}
                                                <div className="w-full max-w-sm">
                                                    <label htmlFor={`date-${role}`} className="text-sm font-medium">Date</label>
                                                    <Input
                                                        type="date"
                                                        id={`date-${role}`}
                                                        name="date"
                                                        className="mt-1 w-fit"
                                                        placeholder="Select date"
                                                    />
                                                </div>

                                                {/* Remarks */}
                                                <div className="w-full max-w-lg space-y-2">
                                                    <label htmlFor={`remarks-${role}`} className="text-sm font-medium">Remarks</label>
                                                    <Textarea
                                                        id={`remarks-${role}`}
                                                        name="remarks"
                                                        placeholder="Enter remarks..."
                                                        className="min-h-[100px] resize-y mt-1"
                                                    />
                                                </div>

                                                {/* Rank, Name, Appointment */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div>
                                                        <label htmlFor={`rk-${role}`} className="text-sm font-medium">Rank</label>
                                                        <Input
                                                            id={`rk-${role}`}
                                                            name="rk"
                                                            placeholder="Enter Your Rank"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`name-${role}`} className="text-sm font-medium">Name</label>
                                                        <Input
                                                            id={`name-${role}`}
                                                            name="name"
                                                            placeholder="Enter Your Name"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`appointment-${role}`} className="text-sm font-medium">Appointment</label>
                                                        <Input
                                                            id={`appointment-${role}`}
                                                            name="appointment"
                                                            placeholder="Enter Appointment"
                                                            className="mt-1"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Initials */}
                                                <div className="w-full max-w-lg space-y-2">
                                                    <label htmlFor={`initials-${role}`} className="text-sm font-medium">Initials</label>
                                                    <Textarea
                                                        id={`initials-${role}`}
                                                        name="initials"
                                                        placeholder="Enter initials..."
                                                        className="min-h-[80px] resize-y mt-1"
                                                    />
                                                </div>

                                                {/* Actions */}
                                                <div className="flex justify-end gap-2">
                                                    <Button type="reset" variant="outline">Reset</Button>
                                                    <Button type="submit">Save</Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>


                            {/* Settings Tab */}
                            <TabsContent value="settings" className="space-y-6">
                                <div className="text-center py-12">
                                    <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">General Settings</h3>
                                    <p className="text-muted-foreground">Manage system roles, permissions, and more.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </main>
                </div>
            </div>

        </SidebarProvider>
    );
}
