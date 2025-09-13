import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Search, LogOut, User, Dumbbell, ShieldCheck } from "lucide-react";
import { ActivityCard } from "@/components/activity/ActivityCard";
import { activities } from "@/config/app.config";

export default function ActivitiesPage() {
    const [search, setSearch] = useState("");

    const handleLogout = () => console.log("Logout clicked");

    const filtered = activities.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase())
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
                                    <h1 className="text-lg font-semibold text-primary">Activities</h1>
                                    <p className="text-sm text-muted-foreground">Training & Sports Sessions</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative hidden md:block">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search activities..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 w-80"
                                    />
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-primary text-primary-foreground">PC</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            Profile Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-6 space-y-8">
                        {/* Training Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <ShieldCheck className="h-5 w-5 text-blue-500" />
                                <h2 className="text-xl font-semibold text-foreground">Training</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered
                                    .filter((a) => a.category === "training")
                                    .map((a, i) => (
                                        <ActivityCard
                                            key={i}
                                            name={a.name}
                                            category={a.category}
                                            duration={a.duration}
                                            status={a.status}
                                        />
                                    ))}
                            </div>
                        </section>

                        {/* Sports Section */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <Dumbbell className="h-5 w-5 text-green-500" />
                                <h2 className="text-xl font-semibold text-foreground">Sports</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered
                                    .filter((a) => a.category === "sports")
                                    .map((a, i) => (
                                        <ActivityCard
                                            key={i}
                                            name={a.name}
                                            category={a.category}
                                            duration={a.duration}
                                            status={a.status}
                                        />
                                    ))}

                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
