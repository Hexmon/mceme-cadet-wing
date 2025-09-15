import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  Edit3, 
  Trash2, 
  FileText, 
  User, 
  ClipboardCheck, 
  Heart, 
  Shield, 
  MessageCircle, 
  BookOpen, 
  Dumbbell, 
  Trophy, 
  Target, 
  Mountain, 
  Tent, 
  Users, 
  Award, 
  BarChart3, 
  Calendar, 
  Plane, 
  UserCheck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Course {
  id: string;
  title: string;
  pageRange: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
  description: string;
}

interface CourseCardProps {
  course: Course;
  onView: (course: Course) => void;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export const CourseCard = ({ course, onView, onEdit, onDelete }: CourseCardProps) => {
  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getCourseIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('dossier') || titleLower.includes('insp')) return FileText;
    if (titleLower.includes('pers') || titleLower.includes('particular')) return User;
    if (titleLower.includes('ssb') || titleLower.includes('report')) return ClipboardCheck;
    if (titleLower.includes('med') || titleLower.includes('medical')) return Heart;
    if (titleLower.includes('discp') || titleLower.includes('discipl')) return Shield;
    if (titleLower.includes('comm') || titleLower.includes('parent') || titleLower.includes('guardian')) return MessageCircle;
    if (titleLower.includes('acad') || titleLower.includes('academic')) return BookOpen;
    if (titleLower.includes('phy') || titleLower.includes('physical') || titleLower.includes('trg')) return Dumbbell;
    if (titleLower.includes('sport') || titleLower.includes('game') || titleLower.includes('award')) return Trophy;
    if (titleLower.includes('wpn') || titleLower.includes('weapon')) return Target;
    if (titleLower.includes('obstacle')) return Mountain;
    if (titleLower.includes('camp')) return Tent;
    if (titleLower.includes('club') || titleLower.includes('drill')) return Users;
    if (titleLower.includes('cfe') || titleLower.includes('excellence')) return Award;
    if (titleLower.includes('olq') || titleLower.includes('qualities')) return UserCheck;
    if (titleLower.includes('semester') || titleLower.includes('performance')) return BarChart3;
    if (titleLower.includes('final') || titleLower.includes('passing')) return Award;
    if (titleLower.includes('assessment')) return ClipboardCheck;
    if (titleLower.includes('leave') || titleLower.includes('hike') || titleLower.includes('detention')) return Calendar;
    if (titleLower.includes('interview')) return MessageCircle;
    if (titleLower.includes('counselling') || titleLower.includes('warning')) return MessageCircle;
    if (titleLower.includes('graph')) return BarChart3;
    if (titleLower.includes('individual') || titleLower.includes('indl')) return User;
    
    // Default icon
    return FileText;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500";
    if (progress >= 50) return "bg-blue-500";
    return "bg-amber-500";
  };

  const getIconColor = (status: Course['status']) => {
    switch (status) {
      case "completed":
        return "text-emerald-600";
      case "in-progress":
        return "text-blue-600";
      case "pending":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const IconComponent = getCourseIcon(course.title);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br transition-all duration-200",
              course.status === "completed" ? "from-emerald-100 to-emerald-50 group-hover:from-emerald-200 group-hover:to-emerald-100" :
              course.status === "in-progress" ? "from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100" :
              "from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100"
            )}>
              <IconComponent className={cn("h-5 w-5", getIconColor(course.status))} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Pages {course.pageRange}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-xs font-medium", getStatusColor(course.status))}
          >
            {course.status.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{course.progress}%</span>
          </div>
          <Progress 
            value={course.progress} 
            className="h-2"
          />
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