import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { OCListItem } from "@/components/oc/OCCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { PageHeader } from "@/components/layout/PageHeader";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import GlobalTabs from "@/components/Tabs/GlobalTabs";
import { OCRecord, ocTabs } from "@/config/app.config";

export default function OCManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const [ocList, setOcList] = useState<OCRecord[]>([
    {
      tesNo: "1",
      name: "Rahul Sharma",
      course: "TES-43",
      dtOfArrival: "2023-01-10",
      visibleIdenMks: "",
      pl: "Arjun",
      dob: "2002-05-14",
      placeOfBirth: "Delhi",
      domicile: "Delhi",
      religion: "Hindu",
      nationality: "Indian",
      bloodGp: "B+",
      idenMarks: "Mole on right hand",
      fatherName: "Rajesh Sharma",
      fatherMobile: "9876543210",
      fatherAddress: "Delhi Cantt",
      fatherProfession: "Engineer",
      guardianName: "",
      guardianAddress: "",
      monthlyIncome: "80000",
      nokDetails: "Mother – Sunita Sharma",
      nokAddress: "Delhi Cantt",
      nearestRlyStn: "New Delhi",
      secunderabadAddr: "",
      relativeArmedForces: "",
      govtFinAsst: "No",
      mobNo: "9876543210",
      email: "rahul.sharma@example.com",
      passportNo: "",
      panCardNo: "",
      aadharNo: "123456789012",
      bankDetails: "SBI Delhi",
      idCardNo: "ID123",
      upscRollNo: "",
      ssbCentre: "Bhopal",
      games: "Football",
      hobbies: "Reading",
      swimmerStatus: "Swimmer",
      language: "Hindi, English",
    },
    {
      tesNo: "2",
      name: "Arjun Verma",
      course: "TES-44",
      dtOfArrival: "2023-02-05",
      visibleIdenMks: "",
      pl: "Chandragupt",
      dob: "2001-12-22",
      placeOfBirth: "Lucknow",
      domicile: "UP",
      religion: "Hindu",
      nationality: "Indian",
      bloodGp: "O+",
      idenMarks: "Scar on left cheek",
      fatherName: "Suresh Verma",
      fatherMobile: "9876501234",
      fatherAddress: "Lucknow, UP",
      fatherProfession: "Teacher",
      guardianName: "",
      guardianAddress: "",
      monthlyIncome: "60000",
      nokDetails: "Father – Suresh Verma",
      nokAddress: "Lucknow",
      nearestRlyStn: "Lucknow Jn",
      secunderabadAddr: "",
      relativeArmedForces: "",
      govtFinAsst: "No",
      mobNo: "9876501234",
      email: "arjun.verma@example.com",
      passportNo: "",
      panCardNo: "",
      aadharNo: "123450987654",
      bankDetails: "PNB Lucknow",
      idCardNo: "ID124",
      upscRollNo: "",
      ssbCentre: "Allahabad",
      games: "Basketball",
      hobbies: "Music",
      swimmerStatus: "Non-Swimmer",
      language: "Hindi, English",
    },
    {
      tesNo: "3",
      name: "Karan Singh",
      course: "TES-45",
      dtOfArrival: "2023-03-12",
      visibleIdenMks: "",
      pl: "Ranapratap",
      dob: "2002-03-30",
      placeOfBirth: "Jaipur",
      domicile: "Rajasthan",
      religion: "Sikh",
      nationality: "Indian",
      bloodGp: "A+",
      idenMarks: "Tattoo on right arm",
      fatherName: "Harbhajan Singh",
      fatherMobile: "9876512345",
      fatherAddress: "Jaipur, RJ",
      fatherProfession: "Businessman",
      guardianName: "",
      guardianAddress: "",
      monthlyIncome: "120000",
      nokDetails: "Father – Harbhajan Singh",
      nokAddress: "Jaipur",
      nearestRlyStn: "Jaipur",
      secunderabadAddr: "",
      relativeArmedForces: "",
      govtFinAsst: "No",
      mobNo: "9876512345",
      email: "karan.singh@example.com",
      passportNo: "",
      panCardNo: "",
      aadharNo: "987654321123",
      bankDetails: "HDFC Jaipur",
      idCardNo: "ID125",
      upscRollNo: "",
      ssbCentre: "Bangalore",
      games: "Cricket",
      hobbies: "Photography",
      swimmerStatus: "Swimmer",
      language: "Punjabi, Hindi, English",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [newOC, setNewOC] = useState<OCRecord>({
    tesNo: "",
    name: "",
    course: "",
    dtOfArrival: "",
    visibleIdenMks: "",
    pl: "",
    dob: "",
    placeOfBirth: "",
    domicile: "",
    religion: "",
    nationality: "",
    bloodGp: "",
    idenMarks: "",
    fatherName: "",
    fatherMobile: "",
    fatherAddress: "",
    fatherProfession: "",
    guardianName: "",
    guardianAddress: "",
    monthlyIncome: "",
    nokDetails: "",
    nokAddress: "",
    nearestRlyStn: "",
    secunderabadAddr: "",
    relativeArmedForces: "",
    govtFinAsst: "",
    mobNo: "",
    email: "",
    passportNo: "",
    panCardNo: "",
    aadharNo: "",
    bankDetails: "",
    idCardNo: "",
    upscRollNo: "",
    ssbCentre: "",
    games: "",
    hobbies: "",
    swimmerStatus: "",
    language: "",
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

    // Reset
    setNewOC({
      tesNo: "",
      name: "",
      course: "",
      dtOfArrival: "",
      visibleIdenMks: "",
      pl: "",
      dob: "",
      placeOfBirth: "",
      domicile: "",
      religion: "",
      nationality: "",
      bloodGp: "",
      idenMarks: "",
      fatherName: "",
      fatherMobile: "",
      fatherAddress: "",
      fatherProfession: "",
      guardianName: "",
      guardianAddress: "",
      monthlyIncome: "",
      nokDetails: "",
      nokAddress: "",
      nearestRlyStn: "",
      secunderabadAddr: "",
      relativeArmedForces: "",
      govtFinAsst: "",
      mobNo: "",
      email: "",
      passportNo: "",
      panCardNo: "",
      aadharNo: "",
      bankDetails: "",
      idCardNo: "",
      upscRollNo: "",
      ssbCentre: "",
      games: "",
      hobbies: "",
      swimmerStatus: "",
      language: "",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteOC = (index: number) => {
    const updatedList = [...ocList];
    updatedList.splice(index, 1);
    setOcList(updatedList);
  };

  const handleEditOC = (index: number) => {
    setNewOC({ ...ocList[index] });
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleAddOC = () => {
    setNewOC({
      tesNo: "",
      name: "",
      course: "",
      dtOfArrival: "",
      visibleIdenMks: "",
      pl: "",
      dob: "",
      placeOfBirth: "",
      domicile: "",
      religion: "",
      nationality: "",
      bloodGp: "",
      idenMarks: "",
      fatherName: "",
      fatherMobile: "",
      fatherAddress: "",
      fatherProfession: "",
      guardianName: "",
      guardianAddress: "",
      monthlyIncome: "",
      nokDetails: "",
      nokAddress: "",
      nearestRlyStn: "",
      secunderabadAddr: "",
      relativeArmedForces: "",
      govtFinAsst: "",
      mobNo: "",
      email: "",
      passportNo: "",
      panCardNo: "",
      aadharNo: "",
      bankDetails: "",
      idCardNo: "",
      upscRollNo: "",
      ssbCentre: "",
      games: "",
      hobbies: "",
      swimmerStatus: "",
      language: "",
    });
    setEditIndex(null);
    setIsDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    const formatRecord = (obj: any): OCRecord => ({
      tesNo: obj["TesNo"] || "",
      name: obj["Name"] || "",
      course: obj["Course"] || "",
      dtOfArrival: obj["Dt of Arrival"] || "",
      visibleIdenMks: obj["Visible Iden Mks"] || "",
      pl: obj["Pl"] || "",
      dob: obj["DOB"] || "",
      placeOfBirth: obj["Place of Birth"] || "",
      domicile: obj["Domicile"] || "",
      religion: obj["Religion"] || "",
      nationality: obj["Nationality"] || "",
      bloodGp: obj["Blood Gp"] || "",
      idenMarks: obj["Iden Marks"] || "",
      fatherName: obj["Father's Name"] || "",
      fatherMobile: obj["Father's Mobile No"] || "",
      fatherAddress: obj["Father's Address"] || "",
      fatherProfession: obj["Father's Profession"] || "",
      guardianName: obj["Guardian’s Name"] || "",
      guardianAddress: obj["Guardian’s Address"] || "",
      monthlyIncome: obj["Monthly Income (Parents/Guardian)"] || "",
      nokDetails: obj["Detls of NOK"] || "",
      nokAddress: obj["NOK Permanent & Present Address"] || "",
      nearestRlyStn: obj["Nearest Rly Stn"] || "",
      secunderabadAddr: obj["Address of Family/Friends in Secunderabad"] || "",
      relativeArmedForces: obj["Rk, Name & Reln of Near Relative in Armed Forces"] || "",
      govtFinAsst: obj["Govt Fin Asst"] || "",
      mobNo: obj["Mob No"] || "",
      email: obj["Email"] || "",
      passportNo: obj["Passport No"] || "",
      panCardNo: obj["PAN Card No"] || "",
      aadharNo: obj["Aadhar No"] || "",
      bankDetails: obj["Bank Detls"] || "",
      idCardNo: obj["Iden Card No"] || "",
      upscRollNo: obj["UPSC Roll No"] || "",
      ssbCentre: obj["SSB Centre"] || "",
      games: obj["Games"] || "",
      hobbies: obj["Hobbies"] || "",
      swimmerStatus: obj["Swimmer/Non-Swimmer"] || "",
      language: obj["Language"] || "",
    });

    if (fileName.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const formatted = results.data.map(formatRecord);
          setOcList((prev) => [...prev, ...formatted]);
        },
      });
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const formatted = (worksheet as any[]).map(formatRecord);
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
            <PageHeader
              title="OC Management"
              description="Manage all OC details across platoons and terms"
              onLogout={handleLogout}
            />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Breadcrumb */}
            <BreadcrumbNav
              paths={[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Gen Mgmt", href: "/dashboard/genmgmt" },
                { label: "OC Management" }
              ]}
            />

            <GlobalTabs tabs={ocTabs} defaultValue="all">
              {/* OC Management (local tab) */}
              <TabsContent value="all" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">All OCs</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAddOC}>
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
                    href="/sample/Sample_OC_Upload_WithNames.xlsx"
                    download
                    className="text-sm text-primary underline self-center"
                  >
                    Download Sample CSV
                  </a>
                </div>

                <div className="divide-y rounded-md border border-border/50 overflow-hidden">
                  {ocList
                    .filter(
                      (oc) =>
                        oc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        oc.tesNo.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((oc, index) => (
                      <OCListItem
                        key={index}
                        name={oc.name}
                        course={oc.course}
                        platoon={oc.pl}
                        status={"active"}
                        onClick={() => handleEditOC(index)}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditOC(index);
                          }}
                          className="flex-1 text-xs"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOC(index);
                          }}
                          className="flex-1 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </OCListItem>
                    ))}
                </div>
              </TabsContent>
            </GlobalTabs>
          </main>
        </div>
      </div>

      {/* Add/Edit OC Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? "Update OC" : "Add New OC"}</DialogTitle>
          </DialogHeader>

          {/* Pre-Commissioning Fields */}
          <h3 className="text-lg font-semibold mb-2">Pre-Commissioning TRG PH-I</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Tes No</Label>
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
              <Label>Pl</Label>
              <Input value={newOC.pl} onChange={(e) => setNewOC({ ...newOC, pl: e.target.value })} />
            </div>
            <div>
              <Label>Date of Arrival</Label>
              <Input
                type="date"
                value={newOC.dtOfArrival}
                onChange={(e) => setNewOC({ ...newOC, dtOfArrival: e.target.value })}
              />
            </div>
            <div>
              <Label>DOB</Label>
              <Input
                type="date"
                value={newOC.dob}
                onChange={(e) => setNewOC({ ...newOC, dob: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveOC}>{editIndex !== null ? "Update" : "Save"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
