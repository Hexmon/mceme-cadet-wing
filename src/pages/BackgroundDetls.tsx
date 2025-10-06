
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
import { Search, User, LogOut, Settings, Shield, ClipboardCheck, FileSearch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { managementCard, militaryTrainingCards } from "@/config/app.config";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import SelectedCadetTable from "@/components/cadet_table/SelectedCadetTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/layout/PageHeader";

export default function BackgroundDetls() {
    const selectedCadet = useSelector((state: RootState) => state.cadet.selectedCadet);
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login");
        console.log("Logout clicked");

    };

    const [family, setFamily] = useState([
        { name: "", relation: "", age: "", occupation: "", education: "", mobile: "" }
    ]);

    const handleChange = (index, field, value) => {
        setFamily((prev) => {
            const newArr = [...prev];
            newArr[index] = { ...newArr[index], [field]: value };
            return newArr;
        });
    };

    const handleAdd = () => {
        setFamily((prev) => [
            ...prev,
            { name: "", relation: "", age: "", occupation: "", education: "", mobile: "" },
        ]);
    };

    const handleRemove = (index) => {
        setFamily((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted data:", family);
        // send to backend or further processing
    };
    const [qualifications, setQualifications] = useState([
        {
            qualification: "",
            school: "",
            subs: "",
            board: "",
            marks: "",
            grade: ""
        }
    ]);

    const handleChangQualification = (index, field, value) => {
        const updated = [...qualifications];
        updated[index][field] = value;
        setQualifications(updated);
    };

    const handleAddQualification = () => {
        setQualifications([
            ...qualifications,
            { qualification: "", school: "", subs: "", board: "", marks: "", grade: "" }
        ]);
    };

    const handleRemoveQualification = (index) => {
        setQualifications(qualifications.filter((_, i) => i !== index));
    };

    const handleSubmitQualification = (e) => {
        e.preventDefault();
        console.log("Submitted Educational Qualifications:", qualifications);
        // you can now send this data to API or use it in context
    };

    const [achievements, setAchievements] = useState([
        { event: "", year: "", level: "", prize: "" }
    ]);

    const handleChangeAchievements = (index, field, value) => {
        const updated = [...achievements];
        updated[index][field] = value;
        setAchievements(updated);
    };

    const handleAddAchievements = () => {
        setAchievements([...achievements, { event: "", year: "", level: "", prize: "" }]);
    };

    const handleRemoveAchievements = (index) => {
        setAchievements(achievements.filter((_, i) => i !== index));
    };

    const handleSubmitAchievements = (e) => {
        e.preventDefault();
        console.log("Submitted Achievements:", achievements);
        // Submit or store your achievements data
    };

    const [autoBio, setAutoBio] = useState({
        general: "",
        proficiency: "",
        work: "",
        additional: "",
        date: "",
        sign_oc: "",
        sign_pi: "",
    });

    const handleChangeAutoBio = (e) => {
        const { name, value } = e.target;
        setAutoBio({ ...autoBio, [name]: value });
    };

    const handleSubmitAutoBio = (e) => {
        e.preventDefault();
        alert("Form submitted successfully\n" + JSON.stringify(autoBio, null, 2));
    };


    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />

                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <PageHeader
                        title="Background Details"
                        description="Maintain and review cadets' background information, including family, education, and prior experiences, to support evaluation and record-keeping."
                        onLogout={handleLogout}
                    />



                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        {/* Breadcrumb */}
                        <BreadcrumbNav
                            paths={[
                                { label: "Dashboard", href: "/dashboard" },
                                { label: "Dossier", href: "/dashboard/milmgmt" },
                                { label: "Background Details" }
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
                        <Tabs defaultValue="background-detls" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="background-detls" className="flex items-center gap-2">
                                    <FileSearch className="h-4 w-4" />
                                    Background Details
                                </TabsTrigger>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <TabsTrigger value="background-detls" className="flex items-center gap-2 border hover:border-blue-600 ">
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
                                value="background-detls"
                                className="space-y-6"
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="family-bgrnd" className="flex items-center gap-2">
                                        Family Background
                                    </TabsTrigger>
                                    <TabsTrigger value="edn-qlf" className="flex items-center gap-2">
                                        Educational Qualification
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                                        Achievements
                                    </TabsTrigger>
                                    <TabsTrigger value="auto-bio" className="flex items-center gap-2">
                                        Autobiography
                                    </TabsTrigger>
                                </TabsList>

                            </TabsContent>
                            <TabsContent
                                value="family-bgrnd"
                                className="space-y-6"
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="family-bgrnd" className="flex items-center gap-2">
                                        Family Background
                                    </TabsTrigger>
                                    <TabsTrigger value="edn-qlf" className="flex items-center gap-2">
                                        Educational Qualification
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                                        Achievements
                                    </TabsTrigger>
                                    <TabsTrigger value="auto-bio" className="flex items-center gap-2">
                                        Autobiography
                                    </TabsTrigger>
                                </TabsList>

                                <form onSubmit={handleSubmit}>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border px-4 py-2">S. No</th>
                                                    <th className="border px-4 py-2">Name</th>
                                                    <th className="border px-4 py-2">Relation</th>
                                                    <th className="border px-4 py-2">Age</th>
                                                    <th className="border px-4 py-2">Occupation</th>
                                                    <th className="border px-4 py-2">Edn Qual</th>
                                                    <th className="border px-4 py-2">Mob No</th>
                                                    <th className="border px-4 py-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {family.map((member, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={member.name}
                                                                onChange={(e) => handleChange(idx, "name", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={member.relation}
                                                                onChange={(e) => handleChange(idx, "relation", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={member.age}
                                                                onChange={(e) => handleChange(idx, "age", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={member.occupation}
                                                                onChange={(e) => handleChange(idx, "occupation", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={member.education}
                                                                onChange={(e) => handleChange(idx, "education", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="tel"
                                                                value={member.mobile}
                                                                onChange={(e) => handleChange(idx, "mobile", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2 text-center">
                                                            <button
                                                                type="button"
                                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                                onClick={() => handleRemove(idx)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 flex gap-2 items-center justify-center">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={handleAdd}
                                        >
                                            Add Member
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>


                            </TabsContent>

                            <TabsContent
                                value="edn-qlf"
                                className="space-y-6"
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="family-bgrnd" className="flex items-center gap-2">
                                        Family Background
                                    </TabsTrigger>
                                    <TabsTrigger value="edn-qlf" className="flex items-center gap-2">
                                        Educational Qualification
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                                        Achievements
                                    </TabsTrigger>
                                    <TabsTrigger value="auto-bio" className="flex items-center gap-2">
                                        Autobiography
                                    </TabsTrigger>
                                </TabsList>

                                <form onSubmit={handleSubmitQualification}>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border px-4 py-2">S. No</th>
                                                    <th className="border px-4 py-2">Qualification</th>
                                                    <th className="border px-4 py-2">School</th>
                                                    <th className="border px-4 py-2">Subs</th>
                                                    <th className="border px-4 py-2">Board</th>
                                                    <th className="border px-4 py-2">Marks (%)</th>
                                                    <th className="border px-4 py-2">Grade/Div</th>
                                                    <th className="border px-4 py-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {qualifications.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.qualification}
                                                                onChange={(e) => handleChangQualification(idx, "qualification", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                placeholder="10th, 12th, etc."
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.school}
                                                                onChange={(e) => handleChangQualification(idx, "school", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.subs}
                                                                onChange={(e) => handleChangQualification(idx, "subs", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.board}
                                                                onChange={(e) => handleChangQualification(idx, "board", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="number"
                                                                value={item.marks}
                                                                onChange={(e) => handleChangQualification(idx, "marks", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                placeholder="%"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.grade}
                                                                onChange={(e) => handleChangQualification(idx, "grade", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2 text-center">
                                                            <button
                                                                type="button"
                                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                                onClick={() => handleRemoveQualification(idx)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 flex gap-2 justify-center items-center">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={handleAddQualification}
                                        >
                                            Add Qualification
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>


                            </TabsContent>

                            <TabsContent
                                value="achievements"
                                className="space-y-6"
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="family-bgrnd" className="flex items-center gap-2">
                                        Family Background
                                    </TabsTrigger>
                                    <TabsTrigger value="edn-qlf" className="flex items-center gap-2">
                                        Educational Qualification
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                                        Achievements
                                    </TabsTrigger>
                                    <TabsTrigger value="auto-bio" className="flex items-center gap-2">
                                        Autobiography
                                    </TabsTrigger>
                                </TabsList>

                                <form onSubmit={handleSubmitAchievements}>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm text-left border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border px-4 py-2">S. No</th>
                                                    <th className="border px-4 py-2">Event</th>
                                                    <th className="border px-4 py-2">Year</th>
                                                    <th className="border px-4 py-2">Level (National/State)</th>
                                                    <th className="border px-4 py-2">Prize</th>
                                                    <th className="border px-4 py-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {achievements.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.event}
                                                                onChange={(e) => handleChangeAchievements(idx, "event", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                placeholder="e.g. Olympiad"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="number"
                                                                value={item.year}
                                                                onChange={(e) => handleChangeAchievements(idx, "year", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                placeholder="e.g. 2022"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <select
                                                                value={item.level}
                                                                onChange={(e) => handleChangeAchievements(idx, "level", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="National">National</option>
                                                                <option value="State">State</option>
                                                                <option value="District">District</option>
                                                                <option value="School">School</option>
                                                            </select>
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <input
                                                                type="text"
                                                                value={item.prize}
                                                                onChange={(e) => handleChangeAchievements(idx, "prize", e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded"
                                                                placeholder="Gold Medal, 1st Prize, etc."
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2 text-center">
                                                            <button
                                                                type="button"
                                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                                onClick={() => handleRemoveAchievements(idx)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 flex gap-2 items-center justify-center">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={handleAddAchievements}
                                        >
                                            Add Achievement
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>


                            </TabsContent>

                            <TabsContent
                                value="auto-bio"
                                className="space-y-6"
                            >
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="family-bgrnd" className="flex items-center gap-2">
                                        Family Background
                                    </TabsTrigger>
                                    <TabsTrigger value="edn-qlf" className="flex items-center gap-2">
                                        Educational Qualification
                                    </TabsTrigger>
                                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                                        Achievements
                                    </TabsTrigger>
                                    <TabsTrigger value="auto-bio" className="flex items-center gap-2">
                                        Autobiography
                                    </TabsTrigger>
                                </TabsList>

                                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="bg-white p-8 rounded-2xl shadow-md w-full"
                                    >
                                        <h2 className="text-xl font-bold text-center mb-6 uppercase">
                                            Confidential - Autobiography Form
                                        </h2>

                                        {/* General / Self */}
                                        <label className="block font-semibold mb-2">1. General / Self</label>
                                        <textarea
                                            name="general"
                                            value={autoBio.general}
                                            onChange={handleChangeAutoBio}
                                            rows={4}
                                            placeholder="Write about yourself..."
                                            className="w-full p-3 border rounded-lg mb-4"
                                        />

                                        {/* Proficiency */}
                                        <label className="block font-semibold mb-2">
                                            2. Proficiency in Games / Sports / Special Achievements
                                        </label>
                                        <textarea
                                            name="proficiency"
                                            value={autoBio.proficiency}
                                            onChange={handleChangeAutoBio}
                                            rows={4}
                                            placeholder="List achievements..."
                                            className="w-full p-3 border rounded-lg mb-4"
                                        />

                                        {/* Work */}
                                        <label className="block font-semibold mb-2">
                                            3. Areas I Need to Work Upon
                                        </label>
                                        <textarea
                                            name="work"
                                            value={autoBio.work}
                                            onChange={handleChangeAutoBio}
                                            rows={4}
                                            placeholder="Describe areas of improvement..."
                                            className="w-full p-3 border rounded-lg mb-4"
                                        />

                                        {/* Additional */}
                                        <label className="block font-semibold mb-2">
                                            4. Any Additional Info not Covered Above
                                        </label>
                                        <textarea
                                            name="additional"
                                            value={autoBio.additional}
                                            onChange={handleChangeAutoBio}
                                            rows={4}
                                            placeholder="Any other details..."
                                            className="w-full p-3 border rounded-lg mb-4"
                                        />

                                        {/* Date */}
                                        <label className="block font-semibold mb-2">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={autoBio.date}
                                            onChange={handleChangeAutoBio}
                                            className="w-full p-3 border rounded-lg mb-6"
                                        />

                                        {/* Signatures */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-semibold mb-2">Sign of OC</label>
                                                <input
                                                    type="text"
                                                    name="sign_oc"
                                                    value={autoBio.sign_oc}
                                                    onChange={handleChangeAutoBio}
                                                    placeholder="Enter signature / name"
                                                    className="w-full p-3 border rounded-lg"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-2">Sign of PI Cdr</label>
                                                <input
                                                    type="text"
                                                    name="sign_pi"
                                                    value={autoBio.sign_pi}
                                                    onChange={handleChangeAutoBio}
                                                    placeholder="Enter signature / name"
                                                    className="w-full p-3 border rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="mt-8 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Submit
                                        </button>
                                    </form>
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
