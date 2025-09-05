import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { appointments, platoonsdata } from "@/config/app.config";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const isOcCorner = searchParams.get("role") === "oc";

  const appointmentUsernames: Record<string, string> = {
    Commander: "commander_user",
    "Deputy Commander": "deputy_commander_user",
    "DS Coord": "ds_coord_user",
    HoAT: "hoat_user",
    CCO: "cco_user",
    "Platoon Commander": "" // Will be set dynamically based on platoon selection
  };


  const [formData, setFormData] = useState({
    username: "",
    password: "",
    appointment: isOcCorner ? "OC" : "",
    platoon: "" // new field
  });

  const [isUsernameManuallyEdited, setIsUsernameManuallyEdited] = useState(false);


  const handleAppointmentChange = (value: string) => {
  const autoUsername =
    value === "Platoon Commander" ? "" : appointmentUsernames[value] || "";

  setFormData((prev) => ({
    ...prev,
    appointment: value,
    username: isUsernameManuallyEdited ? prev.username : autoUsername,
    platoon: value === "Platoon Commander" ? prev.platoon : "" // preserve platoon if still relevant
  }));

  if (value !== "Platoon Commander") {
    setIsUsernameManuallyEdited(false);
  }
};


const handlePlatoonChange = (value: string) => {
  const selectedPlatoon = platoonsdata.find((p) => p.name === value);
  const autoUsername = selectedPlatoon?.username || "";

  setFormData((prev) => ({
    ...prev,
    platoon: value,
    username: isUsernameManuallyEdited ? prev.username : autoUsername
  }));

  setIsUsernameManuallyEdited(false); // reset on change
};




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.appointment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock authentication
    toast({
      title: "Login Successful",
      description: `Welcome, ${formData.appointment}!`
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Background Logo */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
          alt="MCEME Background"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
            alt="MCEME Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-primary-foreground">MCEME CTW Portal</h1>
          <p className="text-primary-foreground/80">Sign in to access your account</p>
        </div>

        {isOcCorner ? (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold text-primary text-center">
              🚧 Coming Soon 🚧
            </h2>
          </div>
        ) : (

          < Card className="shadow-command">
            <CardHeader>
              <CardTitle className="text-center text-primary">
                Sign in to MCEME CTW Portal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Appointment */}
                <div className="space-y-2">
                  <Label htmlFor="appointment">Appointment</Label>
                  <Select
                    value={formData.appointment}
                    onValueChange={handleAppointmentChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your appointment" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointments.map((appointment) => (
                        <SelectItem key={appointment} value={appointment}>
                          {appointment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Platoon Dropdown only for Platoon Commander */}
                {formData.appointment === "Platoon Commander" && (
                  <div className="space-y-2">
                    <Label htmlFor="platoon">Platoon</Label>
                    <Select
                      value={formData.platoon}
                      onValueChange={handlePlatoonChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your platoon" />
                      </SelectTrigger>
                      <SelectContent>
                        {platoonsdata.map((platoon) => (
                          <SelectItem key={platoon.name} value={platoon.name}>
                            {platoon.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Username - auto-filled but editable */}
                {/* Username - auto-filled but editable */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                      setIsUsernameManuallyEdited(true);
                    }}
                    placeholder="Username auto-filled"
                    required
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                </div>



                <Button type="submit" className="w-full" variant="hero">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/signup">Create New Account</Link>
                  </Button>
                  <Button asChild variant="ghost" className="flex-1">
                    <Link to="/reset-password">Forgot Password?</Link>
                  </Button>
                </div>
              </div>

              {/* <div className="mt-6 p-3 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground text-center">
                  Internal use only. 'Students' are referred to as Officer Cadets (OCs).
                </p>
              </div> */}
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <Button asChild variant="link" className="text-primary-foreground">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div >
  );
};

export default Login;