import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight, Clock, CheckCircle2 } from "lucide-react";

interface SubjectCardProps {
  name: string;
  code: string;
  instructor: string;
  semester: string;
  coverage: number;
  status: "pending" | "in-progress" | "completed";
  onClick?: () => void;
}

export const SubjectCard = ({
  name,
  code,
  instructor,
  semester,
  coverage,
  status,
  onClick,
}: SubjectCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-accent" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
            Completed
          </Badge>
        );
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-border/50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex justify-between text-sm mt-2 text-muted-foreground">
          <span>{code}</span>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-2">Instructor: {instructor}</p>
        <p className="text-sm text-muted-foreground mb-3">Semester: {semester}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Coverage</span>
            <span className="font-medium text-foreground">{coverage}%</span>
          </div>
          <Progress value={coverage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
