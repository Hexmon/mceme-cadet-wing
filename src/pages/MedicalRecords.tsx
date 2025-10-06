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
import { Search, User, LogOut, Settings, Shield, ClipboardCheck, ChevronDown, FileText, HeartPulse } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, militaryTrainingCards } from "@/config/app.config";
import { Textarea } from "@/components/ui/textarea";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/layout/PageHeader";



export default function MedicalRecords() {
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        console.log("Logout clicked");
    };

    const [rows, setRows] = useState([
        { term: "", date: "", age: "", height: "", ibw: "", abw: "", overw: "", bmi: "", chest: "" }
    ]);

    const addRow = () => {
        setRows([...rows, { term: "", date: "", age: "", height: "", ibw: "", abw: "", overw: "", bmi: "", chest: "" }]);
    };

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rows);
        alert("Form submitted! Check console for data.");
    };
    const removeRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
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
                            title="Medical Records"
                            description="Maintain and review cadet medical history, document examinations, track treatments, and ensure accurate health records for evaluation and care."
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
                                { label: "Medical Records" }
                            ]}
                        />


                        {/* welcome section */}
                        {/* <div className="mb-8">
                            <h2 className="text-2xl font-bold text-primary mb-2">Dossier Inspection Sheet</h2>
                            <p className="text-muted-foreground">
                                Record, maintain, and review cadet dossiers to ensure accurate documentation of performance, conduct, and progress during training and service.
                            </p>
                        </div> */}
                       {/* Selected Cadet Section */}
                        <div className="hidden md:flex sticky top-16 z-40">
                            {/* Sticky Top Section */}
                            {selectedCadet && (
                                <SelectedCadetTable selectedCadet={selectedCadet} />
                            )}
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="med-reocrds" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="med-reocrds" className="flex items-center gap-2">
                                    <HeartPulse className="h-4 w-4" />
                                    Medical Records
                                </TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <TabsTrigger value="med-reocrds" className="flex items-center gap-2 border border-transparent hover:!border-blue-700">
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
                            <TabsContent value="med-reocrds" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="med-info" className="flex items-center gap-2">

                                        Medical Info
                                    </TabsTrigger>
                                    <TabsTrigger value="med-cat" className="flex items-center gap-2">

                                        Medical CAT
                                    </TabsTrigger>
                                </TabsList>
                            </TabsContent>
                            <TabsContent value="med-info" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="med-info" className="flex items-center gap-2">
                                        Medical Info
                                    </TabsTrigger>
                                    <TabsTrigger value="med-cat" className="flex items-center gap-2">
                                        Medical CAT
                                    </TabsTrigger>
                                </TabsList>
                                <div className="p-6 max-w-6xl mx-auto">
                                    <h1 className="text-2xl font-bold mb-4">Medical Information Form</h1>

                                    <form onSubmit={handleSubmit}>
                                        <table className="w-full border border-gray-300 text-sm">
                                            <thead>
                                                <tr className="bg-gray-100 text-left">
                                                    <th className="p-2 border">Term/Sem</th>
                                                    <th className="p-2 border">Date</th>
                                                    <th className="p-2 border">Age</th>
                                                    <th className="p-2 border">Ht (cm)</th>
                                                    <th className="p-2 border">IBW (Kg)</th>
                                                    <th className="p-2 border">ABW (Kg)</th>
                                                    <th className="p-2 border">Overwt (%)</th>
                                                    <th className="p-2 border">BMI</th>
                                                    <th className="p-2 border">Chest (cm)</th>
                                                    <th className="p-2 border">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="text"
                                                                value={row.term}
                                                                onChange={(e) => handleChange(index, "term", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="date"
                                                                value={row.date}
                                                                onChange={(e) => handleChange(index, "date", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.age}
                                                                onChange={(e) => handleChange(index, "age", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.height}
                                                                onChange={(e) => handleChange(index, "height", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.ibw}
                                                                onChange={(e) => handleChange(index, "ibw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.abw}
                                                                onChange={(e) => handleChange(index, "abw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.overw}
                                                                onChange={(e) => handleChange(index, "overw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.bmi}
                                                                onChange={(e) => handleChange(index, "bmi", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.chest}
                                                                onChange={(e) => handleChange(index, "chest", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeRow(index)}
                                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={addRow}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                            >
                                                + Add Row
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </TabsContent>

                            <TabsContent value="med-cat" className="space-y-6">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="med-info" className="flex items-center gap-2">
                                        Medical Info
                                    </TabsTrigger>
                                    <TabsTrigger value="med-cat" className="flex items-center gap-2">
                                        Medical CAT
                                    </TabsTrigger>
                                </TabsList>
                                <div className="p-6 max-w-6xl mx-auto">
                                    <h1 className="text-2xl font-bold mb-4">Medical Information Form</h1>

                                    <form onSubmit={handleSubmit}>
                                        <table className="w-full border border-gray-300 text-sm">
                                            <thead>
                                                <tr className="bg-gray-100 text-left">
                                                    <th className="p-2 border">Term/Sem</th>
                                                    <th className="p-2 border">Date</th>
                                                    <th className="p-2 border">Age</th>
                                                    <th className="p-2 border">Ht (cm)</th>
                                                    <th className="p-2 border">IBW (Kg)</th>
                                                    <th className="p-2 border">ABW (Kg)</th>
                                                    <th className="p-2 border">Overwt (%)</th>
                                                    <th className="p-2 border">BMI</th>
                                                    <th className="p-2 border">Chest (cm)</th>
                                                    <th className="p-2 border">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="text"
                                                                value={row.term}
                                                                onChange={(e) => handleChange(index, "term", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="date"
                                                                value={row.date}
                                                                onChange={(e) => handleChange(index, "date", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.age}
                                                                onChange={(e) => handleChange(index, "age", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.height}
                                                                onChange={(e) => handleChange(index, "height", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.ibw}
                                                                onChange={(e) => handleChange(index, "ibw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.abw}
                                                                onChange={(e) => handleChange(index, "abw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.overw}
                                                                onChange={(e) => handleChange(index, "overw", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.bmi}
                                                                onChange={(e) => handleChange(index, "bmi", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border">
                                                            <input
                                                                type="number"
                                                                value={row.chest}
                                                                onChange={(e) => handleChange(index, "chest", e.target.value)}
                                                                className="w-full border px-2 py-1 rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2 border text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeRow(index)}
                                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="mt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={addRow}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                            >
                                                + Add Row
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
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

        </SidebarProvider>
    );
}
