import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpPage() {
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
                  <h1 className="text-lg font-semibold text-primary">Help / How-To</h1>
                  <p className="text-sm text-muted-foreground">Instructions for filling the Dossier</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
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
          <main className="flex-1 p-6 space-y-6">
            {/* Breadcrumb */}
            <div className="mb-4">
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
                    Help / How-To
                  </li>
                </ol>
              </nav>
            </div>

            {/* Title */}
            <div className="text-center">
              <Info className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h2 className="text-2xl font-semibold text-foreground">Instructions for Filling the Dossier</h2>
            </div>

            {/* Instructions */}
            <div className="prose prose-sm max-w-4xl mx-auto text-muted-foreground">
              <ol className="space-y-2 list-decimal pl-6">
                <li>
                  A Dossier is the most important document pertaining to the training of an OC in CTW, MCEME,
                  Secunderabad. It provides complete personal details of the OC and also provides essential info
                  about the OC’s performance during the training. In addition, an updated and well-maintained dossier
                  provides necessary inputs about the potential of an OC. Timely and appropriate entries in the
                  dossier by the PI Cdrs / Directing Staff is therefore essential to analyse the performance of the OC
                  at each stage of training and consequently provide deductions/inferences to gauge his potential to
                  be an officer in the Indian Army.
                </li>
                <li>
                  Dossiers of OCs will be maintained by respective PI Cdrs. Each OC will be assessed as an
                  individual; generic comments should be avoided. The endeavour should be to be specific so that a
                  clear profile of OC’s performance and potential emerges.
                </li>
                <li>
                  Dossier will always be kept in the custody of respective PI Cdrs. The Dossier of an OC should be
                  updated after conduct of every event. This Dossier will always be kept under lock and key and as
                  per security defined.
                </li>
                <li>
                  On the second page of the dossier, TES No, Name of OC and Date of Arrival are to be filled in ink
                  and rest of the details to be filled in pencil. Two photographs of OCs to be pasted in the box
                  provided – one in civil cloth on arrival and one in 6th term in uniform before passing out.
                </li>
                <li>
                  All entries to be filled in ink and in person by the PI Cdr.
                </li>
                <li>
                  Dossiers will be updated / checked as per frequency and will be put up as mentioned below:
                  <ul className="list-disc pl-6 mt-1">
                    <li>PI Cdr – Weekly</li>
                    <li>DS Coord / Dy Cdr – Monthly</li>
                    <li>Cdr – Quarterly</li>
                  </ul>
                </li>
                <li>
                  All the initials should be affixed with date.
                </li>
                <li>
                  Proper Handing/Taking Over of dossiers should be done whenever there is a turnover of PI Cdrs.
                </li>
                <li>
                  Read the instructions carefully before filling up the dossier. Also, refer:
                  <br />
                  “Standing Directive on Trg to the Comdts of PCTAs & CTWs by ARTRAC vide letter No 93502/ Syllabus/ PCT dt 03 Oct 23 & amdt there after and HQ ARTRAC Adm Instr for PCTAs and CTWs issued vide HQ ARTRAC letter No 935036/ PCT dt 19 Jul 18 also for filling up of the dossier.”
                </li>
              </ol>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
