import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, User, FileText, Edit3 } from "lucide-react";
import { useState } from "react";

interface DossierDetail {
  label: string;
  value: string;
  editable?: boolean;
}

interface DossierSectionProps {
  title: string;
  details: DossierDetail[];
  status: "pending" | "completed" | "in-progress";
}

export const DossierSection = ({ title, details, status }: DossierSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(details);

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent border-accent/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleEdit = (index: number, value: string) => {
    const updated = [...editedDetails];
    updated[index] = { ...updated[index], value };
    setEditedDetails(updated);
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor()}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {editedDetails.map((detail, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <Label className="text-sm font-medium text-muted-foreground">
                {detail.label}:
              </Label>
              {isEditing && detail.editable ? (
                <Input
                  value={detail.value}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  className="col-span-2"
                />
              ) : (
                <div className="col-span-2">
                  <span className="text-sm font-medium text-foreground">
                    {detail.value || "—"}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {isEditing && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};