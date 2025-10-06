
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Search, User, LogOut, Settings, Shield, ClipboardCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, militaryTrainingCards } from "@/config/app.config";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/layout/PageHeader";

export default function PersParitculars() {
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login");
        console.log("Logout clicked");

    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <PageHeader
                        title="Personal Particulars"
                        description="Record and manage personal details of cadets, including background information, identification, and essential documentation for reference."
                        onLogout={handleLogout}
                    />


                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        {/* Breadcrumb */}
                        <BreadcrumbNav
                            paths={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Dossier", href: "/dashboard/milmgmt" },
                                { label: "Pers Particulars" }
                            ]}
                        />

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
                        <Tabs defaultValue="pers-particulars" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="pers-particulars" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Pers Particulars
                                </TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <TabsTrigger value="pers-particulars" className="flex items-center gap-2">
                                            <Shield className="h-4 w-4" />
                                            Mil-Trg
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

                            {/* Pers Particulars Form */}
                            <TabsContent
                                value="pers-particulars"
                                className="space-y-6"
                            >
                                {/* SECTION A: Personal Information */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">No</label>
                                            <Input name="no" placeholder="Enter No" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Name</label>
                                            <Input name="name" placeholder="Enter Full Name" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Course</label>
                                            <Input name="course" placeholder="Enter Course" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Date of Arrival</label>
                                            <Input type="date" name="doa" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Visible Identification Marks</label>
                                            <Input name="idenMarks" placeholder="Enter Marks" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">PI</label>
                                            <Input name="pi" placeholder="Enter PI" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">DOB</label>
                                            <Input type="date" name="dob" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Place of Birth</label>
                                            <Input name="pob" placeholder="Enter Place" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Domicile</label>
                                            <Input name="domicile" placeholder="Enter Domicile" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Religion</label>
                                            <Input name="religion" placeholder="Enter Religion" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Nationality</label>
                                            <Input name="nationality" placeholder="Enter Nationality" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Blood Group</label>
                                            <Input name="bloodGp" placeholder="Enter Blood Group" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Iden Marks</label>
                                            <Input name="bloodGp" placeholder="Enter Iden Marks" />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* SECTION B: Family Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Family Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Father's Name</label>
                                            <Input name="fatherName" placeholder="Enter Father's Name" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Father's Mobile No</label>
                                            <Input name="fatherMobile" placeholder="Enter Mobile No" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Father's Address (Permt)</label>
                                            <Input name="fatherAddressPermt" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Father's Address (Present)</label>
                                            <Input name="fatherAddressPresent" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Father's Profession</label>
                                            <Input name="fatherProfession" placeholder="Enter Profession" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Guardian's Name</label>
                                            <Input name="guardianName" placeholder="Enter Guardian's Name" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Guardian's Address</label>
                                            <Input name="guardianAddress" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Monthly Income</label>
                                            <Input name="income" placeholder="Enter Monthly Income" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Details of NOK</label>
                                            <Input name="nokDetails" placeholder="Enter NOK Details" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">NOK Permanent Address</label>
                                            <Input name="nokAddressPermanent" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Nok Present Address</label>
                                            <Input name="nokAddressPresent" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Nearest Railway Station</label>
                                            <Input name="nearestRlyStn" placeholder="Enter Station" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Family/Friends in Secunderabad</label>
                                            <Input name="familySecunderabad" placeholder="Enter Address" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Relative in Armed Forces</label>
                                            <Input name="armedForcesRelative" placeholder="Rank, Name & Relation" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Govt Financial Assistance</label>
                                            <Input name="govtAssistance" placeholder="Yes/No" />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* SECTION C: Contact & IDs */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contact & IDs</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: "Mobile No", name: "mobile" },
                                            { label: "Email", name: "email" },
                                            { label: "Passport No", name: "passport" },
                                            { label: "PAN Card No", name: "pan" },
                                            { label: "Aadhaar No", name: "aadhaar" },
                                            { label: "Bank Details", name: "bank" },
                                            { label: "Iden Card No", name: "idCard" },
                                            { label: "UPSC Roll No", name: "upsc" },
                                            { label: "SSB Centre", name: "ssb" },
                                        ].map((field) => (
                                            <div key={field.name}>
                                                <label className="text-sm font-medium">{field.label}</label>
                                                <Input name={field.name} placeholder={`Enter ${field.label}`} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* SECTION D: Other Information */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Other Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { label: "Games", name: "games" },
                                            { label: "Hobbies", name: "hobbies" },
                                            { label: "Swimmer/Non-Swimmer", name: "swimmer" },
                                            { label: "Languages", name: "languages" },
                                        ].map((field) => (
                                            <div key={field.name}>
                                                <label className="text-sm font-medium">{field.label}</label>
                                                <Input name={field.name} placeholder={`Enter ${field.label}`} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* SECTION E: DS Details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>DS Details (to be filled in last term)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {["PI Cdr", "Dy Cdr", "Cdr"].map((role) => (
                                            <div key={role} className="border p-4 rounded-lg space-y-2">
                                                <h3 className="font-semibold">{role}</h3>
                                                {[role === "PI Cdr" ? "SS/IC No" : "IC No", "Rank", "Name", "Unit/Arm", "Mobile No"].map(
                                                    (field) => (
                                                        <div key={`${role}-${field}`}>
                                                            <label className="text-sm font-medium">{field}</label>
                                                            <Input
                                                                name={`${role}-${field.toLowerCase().replace(" ", "-")}`}
                                                                placeholder={`Enter ${field}`}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                {/* Submit Actions */}
                                <div className="flex justify-end gap-2">
                                    <Button type="reset" variant="outline">
                                        Reset
                                    </Button>
                                    <Button type="submit">Save</Button>
                                </div>
                            </TabsContent>

                            {/* Mil-Trg Placeholder */}
                            <TabsContent value="mil-trg">
                                <div className="text-center py-12">
                                    <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        Military Training Section
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Select a module to continue.
                                    </p>
                                </div>
                            </TabsContent>


                            {/* Settings Tab */}
                            {/* <TabsContent value="pers-particulars" className="space-y-6">
                                <div className="text-center py-12">
                                    <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">General Settings</h3>
                                    <p className="text-muted-foreground">Manage system roles, permissions, and more.</p>
                                </div>
                            </TabsContent> */}
                        </Tabs>
                    </main>
                </div>
            </div>

        </SidebarProvider>
    );
}
