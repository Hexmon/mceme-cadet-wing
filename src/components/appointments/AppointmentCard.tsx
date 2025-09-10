import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2, Ban, ChevronRight } from "lucide-react";

interface AppointmentCardProps {
  title: string;
  officer: string;
  department: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  onClick?: () => void;
}

export const AppointmentCard = ({
  title,
  officer,
  department,
  date,
  time,
  status,
  onClick,
}: AppointmentCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <Ban className="h-4 w-4 text-red-500" />;
      default:
        return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="default">Scheduled</Badge>;
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
              {title}
            </CardTitle>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex justify-between text-sm mt-2 text-muted-foreground">
          <span>{officer}</span>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        <p className="text-sm text-muted-foreground">Department: {department}</p>
        <p className="text-sm text-muted-foreground">Date: {date}</p>
        <p className="text-sm text-muted-foreground">Time: {time}</p>
      </CardContent>
    </Card>
  );
};
