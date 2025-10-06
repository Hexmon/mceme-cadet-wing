import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
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
import { Search, User, LogOut, Settings, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, managementTabs } from "@/config/app.config";
import { PageHeader } from "@/components/layout/PageHeader";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import GlobalTabs from "@/components/Tabs/GlobalTabs";

// Sample user data
const users = [
    {
        name: "Admin Roy",
        email: "admin.roy@mceme.gov.in",
        role: "Administrator",
        status: "active",
    },
    {
        name: "Staff Kumar",
        email: "kumar.staff@mceme.gov.in",
        role: "Staff Officer",
        status: "suspended",
    },
    {
        name: "Cmdr. Patel",
        email: "patel.cmdr@mceme.gov.in",
        role: "Platoon Commander",
        status: "disabled",
    },
];



export default function GeneralManagement() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <PageHeader
                        title="General Management"
                        description="Manage user access and roles in MCEME"
                        onLogout={handleLogout}
                    />


                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        {/* Breadcrumb */}
                        <BreadcrumbNav
                            paths={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Gen Mgmt" }
                            ]}
                        />


                        {/* welcome section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">MCEME General Management</h2>
                            <p className="text-muted-foreground">
                                Centralize and oversee administrative processes, ensuring smooth coordination of all training and institutional activities.
                            </p>
                        </div>


                        {/* Tabs */}
                        {/* <Tabs defaultValue="users" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="users" className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Gen Mgmt
                                </TabsTrigger>
                                <TabsTrigger value="settings" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </TabsTrigger>
                            </TabsList> */}

                        {/* Users Tab */}
                        {/* <TabsContent value="users" className="space-y-6"> */}
                        {/* <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">User List</h2>
                  <Button variant="outline">Add User</Button>
                </div> */}
                        {/* Dashboard Cards */}
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-11 gap-y-6 mx-auto">
                                    {managementCard.map((card, index) => {
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
                            </TabsContent> */}

                        {/* Settings Tab */}
                        {/* <TabsContent value="settings" className="space-y-6">
                                <div className="text-center py-12">
                                    <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">General Settings</h3>
                                    <p className="text-muted-foreground">Manage system roles, permissions, and more.</p>
                                </div>
                            </TabsContent>
                        </Tabs> */}

                        <GlobalTabs defaultValue="Gen Mgmt" tabs={managementTabs}>
                            {/* Users Tab */}
                            <TabsContent value="Gen Mgmt" className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-11 gap-y-6 mx-auto">
                                    {managementCard.map((card, index) => {
                                        const IconComponent = card.icon;
                                        return (
                                            <Card
                                                key={index}
                                                className="group hover:shadow-command transition-all duration-300 cursor-pointer rounded-xl shadow-lg"
                                            >
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
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        General Settings
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Manage system roles, permissions, and more.
                                    </p>
                                </div>
                            </TabsContent>
                        </GlobalTabs>

                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
