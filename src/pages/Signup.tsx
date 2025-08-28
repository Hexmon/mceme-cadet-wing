import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    phone: "",
    rank: "",
    name: "",
    appointment: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [validations, setValidations] = useState({
    passwordStrength: false,
    passwordMatch: false,
    usernameUnique: false
  });

  const appointments = [
    "Commander",
    "Deputy Commander", 
    "DS Coord",
    "HoAT",
    "CCO",
    "Platoon Commander",
    "OC"
  ];

  const checkPasswordStrength = (password: string) => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    
    return hasLength && hasNumber && hasSpecial && hasUpper;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({...formData, password});
    setValidations({
      ...validations,
      passwordStrength: checkPasswordStrength(password),
      passwordMatch: password === formData.confirmPassword
    });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData({...formData, confirmPassword});
    setValidations({
      ...validations,
      passwordMatch: formData.password === confirmPassword
    });
  };

  const handleUsernameChange = (username: string) => {
    setFormData({...formData, username});
    // Mock username uniqueness check
    setValidations({
      ...validations,
      usernameUnique: username.length >= 3 && !["admin", "test", "user"].includes(username.toLowerCase())
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { phone, rank, name, appointment, username, password, confirmPassword } = formData;
    
    if (!phone || !rank || !name || !appointment || !username || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!validations.passwordStrength) {
      toast({
        title: "Error", 
        description: "Password must be at least 8 characters with uppercase, number, and special character",
        variant: "destructive"
      });
      return;
    }

    if (!validations.passwordMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!validations.usernameUnique) {
      toast({
        title: "Error",
        description: "Username is not available",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Account Created Successfully",
      description: "You can now sign in with your credentials"
    });
    
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
          alt="MCEME Background" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <img 
            src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
            alt="MCEME Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-primary-foreground">Create Account</h1>
          <p className="text-primary-foreground/80">Join the MCEME CTW Portal</p>
        </div>

        <Card className="shadow-command">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              New User Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank">Rank</Label>
                  <Input
                    id="rank"
                    type="text"
                    value={formData.rank}
                    onChange={(e) => setFormData({...formData, rank: e.target.value})}
                    placeholder="e.g., Captain, Major"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment">Appointment</Label>
                <Select 
                  value={formData.appointment} 
                  onValueChange={(value) => setFormData({...formData, appointment: value})}
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

              <div className="space-y-2">
                <Label htmlFor="username">Unique Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="Choose a unique username"
                    required
                  />
                  {formData.username && (
                    <div className="absolute right-3 top-3">
                      {validations.usernameUnique ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {formData.username && !validations.usernameUnique && (
                  <p className="text-xs text-red-500">Username not available</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Create a strong password"
                    required
                  />
                  {formData.password && (
                    <div className="absolute right-3 top-3">
                      {validations.passwordStrength ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be 8+ characters with uppercase, number, and special character
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  {formData.confirmPassword && (
                    <div className="absolute right-3 top-3">
                      {validations.passwordMatch ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" variant="hero">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button asChild variant="link" className="text-primary-foreground">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;