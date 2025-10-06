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
import { Search, User, LogOut, Settings, Shield, BookOpen } from "lucide-react";
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
import Academics from "../Academics";
import { Cadet } from "@/types/cadet";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSelectedCadet } from "@/store/cadetSlice";
import { PageHeader } from "@/components/layout/PageHeader";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

// Sample user data
const cadets: Cadet[] = [
    { name: "Ravi Kumar", course: "TES-43", ocNumber: "OC-101" },
    { name: "Arjun Singh", course: "TES-44", ocNumber: "OC-102" },
    { name: "Vikram Roy", course: "TES-45", ocNumber: "OC-103" },
];


export default function MilitaryTraining() {
    const dispatch = useDispatch();
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const [searchQuery, setSearchQuery] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [dossierFilling, setDossierFilling] = useState(false);

    const handleSearch = () => {
        const found = cadets.find(
            (cadet) => cadet.name.toLowerCase() === searchQuery.trim().toLowerCase()
        );

        if (found) {
            dispatch(setSelectedCadet(found));
            console.log("Cadet selected:", found);

            //setDossierFilling(true);
        } else {
            dispatch(setSelectedCadet(null));
            setAlertMessage("Cadet not found. Please search again.");
            setShowAlert(true);
        }
    };
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login")
        console.log("Logout clicked");
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
                        <PageHeader
                            title="Dossier"
                            description="Organize, manage, and securely store essential documents and files"
                            onLogout={handleLogout}
                        />
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        <div className="">
                            <div className="flex justify-between items-center rounded-2xl mb-2">
                                {/* Breadcrumb */}
                                <BreadcrumbNav
                                    paths={[
                                        { label: "Dashboard", href: "/dashboard" },
                                        { label: "Dossier" },
                                    ]}
                                />

                                {/* Search Section */}
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            placeholder="Search Cadets..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 w-80"
                                        />
                                    </div>
                                    <Button variant="default" size="sm" onClick={handleSearch}>
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Selected Cadet Section */}
                        <div className="hidden md:flex sticky top-16 z-40">
                            {/* Sticky Top Section */}
                            {selectedCadet && (
                                <SelectedCadetTable selectedCadet={selectedCadet} />
                            )}
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="mil-trg" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="mil-trg" className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Mil-Trg
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Academics
                                </TabsTrigger>
                            </TabsList>

                            {/* Users Tab */}
                            <TabsContent value="mil-trg" className="space-y-6">
                                {/* <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">User List</h2>
                  <Button variant="outline">Add User</Button>
                </div> */}
                                {/* Dashboard Cards */}




                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-11 gap-y-6 mx-auto">
                                    {militaryTrainingCards.map((card, index) => {
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
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full"
                                                        onClick={(e) => {
                                                            if (!selectedCadet) {
                                                                e.preventDefault();
                                                                setShowAlert(true);
                                                            }
                                                        }}
                                                    >
                                                        <Link to={card.to}>Access Module →</Link>
                                                    </Button>

                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
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
            {/* <Dialog open={dossierFilling} onOpenChange={setDossierFilling}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Dossier Filling Details - {selectedCadet?.name}</DialogTitle>
                        <DialogDescription>
                            Please fill in the details for the selected cadet.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Form Fields */}
            {/* <form className="space-y-4"
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
                            setDossierFilling(false); */}
            {/* 
                            // (optional) show a toast or alert for confirmation
                       // }} */}
            {/* //> */}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            {/* <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input value={selectedCadet || ""} disabled />
                            </div> */}
            {/* <div>
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
                        </div> */}

            {/* <div>
                            <label className="text-sm font-medium">Upload Photo</label>
                            <Input type="file" accept="image/*" />
                        </div> */}

            {/* Actions */}
            {/* <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDossierFilling(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}

        </SidebarProvider>
    );
}
