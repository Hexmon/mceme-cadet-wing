import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save } from "lucide-react";
import type { Subject } from "@/config/app.config";

interface AddSubjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (subject: Omit<Subject, "id">) => void;
}

export function AddSubjectDialog({
  isOpen,
  onOpenChange,
  onAdd
}: AddSubjectDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    instructor: "",
    semester: "",
    coverage: 0,
    status: "pending" as const
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.code || !formData.instructor || !formData.semester) {
      return; // Basic validation
    }

    onAdd(formData);
    
    // Reset form
    setFormData({
      name: "",
      code: "",
      instructor: "",
      semester: "",
      coverage: 0,
      status: "pending"
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Subject
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>
              Enter the basic details for the new subject
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input
                id="subject-name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Mathematics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-code">Subject Code</Label>
              <Input
                id="subject-code"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder="e.g., MATH101"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => handleChange("instructor", e.target.value)}
                placeholder="e.g., Dr. Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={formData.semester} onValueChange={(value) => handleChange("semester", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                  <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverage">Initial Coverage (%)</Label>
              <Input
                id="coverage"
                type="number"
                min="0"
                max="100"
                value={formData.coverage}
                onChange={(e) => handleChange("coverage", Number(e.target.value))}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Add Subject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}