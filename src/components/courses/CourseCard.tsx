import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ClipboardList, Target, Eye, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Course {
  id: string;
  courseNo: string;
  startDate: string;
  endDate: string;
  trgModel: number;
}

interface CourseCardProps {
  course: Course;
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export const CourseCard = ({ course, onView, onEdit, onDelete }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100">
              <ClipboardList className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {course.courseNo}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Training Model: {course.trgModel}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-medium border-blue-200 text-blue-700 bg-blue-50">
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span>Start: {course.startDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-500" />
          <span>End: {course.endDate}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border/50">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(course)}
            className="flex-1 text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(course)}
            className="flex-1 text-xs"
          >
            <Edit3 className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(course.id)}
            className="flex-1 text-xs text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
