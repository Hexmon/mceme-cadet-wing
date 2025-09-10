import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CommanderDetail from "./components/CommanderDetail";
import Reports from "./pages/dashboard/Reports";
import Courses from "./pages/dashboard/Courses";
import SubjectManagement from "./pages/dashboard/SubjectManagement";
import InstructorManagement from "./pages/dashboard/InstructorManagement";
import UserManagement from "./pages/dashboard/UserManagement";
import { Settings } from "lucide-react";
import AppointmentManagement from "./pages/dashboard/AppointmentManagement";
import HelpPage from "./pages/dashboard/HelpPage";
import OLQAssessment from "./pages/OLQAssessment";
import OCDetails from "./pages/OCDetails";
import ActivitiesPage from "./pages/ActivitiesPage";
import PlatoonCdr from "./pages/dashboard/interview/PlatoonCdr";
import DSCoord from "./pages/dashboard/interview/DSCoord";
import CDRCTW from "./pages/dashboard/interview/CDRCTW";
import DCCI from "./pages/dashboard/interview/DCCI";
import Comdt from "./pages/dashboard/interview/Comdt";
import Academics from "./pages/Academics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commander/:id" element={<CommanderDetail />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/courses" element={<Courses />} />
          <Route path="/dashboard/subjects" element={<SubjectManagement />} />
          <Route path="/dashboard/instructors" element={<InstructorManagement />} />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/appointments" element={<AppointmentManagement />} />
          <Route path="/dashboard/help" element={<HelpPage />} />
          <Route path="/dashboard/olqa" element={<OLQAssessment />} />
          <Route path="/dashboard/view-ocs" element={<OCDetails />} />
          <Route path="/dashboard/activities" element={<ActivitiesPage />} />
          <Route path="/dashboard/interview/platoon-cdr" element={<PlatoonCdr />} />
          <Route path="/dashboard/interview/ds-coord" element={<DSCoord />} />
          <Route path="/dashboard/interview/cdr-ctw" element={<CDRCTW />} />
          <Route path="/dashboard/interview/dcci" element={<DCCI />} />
          <Route path="/dashboard/interview/comdt" element={<Comdt />} />
          <Route path="/dashboard/academics" element={<Academics />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
