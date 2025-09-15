import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FlaskConical, Save } from "lucide-react";
import type { Subject, ExamDetails } from "@/config/app.config";

interface SubjectEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subject: Partial<Subject>;
  onSave?: (id: string) => void;
}

const initialExamDetails: ExamDetails = {
  credit: 0,
  phaseTest1: 0,
  phaseTest2: 0,
  tutorial: 0,
  sessional: 0,
  final: 0,
  practical: 0,
  total: 0,
  letterGrade: ""
};

export function SubjectEditDialog({
  isOpen,
  onOpenChange,
  subject,
  onSave
}: SubjectEditDialogProps) {
  const [theoryDetails, setTheoryDetails] = useState<ExamDetails>(
    subject.theory || initialExamDetails
  );
  const [practicalDetails, setPracticalDetails] = useState<ExamDetails>(
    subject.practical || initialExamDetails
  );

  const handleTheoryChange = (field: keyof ExamDetails, value: string | number) => {
    setTheoryDetails(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const handlePracticalChange = (field: keyof ExamDetails, value: string | number) => {
    setPracticalDetails(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value)
    }));
  };

  const calculateTotal = (details: ExamDetails) => {
    const { phaseTest1, phaseTest2, tutorial, sessional, final, practical } = details;
    return phaseTest1 + phaseTest2 + tutorial + sessional + final + practical;
  };

  const handleSave = () => {
    // Calculate totals before saving
    const updatedTheory = {
      ...theoryDetails,
      total: calculateTotal(theoryDetails)
    };
    const updatedPractical = {
      ...practicalDetails,
      total: calculateTotal(practicalDetails)
    };

    console.log("Saving subject with details:", {
      theory: updatedTheory,
      practical: updatedPractical
    });

    if (onSave && subject.id) {
      onSave(subject.id);
    }
    onOpenChange(false);
  };

  const ExamForm = ({
    details,
    onChange,
    type
  }: {
    details: ExamDetails;
    onChange: (field: keyof ExamDetails, value: string | number) => void;
    type: "theory" | "practical";
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-credit`}>Credit</Label>
          <Input
            id={`${type}-credit`}
            type="number"
            value={details.credit}
            onChange={(e) => onChange("credit", e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-phase1`}>Phase Test I</Label>
          <Input
            id={`${type}-phase1`}
            type="number"
            value={details.phaseTest1}
            onChange={(e) => onChange("phaseTest1", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-phase2`}>Phase Test II</Label>
          <Input
            id={`${type}-phase2`}
            type="number"
            value={details.phaseTest2}
            onChange={(e) => onChange("phaseTest2", e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-tutorial`}>Tutorial</Label>
          <Input
            id={`${type}-tutorial`}
            type="number"
            value={details.tutorial}
            onChange={(e) => onChange("tutorial", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-sessional`}>Sessional</Label>
          <Input
            id={`${type}-sessional`}
            type="number"
            value={details.sessional}
            onChange={(e) => onChange("sessional", e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-final`}>Final</Label>
          <Input
            id={`${type}-final`}
            type="number"
            value={details.final}
            onChange={(e) => onChange("final", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${type}-practical`}>Practical</Label>
          <Input
            id={`${type}-practical`}
            type="number"
            value={details.practical}
            onChange={(e) => onChange("practical", e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${type}-grade`}>Letter Grade</Label>
          <Input
            id={`${type}-grade`}
            value={details.letterGrade}
            onChange={(e) => onChange("letterGrade", e.target.value)}
            placeholder="A+"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold">Total</Label>
          <div className="text-2xl font-bold text-primary">
            {calculateTotal(details)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Edit Subject: {subject.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="theory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Theory Exam
            </TabsTrigger>
            <TabsTrigger value="practical" className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Practical Exam
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Theory Exam Details
                </CardTitle>
                <CardDescription>
                  Enter the marks and details for theory examination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExamForm
                  details={theoryDetails}
                  onChange={handleTheoryChange}
                  type="theory"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  Practical Exam Details
                </CardTitle>
                <CardDescription>
                  Enter the marks and details for practical examination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExamForm
                  details={practicalDetails}
                  onChange={handlePracticalChange}
                  type="practical"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}