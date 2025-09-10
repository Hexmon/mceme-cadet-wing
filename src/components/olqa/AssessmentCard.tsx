import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export interface AssessmentCardProps {
  ocName: string;
  term: string;
  assessmentType: string;
  score: number;
  status: "completed" | "pending";
  onClick?: () => void;
}

export const AssessmentCard = ({
  ocName,
  term,
  assessmentType,
  score,
  status,
  onClick,
}: AssessmentCardProps) => {
  const getStatusBadge = () => {
    return status === "completed" ? (
      <Badge variant="default">Completed</Badge>
    ) : (
      <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">Pending</Badge>
    );
  };

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-card border-border/50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {ocName}
            </CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        <p className="text-sm text-muted-foreground">Term: {term}</p>
        <p className="text-sm text-muted-foreground">Assessment: {assessmentType}</p>
        <p className="text-sm text-muted-foreground">Score: {score}%</p>
      </CardContent>
    </Card>
  );
};
