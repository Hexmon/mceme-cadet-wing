import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Search, User, LogOut, Settings, Shield, ClipboardCheck, ChevronDown, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, militaryTrainingCards } from "@/config/app.config";
import { Textarea } from "@/components/ui/textarea";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/layout/PageHeader";


// Sample user data
const cadets = ["Ravi Kumar", "Arjun Singh", "Vikram Roy"];

export default function SSBReport() {
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        console.log("Logout clicked");
    };
    const [positiveTraits, setPositiveTraits] = useState<string[]>([""]);
    const [negativeTraits, setNegativeTraits] = useState<string[]>([""]);

    const addField = (type: "positive" | "negative") => {
        if (type === "positive") {
            setPositiveTraits([...positiveTraits, ""]);
        } else {
            setNegativeTraits([...negativeTraits, ""]);
        }
    };

    const removeField = (type: "positive" | "negative", index: number) => {
        if (type === "positive") {
            setPositiveTraits(positiveTraits.filter((_, i) => i !== index));
        } else {
            setNegativeTraits(negativeTraits.filter((_, i) => i !== index));
        }
    };

    const handleChange = (
        type: "positive" | "negative",
        index: number,
        value: string
    ) => {
        if (type === "positive") {
            const updated = [...positiveTraits];
            updated[index] = value;
            setPositiveTraits(updated);
        } else {
            const updated = [...negativeTraits];
            updated[index] = value;
            setNegativeTraits(updated);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            positiveTraits,
            negativeTraits,
        });
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
                        {/* Header */}
                        <PageHeader
                            title="SSB Report"
                            description="Document candidate performance, assess psychological, group, and interview outcomes, and compile a structured evaluation for final recommendations."
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
                                { label: "SSB Report" }
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
                        <Tabs defaultValue="ssb-report" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="ssb-report" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    SSB Report
                                </TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <TabsTrigger value="ssb-report" className="flex items-center gap-2 border border-transparent hover:!border-blue-700">
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

                            {/* SSB Report Form */}
                            <TabsContent value="ssb-report" className="space-y-6">
                                <Card className="shadow-lg rounded-xl p-6 border border-border">
                                    <CardHeader className="mb-4">
                                        <CardTitle className="text-lg font-semibold text-primary">SSB Report Form</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            Fill out candidate evaluation details as per SSB format.
                                        </p>
                                    </CardHeader>

                                    <CardContent>
                                        <form
                                            className="space-y-6"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData(e.currentTarget);
                                                const data = Object.fromEntries(formData.entries());
                                                console.log("SSB Report Data:", data);
                                            }}
                                        >
                                            {/* Positive Traits */}
                                            <div>
                                                <label className="text-sm font-medium">Positive Traits</label>
                                                <div className="space-y-2 mt-2">
                                                    {positiveTraits.map((trait, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <Input
                                                                value={trait}
                                                                onChange={(e) =>
                                                                    handleChange("positive", index, e.target.value)
                                                                }
                                                                placeholder={`Positive trait ${index + 1}`}
                                                                className="flex-1"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => removeField("positive", index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => addField("positive")}
                                                    >
                                                        + Add Positive Trait
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Negative Traits */}
                                            <div>
                                                <label className="text-sm font-medium">Negative Traits</label>
                                                <div className="space-y-2 mt-2">
                                                    {negativeTraits.map((trait, index) => (
                                                        <div key={index} className="flex items-center gap-2">
                                                            <Input
                                                                value={trait}
                                                                onChange={(e) =>
                                                                    handleChange("negative", index, e.target.value)
                                                                }
                                                                placeholder={`Negative trait ${index + 1}`}
                                                                className="flex-1"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => removeField("negative", index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => addField("negative")}
                                                    >
                                                        + Add Negative Trait
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Overall Predictive Rating */}
                                            <div className="w-full max-w-sm">
                                                <label className="text-sm font-medium">Overall Predictive Rating as an Officer</label>
                                                <select
                                                    name="rating"
                                                    className="mt-1 w-full rounded-md border p-2 text-sm"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Select Rating</option>
                                                    <option value="OS">Outstanding (OS)</option>
                                                    <option value="WAA">Way Above Avg (WAA)</option>
                                                    <option value="AA">Above Avg (AA)</option>
                                                    <option value="JAA">Just Above Avg (JAA)</option>
                                                    <option value="HA">High Avg (HA)</option>
                                                    <option value="LA">Low Avg (LA)</option>
                                                    <option value="JBA">Just Below Avg (JBA)</option>
                                                    <option value="BA">Below Avg (BA)</option>
                                                    <option value="WBA">Way Below Avg (WBA)</option>
                                                    <option value="Poor">Poor</option>
                                                </select>
                                            </div>


                                            {/* Remarks */}
                                            {/* <div>
                                                <label className="text-sm font-medium">Remarks</label>
                                                <Textarea name="remarks" placeholder="General remarks..." className="mt-1 resize-y" />
                                            </div> */}

                                            {/* By (IO/GTO/Psy/TO) */}
                                            <div className="w-full max-w-sm">
                                                <label className="text-sm font-medium">By</label>
                                                <select
                                                    name="by"
                                                    className="mt-1 w-full rounded-md border p-2 text-sm"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Select</option>
                                                    <option value="IO">IO</option>
                                                    <option value="GTO">GTO</option>
                                                    <option value="Psy">Psy</option>
                                                    <option value="TO">TO</option>
                                                </select>
                                            </div>



                                            {/* Scope of Improvement */}
                                            <div>
                                                <label className="text-sm font-medium">Scope of Improvement</label>
                                                <Textarea name="improvement" placeholder="Mention areas of improvement..." className="mt-1 resize-y" />
                                            </div>

                                            {/* Actions */}
                                            <div className="flex justify-end gap-2">
                                                <Button type="reset" variant="outline">Reset</Button>
                                                <Button type="submit">Save</Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
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
