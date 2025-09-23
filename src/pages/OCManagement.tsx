import { useState } from "react";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, User, LogOut, Users, Edit3, Trash2 } from "lucide-react";
import { OCCard } from "@/components/oc/OCCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import Papa from "papaparse";

export default function OCManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ocList, setOcList] = useState([
    {
      name: "Rahul Sharma",
      tesNo: "TES-101",
      course: "Engineering",
      pi: "Arjun",
      dtOfArr: "2023-01-10",
      relegated: "",
      withdrawnOn: "",
      dtOfPassingOut: "2025-06-15",
      icNo: "IC12345",
      orderOfMerit: "1",
      regtArm: "Infantry",
      postedAtt: "1st Battalion, Delhi",
      term: "Term I",
      status: "active",
      arrivalPhoto: null,
      departurePhoto: null,
    },
    {
      name: "Arjun Verma",
      tesNo: "TES-102",
      course: "Signals",
      pi: "Chandragupt",
      dtOfArr: "2023-02-05",
      relegated: "",
      withdrawnOn: "",
      dtOfPassingOut: "2025-06-20",
      icNo: "IC12346",
      orderOfMerit: "2",
      regtArm: "Signals",
      postedAtt: "2nd Battalion, Pune",
      term: "Term II",
      status: "active",
      arrivalPhoto: null,
      departurePhoto: null,
    },
    {
      name: "Karan Singh",
      tesNo: "TES-103",
      course: "Artillery",
      pi: "Ranapratap",
      dtOfArr: "2023-03-12",
      relegated: "",
      withdrawnOn: "",
      dtOfPassingOut: "2025-06-25",
      icNo: "IC12347",
      orderOfMerit: "3",
      regtArm: "Artillery",
      postedAtt: "3rd Battalion, Jaipur",
      term: "Term I",
      status: "suspended",
      arrivalPhoto: null,
      departurePhoto: null,
    },
  ]);

  // --- Inside your OCManagement component ---

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); // 🔹 Track edit index

  const [newOC, setNewOC] = useState({
    name: "",
    tesNo: "",
    course: "",
    pi: "",
    dtOfArr: "",
    relegated: "",
    withdrawnOn: "",
    dtOfPassingOut: "",
    icNo: "",
    orderOfMerit: "",
    regtArm: "",
    postedAtt: "",
    term: "Term I",
    status: "active",
    arrivalPhoto: null,
    departurePhoto: null,
  });

  // 🔹 Save / Update OC
  const handleSaveOC = () => {
    if (editIndex !== null) {
      const updatedList = [...ocList];
      updatedList[editIndex] = newOC;
      setOcList(updatedList);
      setEditIndex(null);
    } else {
      setOcList([...ocList, newOC]);
    }

    // Reset after save
    setNewOC({
      name: "",
      tesNo: "",
      course: "",
      pi: "",
      dtOfArr: "",
      relegated: "",
      withdrawnOn: "",
      dtOfPassingOut: "",
      icNo: "",
      orderOfMerit: "",
      regtArm: "",
      postedAtt: "",
      term: "Term I",
      status: "active",
      arrivalPhoto: null,
      departurePhoto: null,
    });
    setIsDialogOpen(false);
  };

  // 🔹 Delete OC
  const handleDeleteOC = (index: number) => {
    const updatedList = [...ocList];
    updatedList.splice(index, 1);
    setOcList(updatedList);
  };

  // 🔹 Start editing
  const handleEditOC = (index: number) => {
    setNewOC(ocList[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".csv")) {
      // --- CSV Parsing ---
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const formatted = results.data.map((obj: any) => ({
            name: obj["Name"] || "",
            tesNo: obj["TES No"] || "",
            course: obj["Course"] || "",
            pi: obj["PI"] || "",
            dtOfArr: obj["Date of Arrival"] || "",
            relegated: obj["Relegated"] || "",
            withdrawnOn: obj["Withdrawn On"] || "",
            dtOfPassingOut: obj["Date of Passing Out"] || "",
            icNo: obj["IC No"] || "",
            orderOfMerit: obj["Order of Merit"] || "",
            regtArm: obj["Regt/Arm"] || "",
            postedAtt: obj["Posted/Attached To"] || "",
            term: obj["Term"] || "Term I",
            platoon: obj["Platoon"] || "",
            status: obj["Status"] || "active",
            arrivalPhoto: null,
            departurePhoto: null,
          }));

          // 🔹 Update state so cards appear
          setOcList((prev) => [...prev, ...formatted]);
        },
      });
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      // --- Excel Parsing ---
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const formatted = worksheet.map((obj: any) => ({
          name: obj["Name"] || "",
          tesNo: obj["TES No"] || "",
          course: obj["Course"] || "",
          pi: obj["PI"] || "",
          dtOfArr: obj["Date of Arrival"] || "",
          relegated: obj["Relegated"] || "",
          withdrawnOn: obj["Withdrawn On"] || "",
          dtOfPassingOut: obj["Date of Passing Out"] || "",
          icNo: obj["IC No"] || "",
          orderOfMerit: obj["Order of Merit"] || "",
          regtArm: obj["Regt/Arm"] || "",
          postedAtt: obj["Posted/Attached To"] || "",
          term: obj["Term"] || "Term I",
          platoon: obj["Platoon"] || "",
          status: obj["Status"] || "active",
          arrivalPhoto: null,
          departurePhoto: null,
        }));

        // 🔹 Update state so cards appear
        setOcList((prev) => [...prev, ...formatted]);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file type! Please upload CSV or Excel.");
    }
  };





  const handleLogout = () => console.log("Logout clicked");

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
                  <h1 className="text-lg font-semibold text-primary">OC Management</h1>
                  <p className="text-sm text-muted-foreground">Manage all OC details across platoons and terms</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search OCs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                {/* User Avatar */}
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
                    OC Management
                  </li>
                </ol>
              </nav>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">MCEME OC Management</h2>
              <p className="text-muted-foreground">
                Streamline Officer Cadet records, from arrival to commissioning, across all platoons and training terms.
              </p>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  All OCs
                </TabsTrigger>
                <Link to="/dashboard/coursemgmt" className="text-center text-muted-foreground hover:text-primary">
                  <TabsTrigger value="course-mgmt">
                    Course Management
                  </TabsTrigger>
                </Link>
                <Link to="/dashboard/subjectmgmt" className="text-center text-muted-foreground hover:text-primary">
                  <TabsTrigger value="course-mgmt">
                    Subject Management
                  </TabsTrigger>
                </Link>
                <Link to="/dashboard/usersmgmt" className="text-center text-muted-foreground hover:text-primary">
                  <TabsTrigger value="course-mgmt">
                    User Management
                  </TabsTrigger>
                </Link>
              </TabsList>


              <TabsContent value="all" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">All OCs</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                      Add OC
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("fileUpload")?.click()}
                    >
                      Upload CSV/ Excel
                    </Button>
                    <input
                      type="file"
                      id="fileUpload"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      className="hidden"
                      onChange={handleFileUpload}
                    />


                  </div>

                </div>
                <div className="flex justify-end">
                  <a
                    href="/sample/Sample_OC_Upload_Filled.xlsx"
                    download
                    className="text-sm text-primary underline self-center"
                  >
                    Download Sample CSV
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ocList
                    .filter((oc) =>
                      oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      oc.icNo.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((oc, index) => (
                      <div key={index} className="space-y-2">
                        <OCCard
                          name={oc.name}
                          term={oc.term}
                          platoon={oc.pi}
                          status={oc.status as "active" | "suspended" | "disabled"}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditOC(index)}
                            className="flex-1 text-xs"
                          >
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteOC(index)}
                            className="flex-1 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </OCCard>

                      </div>
                    ))}

                </div>
              </TabsContent>

              <TabsContent value="term1" className="space-y-6">
                <p className="text-muted-foreground text-sm">Term I OCs coming soon...</p>
              </TabsContent>

              <TabsContent value="term2" className="space-y-6">
                <p className="text-muted-foreground text-sm">Term II OCs coming soon...</p>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Add OC Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? "Update OC" : "Add New OC"}</DialogTitle>
          </DialogHeader>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col items-center border p-4 rounded-lg">
              <Label className="mb-1">Arrival </Label>
              <Input type="file" accept="image/*" placeholder="photo" onChange={(e) => setNewOC({ ...newOC, arrivalPhoto: e.target.files?.[0] || null })} />
              <Label className="mt-1">Civil Dress</Label>
            </div>
            <div className="flex flex-col items-center border p-4 rounded-lg">
              <Label className="mb-1">Departure</Label>
              <Input type="file" accept="image/*" onChange={(e) => setNewOC({ ...newOC, departurePhoto: e.target.files?.[0] || null })} />
              <Label className="mt-1">Uniform</Label>
            </div>
          </div>

          {/* Pre-Commissioning Fields */}
          <h3 className="text-lg font-semibold mb-2">Pre-Commissioning TRG PH-I</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>TES No</Label>
              <Input value={newOC.tesNo} onChange={(e) => setNewOC({ ...newOC, tesNo: e.target.value })} />
            </div>
            <div>
              <Label>Name</Label>
              <Input value={newOC.name} onChange={(e) => setNewOC({ ...newOC, name: e.target.value })} />
            </div>
            <div>
              <Label>Course</Label>
              <Input value={newOC.course} onChange={(e) => setNewOC({ ...newOC, course: e.target.value })} />
            </div>
            <div>
              <Label>PI</Label>
              <Input value={newOC.pi} onChange={(e) => setNewOC({ ...newOC, pi: e.target.value })} />
            </div>
            <div>
              <Label>Date of Arrival</Label>
              <Input type="date" value={newOC.dtOfArr} onChange={(e) => setNewOC({ ...newOC, dtOfArr: e.target.value })} />
            </div>
            <div>
              <Label>Relegated to Course & Date</Label>
              <Input value={newOC.relegated} onChange={(e) => setNewOC({ ...newOC, relegated: e.target.value })} />
            </div>
            <div>
              <Label>Withdrawn On</Label>
              <Input type="date" value={newOC.withdrawnOn} onChange={(e) => setNewOC({ ...newOC, withdrawnOn: e.target.value })} />
            </div>
          </div>

          {/* Commissioning Details */}
          <h3 className="text-lg font-semibold mb-2">Commissioning Detls</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Passing Out</Label>
              <Input type="date" value={newOC.dtOfPassingOut} onChange={(e) => setNewOC({ ...newOC, dtOfPassingOut: e.target.value })} />
            </div>
            <div>
              <Label>IC No</Label>
              <Input value={newOC.icNo} onChange={(e) => setNewOC({ ...newOC, icNo: e.target.value })} />
            </div>
            <div>
              <Label>Order of Merit</Label>
              <Input value={newOC.orderOfMerit} onChange={(e) => setNewOC({ ...newOC, orderOfMerit: e.target.value })} />
            </div>
            <div>
              <Label>Regt/Arm Allotted</Label>
              <Input value={newOC.regtArm} onChange={(e) => setNewOC({ ...newOC, regtArm: e.target.value })} />
            </div>
            <div className="col-span-2">
              <Label>Posted/Attached To (Unit & Location)</Label>
              <Input value={newOC.postedAtt} onChange={(e) => setNewOC({ ...newOC, postedAtt: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveOC}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
