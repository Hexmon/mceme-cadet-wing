import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Clock, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  title: string;
  pageRange: string;
  progress: number;
  status: "pending" | "in-progress" | "completed";
  description?: string;
  onClick?: () => void;
}

export const CourseCard = ({ 
  title, 
  pageRange, 
  progress, 
  status, 
  description,
  onClick 
}: CourseCardProps) => {
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
        return <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-hover hover:-translate-y-1 bg-gradient-card border-border/50"
      onClick={onClick}
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
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground">Pages {pageRange}</span>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};