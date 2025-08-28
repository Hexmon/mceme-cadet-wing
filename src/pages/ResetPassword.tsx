import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1); // 1: Username/OTP, 2: New Password
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [validations, setValidations] = useState({
    passwordStrength: false,
    passwordMatch: false,
    otpSent: false
  });

  const checkPasswordStrength = (password: string) => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    
    return hasLength && hasNumber && hasSpecial && hasUpper;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({...formData, newPassword: password});
    setValidations({
      ...validations,
      passwordStrength: checkPasswordStrength(password),
      passwordMatch: password === formData.confirmNewPassword
    });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setFormData({...formData, confirmNewPassword: confirmPassword});
    setValidations({
      ...validations,
      passwordMatch: formData.newPassword === confirmPassword
    });
  };

  const sendOTP = () => {
    if (!formData.username) {
      toast({
        title: "Error",
        description: "Please enter your username",
        variant: "destructive"
      });
      return;
    }

    // Mock OTP sending
    setValidations({...validations, otpSent: true});
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your registered phone number"
    });
  };

  const verifyOTP = () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    // Mock OTP verification
    setStep(2);
    toast({
      title: "OTP Verified",
      description: "Please set your new password"
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      verifyOTP();
      return;
    }

    const { newPassword, confirmNewPassword } = formData;
    
    if (!newPassword || !confirmNewPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
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

    toast({
      title: "Password Reset Successful",
      description: "You can now sign in with your new password"
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

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img 
            src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
            alt="MCEME Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-primary-foreground">Reset Password</h1>
          <p className="text-primary-foreground/80">Secure password recovery</p>
        </div>

        <Card className="shadow-command">
          <CardHeader>
            <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Reset Password
            </CardTitle>
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <div className={`w-8 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="otp">Verification Code</Label>
                      {!validations.otpSent && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={sendOTP}
                          className="h-auto p-0 text-primary"
                        >
                          Send OTP
                        </Button>
                      )}
                    </div>
                    <Input
                      id="otp"
                      type="text"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      disabled={!validations.otpSent}
                      required
                    />
                    {validations.otpSent && (
                      <p className="text-xs text-green-600">
                        OTP sent to your registered phone number
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="Create a strong password"
                        required
                      />
                      {formData.newPassword && (
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
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmNewPassword"
                        type="password"
                        value={formData.confirmNewPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                      />
                      {formData.confirmNewPassword && (
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
                </>
              )}

              <Button type="submit" className="w-full" variant="hero">
                {step === 1 ? "Verify & Continue" : "Reset Password"}
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

export default ResetPassword;