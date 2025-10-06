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
import {
    User,
    LogOut,
    Settings,
    ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { PageHeader } from "@/components/layout/PageHeader";

// Sample user data
const cadets = ["Ravi Kumar", "Arjun Singh", "Vikram Roy"];

export default function DossierFilling() {
    const [searchQuery, setSearchQuery] = useState("");
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const navigate = useNavigate();

    //   const handleSearch = () => {
    //     const found = cadets.find(
    //       (cadet) => cadet.toLowerCase() === searchQuery.trim().toLowerCase()
    //     );
    //     if (found) {
    //       setSelectedCadet(found);
    //     } else {
    //       setSelectedCadet(null);
    //       alert("Cadet not found. Please try again.");
    //     }
    //   };

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
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">

                        <PageHeader
                            title="Dossier Filling"
                            description="Record, maintain, and fill cadet dossiers for documentation."
                            onLogout={handleLogout}
                        />
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        {/* Breadcrumb */}
                        <BreadcrumbNav
                            paths={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Dossier", href: "/dashboard/milmgmt" },
                                { label: "Dossier Filling" }
                            ]}
                        />


                        {/* Search Cadet */}
                        {/* <div className="mb-6 flex gap-2 max-w-md">
              <Input
                placeholder="Search Cadet by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div> */}
                       {/* Selected Cadet Section */}
                        <div className="hidden md:flex sticky top-16 z-40">
                            {/* Sticky Top Section */}
                            {selectedCadet && (
                                <SelectedCadetTable selectedCadet={selectedCadet} />
                            )}
                        </div>
                        {/* Dossier Form */}

                        <Card className="shadow-lg rounded-xl p-6 border border-border">
                            <CardHeader>
                                {/* <CardTitle className="text-lg font-semibold text-primary">
                                    Dossier Filling - {selectedCadet}
                                </CardTitle> */}
                            </CardHeader>

                            <CardContent>
                                <form
                                    className="space-y-6"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.currentTarget);
                                        const dossierData = {
                                            initiatedBy: formData.get("initiated-by"),
                                            openedOn: formData.get("opened-on"),
                                            initialInterview: formData.get("initial-interview"),
                                            closedBy: formData.get("closed-by"),
                                            closedOn: formData.get("closed-on"),
                                            finalInterview: formData.get("final-interview"),
                                        };
                                        console.log("Dossier Saved:", dossierData);
                                        alert("Dossier Saved Successfully!");
                                    }}
                                >
                                    {/* Initiated By + Opened On */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Initiated By</label>
                                            <Input name="initiated-by" placeholder="Enter your name" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Opened On</label>
                                            <Input name="opened-on" type="date" />
                                        </div>
                                    </div>

                                    {/* Initial Interview */}
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

                                    {/* Closed By + Closed On */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">Closed By</label>
                                            <Input name="closed-by" placeholder="Enter your name" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Closed On</label>
                                            <Input name="closed-on" type="date" />
                                        </div>
                                    </div>


                                    {/* Final Interview */}
                                    <div className="space-y-2">
                                        <label htmlFor="final-interview" className="text-sm font-medium">
                                            Final Interview
                                        </label>
                                        <Textarea
                                            id="final-interview"
                                            name="final-interview"
                                            placeholder="Enter final interview notes..."
                                            className="min-h-[100px] resize-y"
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
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
