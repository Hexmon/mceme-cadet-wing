import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, ShieldCheck, Timer  } from "lucide-react";

interface ActivityCardProps {
  name: string;
  category: string;
  duration: string;
  status: string;
  onClick?: () => void;
}

export const ActivityCard = ({
  name,
  category,
  duration,
  status,
  onClick,
}: ActivityCardProps) => {
  const getIcon = () => {
    return category === "training" ? (
      <ShieldCheck className="h-4 w-4 text-blue-500" />
    ) : (
      <Dumbbell className="h-4 w-4 text-green-500" />
    );
  };

  const getStatusBadge = () => {
    return status === "ongoing" ? (
      <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">Ongoing</Badge>
    ) : (
      <Badge variant="default">Completed</Badge>
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
            {getIcon()}
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-1">
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Timer className="h-4 w-4" /> Duration: {duration}
        </p>
        <p className="text-sm text-muted-foreground">Category: {category}</p>
      </CardContent>
    </Card>
  );
};
