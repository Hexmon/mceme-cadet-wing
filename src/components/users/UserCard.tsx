// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ChevronRight, UserCheck, ShieldAlert, Ban, Trash2, Edit3, Eye } from "lucide-react";

// interface UserCardProps {
//   id?: string;
//   username?: string;   // email or username
//   persNo?: string;
//   rank?: string;
//   fullName?: string;
//   unit?: string;
//   role?: string;
//   status?: "active" | "suspended" | "disabled";
//   onView?: (id: string) => void;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
//   onClick?: () => void;
// }

// export const UserCard = ({
//   id,
//   username,
//   persNo,
//   rank,
//   fullName,
//   unit,
//   role,
//   status,
//   onView,
//   onEdit,
//   onDelete,
//   onClick,
// }: UserCardProps) => {
//   const getStatusIcon = () => {
//     switch (status) {
//       case "active":
//         return <UserCheck className="h-4 w-4 text-primary" />;
//       case "suspended":
//         return <ShieldAlert className="h-4 w-4 text-yellow-500" />;
//       default:
//         return <Ban className="h-4 w-4 text-muted-foreground" />;
//     }
//   };

//   const getStatusBadge = () => {
//     switch (status) {
//       case "active":
//         return <Badge variant="default">Active</Badge>;
//       case "suspended":
//         return (
//           <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">
//             Suspended
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">Disabled</Badge>;
//     }
//   };

//   return (
//     <Card
//       onClick={onClick}
//       className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border/50"
//     >
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-2">
//             {getStatusIcon()}
//             <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
//               {fullName}
//             </CardTitle>
//           </div>
//           <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
//         </div>
//         <div className="flex justify-between text-sm mt-2 text-muted-foreground">
//           <span>username: {username}</span>
//           {getStatusBadge()}
//         </div>
//       </CardHeader>

//       <CardContent className="pt-0 space-y-1 text-sm text-muted-foreground">
//         <p><strong>Pers No:</strong> {persNo}</p>
//         <p><strong>Rank:</strong> {rank}</p>
//         <p><strong>Unit:</strong> {unit}</p>
//         <p><strong>Role:</strong> {role}</p>
//       </CardContent>

//       <CardFooter className="pt-4 border-t border-border/50">
//         <div className="flex gap-2 w-full">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onView?.(id);
//             }}
//             className="flex-1 text-xs"
//           >
//             <Eye className="h-3 w-3 mr-1" />
//             View
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit?.(id);
//             }}
//             className="flex-1 text-xs"
//           >
//             <Edit3 className="h-3 w-3 mr-1" />
//             Edit
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete?.(id);
//             }}
//             className="flex-1 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
//           >
//             <Trash2 className="h-3 w-3 mr-1" />
//             Delete
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, ShieldAlert, Ban, Trash2, Edit3, Eye } from "lucide-react";

interface UserListItemProps {
  id?: string;
  username?: string;
  persNo?: string;
  rank?: string;
  fullName?: string;
  unit?: string;
  role?: string;
  status?: "active" | "suspended" | "disabled";
  onView?: (id?: string) => void;
  onEdit?: (id?: string) => void;
  onDelete?: (id?: string) => void;
  onClick?: () => void;
}

export const UserListItem = ({
  id,
  username,
  persNo,
  rank,
  fullName,
  unit,
  role,
  status,
  onView,
  onEdit,
  onDelete,
  onClick,
}: UserListItemProps) => {
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
        return (
          <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="outline">Disabled</Badge>;
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-3 border-b hover:bg-muted/40 cursor-pointer transition-colors"
    >
      {/* Left side info */}
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="space-y-0.5">
          <p className="font-medium text-foreground">{fullName}</p>
          <p className="text-sm text-muted-foreground">
            {rank} • {persNo} • {unit} • {role}
          </p>
          <p className="text-xs text-muted-foreground">username: {username}</p>
        </div>
      </div>

      {/* Right side: badge + actions */}
      <div className="flex items-center gap-3">
        {getStatusBadge()}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(id);
            }}
            className="text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id);
            }}
            className="text-xs"
          >
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
            className="text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
