import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, User, BookOpen } from "lucide-react";
import { SubjectEditDialog } from "./SubjectEditDialog";

interface SubjectCardProps {
  id?: string;
  name: string;
  code: string;
  instructor: string;
  semester: string;
  coverage: number;
  status: "pending" | "in-progress" | "completed";
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function SubjectCard({
  id = "",
  name,
  code,
  instructor,
  semester,
  coverage,
  status,
  onEdit,
  onDelete
}: SubjectCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    if (onDelete && id) {
      onDelete(id);
    }
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <BookOpen className="h-5 w-5 text-primary" />
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight">{name}</h3>
              <p className="text-sm text-muted-foreground font-mono">{code}</p>
            </div>
            <Badge className={getStatusColor(status)} variant="secondary">
              {status.replace("-", " ")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{instructor}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{semester}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Coverage</span>
              <span className="font-medium">{coverage}%</span>
            </div>
            <Progress value={coverage} className="h-2" />
          </div>
        </CardContent>

        <CardFooter className="pt-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleEdit}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <SubjectEditDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        subject={{ id, name, code, instructor, semester, coverage, status }}
        onSave={onEdit}
      />
    </>
  );
}