import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, UserCheck, ShieldAlert, Ban } from "lucide-react";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "disabled";
  onClick?: () => void;
}

export const UserCard = ({
  name,
  email,
  role,
  status,
  onClick,
}: UserCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <UserCheck className="h-4 w-4 text-primary" />;
      case "suspended":
        return <ShieldAlert className="h-4 w-4 text-yellow-500" />;
      default:
        return <Ban className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "suspended":
        return <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">Suspended</Badge>;
      default:
        return <Badge variant="outline">Disabled</Badge>;
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
        <p className="text-sm text-muted-foreground">Role: {role}</p>
      </CardContent>
    </Card>
  );
};
