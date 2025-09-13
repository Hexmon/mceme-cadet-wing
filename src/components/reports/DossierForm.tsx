import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DossierFormProps {
  semester?: string;
  printable?: boolean;
}

export const DossierForm: React.FC<DossierFormProps> = ({ semester, printable = false }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    instructorName: '',
    instructorId: '',
    semester: semester || '',
    subject: '',
    academicYear: '',
    department: '',
    remarks: ''
  });

  // Update semester when prop changes (especially useful in printable mode)
  useEffect(() => {
    if (semester) {
      setFormData((prev) => ({ ...prev, semester }));
    }
  }, [semester]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dossier Submitted",
      description: "The instructor dossier has been submitted successfully.",
    });
  };

  return (
    <Card className={`p-6 ${printable ? 'shadow-none border-none' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Instructor Dossier Form</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instructorName">Instructor Name</Label>
            <Input
              id="instructorName"
              value={formData.instructorName}
              onChange={(e) => handleInputChange('instructorName', e.target.value)}
              placeholder="Enter instructor name"
              required
              disabled={printable}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructorId">Instructor ID</Label>
            <Input
              id="instructorId"
              value={formData.instructorId}
              onChange={(e) => handleInputChange('instructorId', e.target.value)}
              placeholder="Enter instructor ID"
              required
              disabled={printable}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              value={formData.semester}
              onValueChange={(value) => handleInputChange('semester', value)}
              disabled={printable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(8)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    Semester {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Enter subject name"
              required
              disabled={printable}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Select
              value={formData.academicYear}
              onValueChange={(value) => handleInputChange('academicYear', value)}
              disabled={printable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2024-25">2024-25</SelectItem>
                <SelectItem value="2025-26">2025-26</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange('department', value)}
              disabled={printable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ece">Electronics & Communication</SelectItem>
                <SelectItem value="me">Mechanical Engineering</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="ee">Electrical Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            placeholder="Enter any additional remarks or notes"
            rows={4}
            disabled={printable}
          />
        </div>
        
        {!printable && (
          <>
            <div className="space-y-2">
              <Label>Upload Documents</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Submit Dossier
              </Button>
              <Button type="button" variant="outline">
                Save Draft
              </Button>
            </div>
          </>
        )}
      </form>
    </Card>
  );
};
