
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { UserCard } from "@/components/users/UserCard";
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
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


// Sample user data
const cadets = ["Ravi Kumar", "Arjun Singh", "Vikram Roy"];

export default function PersParitculars() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCadet, setSelectedCadet] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [dossierFilling, setDossierFilling] = useState(false);

    const handleSearch = () => {
        const found = cadets.find(
            (cadet) => cadet.toLowerCase() === searchQuery.trim().toLowerCase()
        );

        if (found) {
            setSelectedCadet(found);
            console.log("Cadet selected:", found);

            // Auto-open Dossier Filling card
            setDossierFilling(true);
        } else {
            setSelectedCadet(null);
            setAlertMessage("Cadet not found. Please search again.");
            setShowAlert(true);
        }
    };


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
                                        Dossier Insp Sheet
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* welcome section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">Dossier Inspection Sheet</h2>
                            <p className="text-muted-foreground">
                                Record, maintain, and review cadet dossiers to ensure accurate documentation of performance, conduct, and progress during training and service.
                            </p>
                        </div>

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
                                            { label: "ID Card No", name: "idCard" },
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
                                                {["IC No", "Rank", "Name", "Unit/Arm", "Mobile No"].map(
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
                            <TabsContent value="pers-particulars" className="space-y-6">
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
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertMessage || "Alert"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertMessage
                                ? alertMessage
                                : "You must search and select a cadet before filling out training details."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowAlert(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* Dossier Filling Modal */}
            <Dialog open={dossierFilling} onOpenChange={setDossierFilling}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Dossier Filling Details - {selectedCadet}</DialogTitle>
                        <DialogDescription>
                            Please fill in the details for the selected cadet.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form Fields */}
                    <form className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault(); // stop page reload

                            // You can collect form data here if needed
                            const formData = new FormData(e.currentTarget);
                            const dossierData = {
                                initiatedBy: formData.get("initiated-by"),
                                openedOn: formData.get("opened-on"),
                                initialInterview: formData.get("initial-interview"),
                                closedBy: formData.get("closed-by"),
                                closedOn: formData.get("closed-on"),
                            };

                            console.log("Dossier Saved:", dossierData);

                            // close modal after saving
                            setDossierFilling(false);

                            // (optional) show a toast or alert for confirmation
                        }}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input value={selectedCadet || ""} disabled />
                            </div> */}
                            <div>
                                <label className="text-sm font-medium">Initiated By</label>
                                <Input placeholder="Enter your name" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Opened On</label>
                            <Input type="date" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="initial-interview" className="text-sm font-medium">
                                Initial Interview
                            </label>
                            <Textarea
                                id="initial-interview"
                                name="initial-interview"
                                placeholder="Enter initial interview notes..."
                                className="min-h-[100px] resize-y"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Closed By</label>
                            <Input placeholder="Enter your name" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Closed On</label>
                            <Input type="date" />
                        </div>

                        {/* <div>
                            <label className="text-sm font-medium">Upload Photo</label>
                            <Input type="file" accept="image/*" />
                        </div> */}

                        {/* Actions */}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDossierFilling(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </SidebarProvider>
    );
}
