import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DossierDetail {
  label: string;
  value: string;
  editable: boolean;
}

interface DossierSectionProps {
  title: string;
  details: DossierDetail[];
  status: "completed" | "in-progress" | "pending";
}

export const DossierSection = ({ title, details, status }: DossierSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={getStatusColor(status)}>
            {status.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.map((detail, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`detail-${index}`} className="text-sm font-medium">
                {detail.label}
              </Label>
              {detail.editable ? (
                <Input
                  id={`detail-${index}`}
                  value={detail.value}
                  placeholder={`Enter ${detail.label.toLowerCase()}`}
                  className="text-sm"
                />
              ) : (
                <div className="p-2 bg-muted rounded-md text-sm">
                  {detail.value || "Not set"}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};