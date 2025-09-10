import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, UserCheck, Clock, FileText } from "lucide-react";

interface InstructorCardProps {
  name: string;
  email: string;
  department: string;
  assignedSubjects: number;
  status: "active" | "on-leave" | "retired";
  onClick?: () => void;
}

export const InstructorCard = ({
  name,
  email,
  department,
  assignedSubjects,
  status,
  onClick,
}: InstructorCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <UserCheck className="h-4 w-4 text-primary" />;
      case "on-leave":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "on-leave":
        return <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">On Leave</Badge>;
      default:
        return <Badge variant="outline">Retired</Badge>;
    }
  };

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-card border-border/50"
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
          <span>{email}</span>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        <p className="text-sm text-muted-foreground">Department: {department}</p>
        <p className="text-sm text-muted-foreground">Subjects Assigned: {assignedSubjects}</p>
      </CardContent>
    </Card>
  );
};
